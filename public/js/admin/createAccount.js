const createAccountBtn = document.querySelector('#createAccountBtn')

createAccountBtn.addEventListener('click', async (event) => {
    const createAccountForm = document.querySelector('#createAccountForm')
    const createAccountInputs = document.querySelectorAll('#createAccountForm input')
    // Don't reset the form
    event.preventDefault()

    // Wait for the execution of the function
    let isInputsCorrect = await checkInputs(createAccountInputs)
    
    // check if all inputs are filled and if the values aren't already taken
    if (isInputsCorrect) {
        // Get user data with values of inputs
        let userData = {
            username: createAccountInputs[0].value,
            email: createAccountInputs[1].value,
            password: createAccountInputs[2].value,
            isAdmin: createAccountInputs[3].checked ? true : false
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
        .then(() => {
            // Display success message
            successMsg(`Nouvel ${userData.isAdmin ? 'administrateur' : 'utilisateur'} créé`, 'createAccountForm')
        })
        // Reset all inputs of the form
        createAccountForm.reset()
    }
})
async function checkInputs(inputs) {
    let emailRegexp = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/

    for (let i = 0; i < inputs.length; i++) {
        const input = inputs[i];
        const attribute = input.getAttribute('placeholder')

        // Wait for the execution of all functions
        let isUsernameCorrect = await checkUsername(input.value)
        let isEmailCorrect = await checkEmail(input.value)
        let isPasswordCorrect = await checkPassword(input.value)
        
        
        // Check the username
        if (attribute == 'Nom d\'utilisateur' && !isUsernameCorrect) {
            errorMsg('Ce nom d\'utilisateur éxiste déjà', 'createAccountForm')
            return false
        } else if (attribute == 'Nom d\'utilisateur' && input.value.length < 3) {
            errorMsg('Nom d\'utilisateur trop court', 'createAccountForm')
            return false
        }
        // Check the email
        else if (attribute == 'email' && !emailRegexp.test(input.value)) {
            errorMsg('Email invalide', 'createAccountForm')
            return false
        } else if (attribute == 'email' && !isEmailCorrect) {
            errorMsg('Cet email existe déjà', 'createAccountForm')
            return false
        }
        // Check the password
        else if (attribute == 'Mot de passe' && !isPasswordCorrect) {
            errorMsg('Mot de passe incorrect', 'createAccountForm')
            return false
        }
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
    if (password.length < 3) {
        return false
    }
    return true
}
function errorMsg(msg, form) {
    const msgContainer = document.querySelector(`#${form} #confirmCreateAccount`)
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