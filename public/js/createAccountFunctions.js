const createAccountBtn = document.querySelector('#createAccountBtn')

createAccountBtn.addEventListener('click', async (event) => {
    const createAccountForm = document.querySelector('#createAccountForm')
    const createAccountInputs = document.querySelectorAll('#createAccountForm input')
    // Don't reset the form
    event.preventDefault()

    // check if all inputs are filled and if the values aren't already taken
    let isInputsCorrect = await checkInputs(createAccountInputs, 'createAccountForm')
    
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

async function checkInputs(inputs, form) {
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
            errorMsg('Ce nom d\'utilisateur éxiste déjà', form)
            return false
        } else if (attribute == 'Nom d\'utilisateur' && input.value.length < 3) {
            errorMsg('Nom d\'utilisateur trop court', form)
            return false
        }
        // Check the email
        else if (attribute == 'Email' && !emailRegexp.test(input.value)) {
            errorMsg('Email invalide', form)
            return false
        } else if (attribute == 'Email' && !isEmailCorrect) {
            errorMsg('Cet email existe déjà', form)
            return false
        }
        // Check the password
        else if (attribute == 'Mot de passe' && !isPasswordCorrect) {
            errorMsg('Mot de passe trop court', form)
            return false
        }
    }
    return true
}