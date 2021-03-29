// Display website data
const totalAccountsNumber = document.querySelector('#totalAccountsNumber')
const totalAccountsTitle = document.querySelector('#totalAccountsTitle')
const totalMessagesNumber = document.querySelector('#totalMessagesNumber')
const totalMessagesTitle = document.querySelector('#totalMessagesTitle')

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
    // Display the total of accounts
    let totalAccounts
    await fetch('/db/getAccounts')
        .then((response) => response.json())
        .then((data) => totalAccounts = data.length)
    
    totalAccountsNumber.innerHTML = totalAccounts
    totalAccountsTitle.innerHTML = `utilisateur${totalAccounts > 1 ? 's' : ''}`

    // Display the total of messages
    await displayTotalMessages();
}

async function displayTotalMessages(){
    let totalMessages
    await fetch('/db/getMessages')
        .then((response) => response.json())
        .then((data) => totalMessages = data.length)
    
    totalMessagesNumber.innerHTML = totalMessages
    totalMessagesTitle.innerHTML = `message${totalMessages > 1 ? 's' : ''}`
}
