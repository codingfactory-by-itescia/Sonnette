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
  
if (localStorage.getItem('connected') == null) {
    localStorage.setItem('connected', false)
}
  
if (localStorage.getItem('connected') == "true") {
    window.location.href = 'html/main.html'
}
  
function checkIfUserExist() {
    let emailInput = document.getElementById('email')
    let passInput = document.getElementById('password')
    let userList = JSON.parse(localStorage.getItem('userList'))
    let counter = 0
  
    for (let i = 0; i < userList.length; i++) {
  
        if(emailInput.value == userList[i].email && passInput.value == userList[i].password) {
            counter++
            localStorage.setItem('connected', true)
            window.location.href = "html/main.html"
            break
        }
    }
    if (counter == 0) {
        alert('Email ou mot de passe incorrect')
        return false
    }
}