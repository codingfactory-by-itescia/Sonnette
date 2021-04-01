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
        <div class="reward unlocked">
            <div class="rewardTime">
                <p class="rewardStatus">${await getRewardStatus(reward)}</p>
            </div>
            <button>${reward.rewardTitle}</button>
        </div>
    `)
}

async function getRewardStatus(reward) {
    // Check if the reward is claimable or not
    let lastClaim
    const data = {
        userId: userId,
        rewardId: reward._id
    }
    // Get the lastClaim date of the user for this reward
    await fetch('/db/rewards/getUserReward', { method: 'POST', body: JSON.stringify(data) })
    .then((response) => response.json())
    .then(reward => lastClaim = reward.lastClaim)

    getDiffTime(reward, lastClaim)

    return 'oui'
}

function getDiffTime(reward, lastClaimDate) {
    console.log(`Dernier click à ${new Date(lastClaimDate).toLocaleTimeString()}`);

    const now = new Date()
    const lastClaim = new Date(lastClaimDate)
    const diffMilli = now - lastClaim
}
