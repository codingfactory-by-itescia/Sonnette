const connectionBtn = document.querySelector('#conncetionBtn')

if (localStorage.getItem('codringData') == null) {
    localStorage.setItem('codringData', '{}')
}
  
if (JSON.parse(localStorage.getItem('codringData')).connected == "true") {
    window.location.href = 'html/main.html'
}

connectionBtn.addEventListener('click', async (event) => {
    const loginInput = document.querySelectorAll('.formContainer input')
    // Don't reset the form
    event.preventDefault()

    // check if all inputs are filled and if the values aren't already taken
    let isInputsCorrect = await checkInputs(loginInput, 'formContainer')

    if (isInputsCorrect) {
        // set the user id in local storage
        let data = JSON.parse(localStorage.getItem('codringData'))
        data.userId = await getUserId(loginInput[0].value)
        data.connected = true
        localStorage.setItem('codringData', JSON.stringify(data))

        window.location.href = 'html/main.html'
    }
})

async function checkInputs(inputs) {
    let emailRegexp = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/

    // Wait for the execution of all functions
    isEmailCorrect = await checkEmail(inputs[0].value)
    isPasswordCorrect = await checkPassword(inputs[1].value, inputs[0].value)
    
    if (!emailRegexp.test(inputs[0].value)) {
        errorMsg('Email invalide')
        return false
    } else if (!isEmailCorrect) {
        errorMsg('Cet email n\'est associée à aucun compte')
        return false
    }
    else if (!isPasswordCorrect) {
        errorMsg('Mot de passe incorrect')
        return false
    }
    return true
}
async function checkEmail (email) {
    let accounts = await getAllAccounts()
    
    for (let i = 0; i < accounts.length; i++) {
        if (accounts[i].email == email) {
            return true
        }
    }
    return false
    
}
async function checkPassword (password, email) {
    let accounts = await getAllAccounts()

    for (let i = 0; i < accounts.length; i++) {

        if (accounts[i].email == email && accounts[i].password == password) {
            return true
        }
    }
    return false
}
async function getAllAccounts() {
    let accounts
    await fetch('/db/getAccounts')
        .then((response) => response.json())
        .then((data) => accounts = data)
    return accounts
}
function errorMsg(msg) {
    const msgContainer = document.querySelector('.formContainer .msgContainer')
    msgContainer.innerHTML = msg
    msgContainer.classList.remove('successMsg')
    msgContainer.classList.add('errorMsg')
}
async function getUserId(email) {
    let accounts = await getAllAccounts()
    let id = 'nop'
    console.log(email + "\n");
    for (let i = 0; i < accounts.length; i++) {
        console.log(accounts[i].email);
        if (accounts[i].email == email) {
            id = accounts[i]._id.toString()
            break
        }
    }
    return id
}


function showPasswords() {
    let password = document.getElementById('password');
    
    if (password.type === "password") {
        password.type = "text";
    } else{
        password.type = "password";
    }
}