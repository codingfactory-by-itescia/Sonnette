const rewardsContainer = document.querySelector('.rewardsContainer')
const userId = JSON.parse(localStorage.getItem('codringData')).userId

// Get all rewards
fetch('/db/rewards/getAllRewards')
.then((response) => response.json())
.then((rewards) => {
    for (let i = 0; i < rewards.length; i++) {
        displayReward(rewards[i])
    }
})

async function displayReward(reward) {

    rewardsContainer.insertAdjacentHTML('afterbegin', `
        <div class="reward locked" id="${reward._id}">
            <div class="rewardTime">
                <p class="rewardStatus">00:00:00</p>
            </div>
            <button onclick="claimReward('${reward._id}', ${reward.isRewardCycled ? true : false})">${reward.rewardTitle}</button>
            <p class="rewardPoints">+${reward.rewardPoints}</p>
        </div>
    `)
    getRewardStatus(reward)
}

async function getRewardStatus(reward) {
    // Check if the reward is claimable or not
    let userReward
    const data = {
        userId: userId,
        rewardId: reward._id
    }
    // Get the lastClaim date of the user for this reward
    await fetch('/db/rewards/getUserReward', { method: 'POST', body: JSON.stringify(data) })
    .then((response) => response.json())
    .then(data => userReward = data)

    if (reward.isRewardCycled) setDiffTime(reward, userReward.lastClaim)
    else displayNoneCycledReward(reward, userReward)
}

function setDiffTime(reward, lastClaimDate) {
    let rewardElement = document.getElementById(reward._id)
    let rewardStatusElement = rewardElement.querySelector('.rewardStatus')
    
    let lastClaim = new Date(lastClaimDate)
    let claimableDate

    if (reward.rewardCycle < 1) claimableDate = new Date(lastClaim.setMinutes(lastClaim.getMinutes() + (reward.rewardCycle * 60)))
    else claimableDate = new Date(lastClaim.setHours(lastClaim.getHours() + reward.rewardCycle))

    // Count down loop
    let countDown = setInterval(() => {
        let now = new Date()
        let diffMilli = claimableDate - now

        let hours = Math.floor((diffMilli % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = Math.floor((diffMilli % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((diffMilli % (1000 * 60)) / 1000);

        if (diffMilli < 0) {
            rewardStatusElement.innerHTML = 'Réclame ta récompense !'
            rewardElement.classList.remove('locked')
            rewardElement.classList.add('unlocked')

            clearInterval(countDown)
        } else {
            rewardStatusElement.innerHTML = `${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
        }
    }, 1000)
}

async function claimReward(id, isRewardCycled) {
    // Check if user can click on the button
    if (document.getElementById(id).classList.contains('unlocked')) {
        // Set the locked classList
        let rewardElement = document.getElementById(id)
        rewardElement.classList.remove('unlocked')
        rewardElement.classList.add('locked')
        
        // Set reward points animation
        rewardElement.querySelector('.rewardPoints').style.animation = 'rewardPointsAnimation 1s'
        setTimeout(() => rewardElement.querySelector('.rewardPoints').style.animation = '', 1000)
    
        // Update the lastClaim date
        const options = {
            userId: userId,
            rewardId: id,
            isRewardCycled: isRewardCycled
        }
    
        await fetch('/db/rewards/claimReward', { method: 'POST', body: JSON.stringify(options) })
        .then(response => response.json())
        .then((reward) => {
            if (isRewardCycled) setDiffTime(reward, new Date())
        })
    }
}

function displayNoneCycledReward(reward, userReward) {
    let rewardElement = document.getElementById(reward._id)
    let rewardStatusElement = rewardElement.querySelector('.rewardStatus')
    
    if (!userReward.claimed) {
        rewardStatusElement.innerHTML = 'Réclame ta récompense !'
        rewardElement.classList.remove('locked')
        rewardElement.classList.add('unlocked')
    } else {
        rewardStatusElement.innerHTML = 'Récompense déjà récupérée'
        rewardElement.classList.remove('unlocked')
        rewardElement.classList.add('locked')
    }
}









function setRewardsList() {
    fetch('/db/rewards/addNewReward', { method: 'POST', body: JSON.stringify({
        rewardTitle: "Récompense réclamable qu'une seule fois",
        rewardPoints: 300,
        isRewardCycled: false,
    })
    }).then(() => console.log('done'))
    fetch('/db/rewards/addNewReward', { method: 'POST', body: JSON.stringify({
            rewardTitle: "Récompense chaque jour",
            rewardPoints: 1000,
            isRewardCycled: true,
            rewardCycle: 24, // In hour
        })
    }).then(() => console.log('done'))
    fetch('/db/rewards/addNewReward', { method: 'POST', body: JSON.stringify({
        rewardTitle: "Récompense chaque heure",
        rewardPoints: 70,
        isRewardCycled: true,
        rewardCycle: 1, // In hour
    })
    }).then(() => console.log('done'))
    fetch('/db/rewards/addNewReward', { method: 'POST', body: JSON.stringify({
        rewardTitle: "Récompense chaque minute",
        rewardPoints: 1,
        isRewardCycled: true,
        rewardCycle: 0.0167, // In hour
    })
    }).then(() => console.log('done'))
}

function deleteRewardsList() {
    fetch('/db/rewards/deleteAllRewards')
}
