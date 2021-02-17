// Create an account from admin panel
const createAccountBtn = document.querySelector('#createAccountBtn')

createAccountBtn.addEventListener('click', async (event) => {
    const inputs = document.querySelectorAll('.createAccountForm input')
    // Don't reset the form
    event.preventDefault()

    // check if all inputs are filled and if the values aren't already taken
    let isInputsCorrect = await checkInputs(inputs)

    if (isInputsCorrect) {
        // Get user data with values of inputs
        let userData = {
            username: inputs[0].value,
            email: inputs[1].value,
            password: inputs[2].value,
            isAdmin: inputs[3].checked ? true : false
        }
    
        // Set fetch options
        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        }
    
        fetch('/db/createAccount', options)
        .then(() => successMsg(`Nouvel ${userData.isAdmin ? 'administrateur' : 'utilisateur'} créé`))
    
        // Reset all inputs of the form, update the list of accounts and the website data
        document.querySelector('.createAccountForm').reset()
        updateAccountsList()
        displayWebsiteData()
    }
})


async function checkInputs(inputs) {
    let emailRegexp = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/

    // Wait for the execution of all functions
    let isUsernameCorrect = await checkUsername(inputs[0].value)
    let isEmailCorrect = await checkEmail(inputs[1].value)
    let isPasswordCorrect = await checkPassword(inputs[2].value)
    
    // Check username
    if (inputs[0].value.length < 3) {
        errorMsg('Nom d\'utilisateur trop court')
        return false
    } else if (!isUsernameCorrect) {
        errorMsg('Ce nom d\'utilisateur existe déjà')
        return false
    }
    // Check email
    else if (!emailRegexp.test(inputs[1].value)) {
        errorMsg('Email invalide')
        return false
    } else if (!isEmailCorrect) {
        errorMsg('Email déjà associée à un compte')
        return false
    }
    // Check password
    else if (inputs[2].value.length < 3) {
        errorMsg('Mot de passe trop court')
        return false
    }
    else if (!isPasswordCorrect) {
        errorMsg('Mot de passe incorrect')
        return false
    }
    return true
}
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
    // password conditions...
    return true
}
async function getAllAccounts() {
    let accounts
    await fetch('/db/getAccounts')
        .then((response) => response.json())
        .then((data) => accounts = data)
    return accounts
}
function errorMsg(msg) {
    const msgContainer = document.querySelector('.msgContainer')
    msgContainer.innerHTML = msg
    msgContainer.classList.remove('successMsg')
    msgContainer.classList.add('errorMsg')
}
function successMsg(msg) {
    const msgContainer = document.querySelector('.msgContainer')
    msgContainer.innerHTML = msg
    msgContainer.classList.add('successMsg')
    msgContainer.classList.remove('errorMsg')
    setTimeout(() => {
        msgContainer.innerHTML = ''
    }, 10000)
}