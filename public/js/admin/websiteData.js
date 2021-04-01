// Display website data
const totalAccountsNumber = document.querySelector('#totalAccountsNumber')
const totalAccountsTitle = document.querySelector('#totalAccountsTitle')
const totalMessagesNumber = document.querySelector('#totalMessagesNumber')
const totalMessagesTitle = document.querySelector('#totalMessagesTitle')
const totalPointsNumber = document.querySelector('#totalPointsNumber')
const totalPointsTitle = document.querySelector('#totalPointsTitle')

displayWebsiteData().then(() => {
    // Set the number animation
    setTimeout(() => {
        const containers = $('.numberAnimation')
        setTimeout(() => {

            for (let i = 0; i < containers.length; i++) {
                containers[i].style.opacity = '1'
            }
            containers.counterUp({
                delay: 10,
                time: 750,
            })
        }, 100)

        ScrollReveal().reveal(containers, {
            distance: '20px',
            origin: 'bottom',
            opacity: -1,
        })
    }, 250)
})

async function displayWebsiteData() {
    await displayTotalAccounts()
    await displayTotalMessages();
    await displayTotalPoints()
}

async function displayTotalAccounts() {
    // Display the total of accounts
    let totalAccounts
    await fetch('/db/getAccounts')
        .then((response) => response.json())
        .then((data) => totalAccounts = data.length)

    totalAccountsNumber.innerHTML = totalAccounts
    totalAccountsTitle.innerHTML = `utilisateur${totalAccounts > 1 ? 's' : ''}`
}

async function displayTotalMessages(){
    // Display the total of messages
    let totalMessages
    await fetch('/db/getMessages')
        .then((response) => response.json())
        .then((data) => totalMessages = data.length)
    
    totalMessagesNumber.innerHTML = totalMessages
    totalMessagesTitle.innerHTML = `message${totalMessages > 1 ? 's' : ''}`
}

async function displayTotalPoints() {
    // Display the total of cumulated points
    let totalPoints
    await fetch('/db/rewards/getTotalPoints')
    .then(response => response.json())
    .then(data => {
        totalPoints = data.totalPoints
    })

    totalPointsNumber.innerHTML = totalPoints
    totalPointsTitle.innerHTML = `point${totalPoints > 1 ? 's' : ''} cumulé${totalPoints > 1 ? 's' : ''}`
}
