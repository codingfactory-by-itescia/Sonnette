const totalAccountsNumber = document.querySelector('#totalAccountsNumber')
const totalAccountsTitle = document.querySelector('#totalAccountsTitle')
const totalMessagesNumber = document.querySelector('#totalMessagesNumber')
const totalMessagesTitle = document.querySelector('#totalMessagesTitle')

displayWebsiteData()

async function displayWebsiteData() {
    // Display the total of accounts
    let totalAccounts
    await fetch('/db/getAccounts')
        .then((response) => response.json())
        .then((data) => totalAccounts = data.length)
    
    totalAccountsNumber.innerHTML = totalAccounts
    totalAccountsTitle.innerHTML = `utilisateur${totalAccounts > 1 ? 's' : ''}`

    // Display the total of messages
    let totalMessages
    await fetch('/db/getMessages')
        .then((response) => response.json())
        .then((data) => totalMessages = data.length)
    
    totalMessagesNumber.innerHTML = totalMessages
    totalMessagesTitle.innerHTML = `message${totalMessages > 1 ? 's' : ''}`
}
