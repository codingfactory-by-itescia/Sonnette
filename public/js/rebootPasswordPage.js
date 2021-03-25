const passwordInput = document.querySelector('input')
// Get user email from url
const url = window.location.search
const urlParams = new URLSearchParams(url)
const userEmail = urlParams.get('email')

// Set the new password
document.querySelector('form button').addEventListener('click', async (event) => {
    event.preventDefault()
    const userId = await getUserId(userEmail)

    if (isPasswordCorrect()) {
        successMsg('Mot de passe réinitialisé')
        
        const userData = {
            userId: userId,
            newPassword: passwordInput.value
        }
        // Redefine the password of the user
        const options = {
            method: 'POST',
            body: JSON.stringify(userData)
        }
        await fetch('/db/editPassword', options)
        .catch((err) => errorMsg(err))
    }
})

function isPasswordCorrect() {
    if (passwordInput.value.length < 6) {
        errorMsg('Mot de passe trop court')
        return false
    }
    return true
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

function errorMsg(msg) {
    const msgContainer = document.querySelector('.msg')
    msgContainer.innerHTML = msg
    msgContainer.classList.remove('successMsg')
    msgContainer.classList.add('errorMsg')
}

function successMsg(msg) {
    const msgContainer = document.querySelector('.msg')
    msgContainer.innerHTML = msg
    msgContainer.classList.add('successMsg')
    msgContainer.classList.remove('errorMsg')
}
