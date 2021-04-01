const userId = JSON.parse(localStorage.getItem('codringData')).userId

checkForClaimableRewards()

async function checkForClaimableRewards() {
    // At the load of the page, check if some rewards are clamable
    const userRewards = await fetch('/db/rewards/getUserRewards', { method: 'POST', body: userId }).then(response => response.json())
    let claimableReward = 0
    
    for (let i = 0; i < userRewards.length; i++) {
        const userReward = userRewards[i];
        const reward = await fetch('/db/rewards/getReward', { method: 'POST', body: userReward.rewardId }).then((response) => response.json())

        let lastClaim = new Date(userReward.lastClaim)
        let claimableDate

        if (reward.rewardCycle < 1) claimableDate = new Date(lastClaim.setMinutes(lastClaim.getMinutes() + (reward.rewardCycle * 60)))
        else claimableDate = new Date(lastClaim.setHours(lastClaim.getHours() + reward.rewardCycle))

        if (claimableDate <= new Date()) claimableReward++
    }

    if (claimableReward > 0) displayRewardBanner(claimableReward)
}

function displayRewardBanner(claimableReward) {
    const rewardsBannerElement = document.querySelector('.getRewardsContainer')
    rewardsBannerElement.style.display = 'flex'
    rewardsBannerElement.querySelector('.claimableRewards').innerHTML = `${claimableReward == 1 ? 'une' : claimableReward} récompense${claimableReward > 1 ? 's sont' : ' est'} disponible${claimableReward > 1 ? 's' : ''}`
    rewardsBannerElement.querySelector('.getRewardsTxt').innerHTML = `Réclame ${claimableReward > 1 ? 'tes' : 'ta'} récompense${claimableReward > 1 ? 's' : ''} !`
}

/* const options = {
    method: 'POST',
    body: userId
}
fetch('/db/getAccount', options)
.then((response) => response.json())
.then((user) => {
    const now = new Date()
    const lastConnection = new Date(user.lastConnection)
    const diffMilli = now - lastConnection
    
    const diffHours = Math.floor(diffMilli / (60000 * 60));
    const diffDays = Math.floor(diffMilli / (60000 * 60 * 24));

    displayDiffTime(diffHours, diffDays)
})

function displayDiffTime(diffHours, diffDays) {
    const lastConnectionTxt = document.querySelector('.getRewardsContainer .lastConnection')

    console.log(`\u23F0 Dernière connexion il y a ${diffHours} heure${diffHours > 1 ? 's' : ''}`);
    
    if (diffDays > 0) {
        lastConnectionTxt.innerHTML += ` ${diffDays} jour${diffDays > 1 ? 's' : ''}`
    } else if (diffHours > 0) {
        lastConnectionTxt.innerHTML += ` ${diffHours} heure${diffHours > 1 ? 's' : ''}`
    } else {
        rewardsBanner.style.display = 'none'
    }
}

// Redefine the "lastConnection" variable in the user profil
fetch('/db/editLastConnection', {
    method: 'POST',
    body: userId
}) */


