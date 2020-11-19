function showPasswords() {
    let password = document.getElementById('password');
    let password2 = document.getElementById('password2');
    
    if (password.type === "password") {
        password.type = "text";
    } else{
        password.type = "password";
    }
    
    if (password2.type === "password") {
        password2.type = "text";
    } else{
        password2.type = "password";
    }
}

let nomInput = document.getElementById('nom')
let prenomInput = document.getElementById('prenom')
let emailInput = document.getElementById('email')
let passwordInput = document.getElementById('password')
let confirmPasswordInput = document.getElementById('password2')

async function checkIfUserExist() {
    let data = await fetch('http://localhost:3000/api/userlist')
    let userList = await data.json()
    let counter = 0

    for(let i = 0; i < userList.length; i++) {
        if(emailInput.value == userList[i].email){
            counter++
            alert ("E-mail et/ou identifiant déjà existant")
            return false
        }
    }
    if (counter == 0) {
        checkForPassword()
    }
}

function checkForPassword() {
    
    if(passwordInput.value === confirmPasswordInput.value && isPasswordCorrect(passwordInput.value) /*&& validator.isEmail(emailInput.value)==true*/) {
        createNewUser()

    /*} else if (validator.isEmail(emailInput.value)== false){
        alert("l'email n'est pas valide")
        return false*/

    }else if (passwordInput.value != confirmPasswordInput.value){
        alert('Les mots de passe ne sont pas identiques')
        return false
    } else {
        alert('Les mots de passe renseignés ne contiennent pas au moins une minuscule, une majuscule, un chiffre et une longueur de 6 caractères')
        return false
    }
}

function createNewUser() {
    event.preventDefault()
    let data = {
        nom : nomInput.value,
        prenom: prenomInput.value,
        email: emailInput.value,
        password: passwordInput.value
    }
    let options = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    }
    fetch('http://localhost:3000/api/userlist', options)

    localStorage.setItem('connected', true)
    console.log('data saved');
    window.location.href = 'main.html'
}

function isPasswordCorrect(password) {
    // This function checks if the password contains a capital letter, a lower case, a special character and a number
    let capCounter = 0
    let lowCounter = 0
    let nbCounter = 0
    let speCharCounter = 0
    
    for (let i = 0; i < password.length; i++) {
        let letter = password[i];
        if (isNumber(letter)) {
            nbCounter++
        } else if (letter === letter.toUpperCase()) {
            capCounter++
        } else if (letter === letter.toLowerCase()) {
            lowCounter++
        }
    }

    if (capCounter >= 1 && lowCounter >=1 && nbCounter >= 1) {
        return true
    } else {
        return false
    }
}

function isNumber(letter) {
    let numbers = "0123456789"
    let counter = 0

    for (let i = 0; i < numbers.length; i++) {
        if (letter == numbers[i]) {
            counter++
            return true
        }
    }
    if (counter == 0) {
        return false
    }
}