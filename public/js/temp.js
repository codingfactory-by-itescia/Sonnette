// Get user data from url
const url = window.location.search
const urlParams = new URLSearchParams(url)
const username = urlParams.get('username')
const userEmail = urlParams.get('email')
const password = urlParams.get('password')

let userData = {
    username: username,
    email: userEmail,
    password: password,
    isAdmin: false,
    lastConnection: new Date()
}

createAccount()

// Redirect user 
setTimeout(() => document.querySelector('.container p').innerHTML = 'Redirection...', 750)
setTimeout(() => window.location.href = 'main.html', 1500)

async function createAccount() {
    // Create a new user in the database
    let options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    }
    await fetch('/db/createAccount', options)
    
    setLocalStorageData()
}
    
async function setLocalStorageData() {
    let data = JSON.parse(localStorage.getItem('codringData'))
    data.userId = await getUserId(userEmail)
    data.connected = true
    localStorage.setItem('codringData', JSON.stringify(data))
    console.log(JSON.parse(localStorage.getItem('codringData')));
}

async function getUserId(email) {
    // Get the id of a user with his email
    let accounts = await getAllAccounts()
    let id
    for (let i = 0; i < accounts.length; i++) {
        if (accounts[i].email == email) {
            id = accounts[i]._id.toString()
            break
        }
    }
    return id
}

async function getAllAccounts() {
    let accounts
    await fetch('/db/getAccounts')
        .then((response) => response.json())
        .then((data) => accounts = data)
    return accounts
}
