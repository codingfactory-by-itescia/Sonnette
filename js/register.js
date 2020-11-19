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

if (localStorage.getItem('userList') == null) {
    localStorage.setItem('userList', '[]')
}

let nomInput = document.getElementById('nom')
let prenomInput = document.getElementById('prenom')
let emailInput = document.getElementById('email')
let passwordInput = document.getElementById('password')
let confirmPasswordInput = document.getElementById('password2')
let userList = JSON.parse(localStorage.getItem('userList'))

function checkIfUserExist() {
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

const validator = require('validator');


function checkForPassword() {
    
    if(passwordInput.value === confirmPasswordInput.value && isPasswordCorrect(passwordInput.value) /*&& validator.isEmail(emailInput.value)==true*/) {
        createNewProfile()

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

function createNewProfile() {
    let user = {
        nom: nomInput.value,
        prenom: prenomInput.value,
        email: emailInput.value,
        password: passwordInput.value
    }

    let users = JSON.parse(localStorage.getItem('userList'))
    users.push(user)
    localStorage.setItem('userList', JSON.stringify(users))
    localStorage.setItem('connected', true)
    
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

    



