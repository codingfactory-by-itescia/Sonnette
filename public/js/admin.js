const createAccountBtn = document.querySelector('#createAccountBtn')

createAccountBtn.addEventListener('click', (event) => {
    const createAccountForm = document.querySelector('#createAccountForm')
    const createAccountInputs = document.querySelectorAll('#createAccountForm input')
    // Don't reset the form
    event.preventDefault()

    // check if all inputs are filled and if the values aren't already taken
    if (checkInputs(createAccountInputs)) {
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
            const msgContainer = document.querySelector('#confirmCreateAccount')
            msgContainer.innerHTML = `Nouvel ${userData.isAdmin ? 'administrateur' : 'utilisateur'} créé`
            msgContainer.classList.add('successMsg')
            msgContainer.classList.remove('errorMsg')
        })
        .catch((error) => {
            // Display error message
            const msgContainer = document.querySelector('#confirmCreateAccount')
            msgContainer.innerHTML = error
            msgContainer.classList.remove('successMsg')
            msgContainer.classList.add('errorMsg')
        })
    
        // Reset all inputs of the form
        createAccountForm.reset()
    }
})
function checkInputs(inputs) {
    for (let i = 0; i < inputs.length; i++) {
        const input = inputs[i];
        const attribute = input.getAttribute('placeholder')

        if (attribute == 'Nom d\'utilisateur' && !checkUsername(input.value)) {
            // error
            // return false
        } else if (attribute == 'email' && !checkEmail(input.value)) {
            // error
            // return false
        } else if (attribute == 'Mot de passe' && !checkPassword(input.value)) {
            // error
            // return false
        }
    }
    return true
}
function checkUsername (username) {
    console.log(username);
    return true
}
function checkEmail (email) {
    console.log(email);
    return true
}
function checkPassword (password) {
    console.log(password);
    return true
}