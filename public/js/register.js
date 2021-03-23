const registerBtn = document.querySelector('.registerBtn')

let codringData = JSON.parse(localStorage.getItem('codringData'))

if(codringData.connected == true){
    window.location.href = '../index.html'
}


registerBtn.addEventListener('click', async (event) => {
    const inputs = document.querySelectorAll('.registerForm input')
    // Don't reset the form
    event.preventDefault()

    // check if all inputs are filled and if the values aren't already taken
    let isInputsCorrect = await checkInputs(inputs)

    if (isInputsCorrect) {
        // Get user data with values of inputs
        let userData = {
            username: inputs[0].value,
            email: inputs[1].value,
            password: await hashPassword(inputs[2].value),
            isAdmin: false,
            lastConnection: new Date()
        }

        // Create a new user in the database
        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        }
        await fetch('/db/createAccount', options)

        // Set local storage data
        let data = JSON.parse(localStorage.getItem('codringData'))
        data.userId = await getUserId(inputs[1].value)
        data.connected = true
        localStorage.setItem('codringData', JSON.stringify(data))

        window.location.href = 'main.html'
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
    // Password conditions...
    return true
}
async function hashPassword(password) {
    let hash
    let options = {
        method: 'POST',
        headers: {
            'content-type': 'text/plain'
        },
        body: password
    }
    await fetch('/db/hashPassword', options)
        .then((response) => response.text())
        .then((result) => {
            hash = result
        })
    return hash
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



function showPassword() {
    let password = document.getElementById('passwordInput');
    
    if (password.type === "password") {
        password.type = "text";
    } else{
        password.type = "password";
    }
}
