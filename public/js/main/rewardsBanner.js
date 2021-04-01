const userId = JSON.parse(localStorage.getItem('codringData')).userId

checkForClaimableRewards()

async function checkForClaimableRewards() {
    // At the load of the page, check if some rewards are clamable
    const userRewards = await fetch('/db/rewards/getUserRewards', { method: 'POST', body: userId }).then(response => response.json())
    let claimableReward = 0

    if (userRewards.length > 0) {
        for (let i = 0; i < userRewards.length; i++) {
            try {
                // Check if the time between the last claim date and now is egal to 0 or below
                const userReward = userRewards[i];
                const reward = await fetch('/db/rewards/getReward', { method: 'POST', body: userReward.rewardId }).then((response) => response.json())
        
                let lastClaim = new Date(userReward.lastClaim)
                let claimableDate
        
                if (reward.rewardCycle < 1) claimableDate = new Date(lastClaim.setMinutes(lastClaim.getMinutes() + (reward.rewardCycle * 60)))
                else claimableDate = new Date(lastClaim.setHours(lastClaim.getHours() + reward.rewardCycle))
        
                if (claimableDate <= new Date()) claimableReward++
                else if (userReward.claimed == false) claimableReward++
            } 
            catch (SyntaxError) {
                // Case where the reward is unused
                deleteReward(userRewards[i], userId)
            }
        }
    } else {
        setUserRewards()
        claimableReward = 1
    }

    if (claimableReward > 0) displayRewardBanner(claimableReward)
}

function displayRewardBanner(claimableReward) {
    const rewardsBannerElement = document.querySelector('.getRewardsContainer')
    rewardsBannerElement.style.display = 'flex'
    rewardsBannerElement.querySelector('.claimableRewards').innerHTML = `${claimableReward == 1 ? 'une' : claimableReward} récompense${claimableReward > 1 ? 's sont' : ' est'} disponible${claimableReward > 1 ? 's' : ''}`
    rewardsBannerElement.querySelector('.getRewardsTxt').innerHTML = `Réclame ${claimableReward > 1 ? 'tes' : 'ta'} récompense${claimableReward > 1 ? 's' : ''} !`
}

async function deleteReward(userReward, userId) {
    const data = {
        userRewardId: userReward._id,
        userId: userId
    }
    await fetch('/db/rewards/deleteReward', { method: 'POST', body: JSON.stringify(data) })
}

async function setUserRewards() {
    const rewards = await fetch('/db/rewards/getAllRewards').then(response => response.json())

    for (let i = 0; i < rewards.length; i++) {
        const data = {
            userId: userId,
            reward: rewards[i]
        }
    
        await fetch('/db/rewards/createNewUserReward', { method: 'POST', body: JSON.stringify(data) })
    }

}
