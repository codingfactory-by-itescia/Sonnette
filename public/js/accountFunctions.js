async function checkUsername (username) {
    // Check if the username already exists
    let accounts = await getAllAccounts()
    for (let i = 0; i < accounts.length; i++) {
        if (accounts[i].username == username) {
            return false
        }
    }
    return true
}
async function checkEmail (email) {
    // Check if the email already exists
    let accounts = await getAllAccounts()
    
    for (let i = 0; i < accounts.length; i++) {
        if (accounts[i].email == email) {
            return false
        }
    }
    return true
    
}
async function checkPassword (password) {
    if (password.length < 3) {
        return false
    }
    return true
}
async function getAllAccounts() {
    let accounts
    await fetch('/db/getAccounts')
        .then((response) => response.json())
        .then((data) => accounts = data)
    return accounts
}
function errorMsg(msg, form) {
    const msgContainer = document.querySelector(`.${form} .msgContainer`)
    msgContainer.innerHTML = msg
    msgContainer.classList.remove('successMsg')
    msgContainer.classList.add('errorMsg')
}
function successMsg(msg, form) {
    const msgContainer = document.querySelector(`#${form} #confirmCreateAccount`)
    msgContainer.innerHTML = msg
    msgContainer.classList.add('successMsg')
    msgContainer.classList.remove('errorMsg')
}
