async function checkEmail(email) {
    let emailRegexp = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/

    // Wait for the execution of all functions
    let isEmailExist = await checkEmailExist(email)
    
    if (!emailRegexp.test(email)) {
        errMsg('Email incorrect')
        return false
    } else if (!isEmailExist) {
        errMsg('Cet email n\'est associée à aucun compte')
        return false
    }
    return true
}

async function checkEmailExist (email) {
    let accounts = await getAllAccounts()
    
    for (let i = 0; i < accounts.length; i++) {
        if (accounts[i].email == email) {
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

function sendRebootPasswordEmail(email) {
    const options = {
        userEmail: email,
        rebootLink: `http://localhost:3001/html/rebootPassword.html?email=${email}`
    }

    emailjs.send('service_hd70jhg', 'template_xa27n3c', options, 'user_fKOFTHNVkZuzqNqHfz7Yw')
}

function errMsg(msg) {
    const msgContainer = document.querySelector('.forgotPassword .msg')
    msgContainer.innerHTML = msg
    msgContainer.classList.remove('successMsg')
    msgContainer.classList.add('errorMsg')
}

function sucMsg(msg) {
    const msgContainer = document.querySelector('.forgotPassword .msg')
    msgContainer.innerHTML = msg
    msgContainer.classList.add('successMsg')
    msgContainer.classList.remove('errorMsg')
}




