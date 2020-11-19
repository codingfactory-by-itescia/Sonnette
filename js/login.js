function showPasswords() {
    let password = document.getElementById('password');
    
    if (password.type === "password") {
        password.type = "text";
    } else{
        password.type = "password";
    }
}

if (localStorage.getItem('connected') == null) {
    localStorage.setItem('connected', false)
}
  
if (localStorage.getItem('connected') == "true") {
    window.location.href = 'html/main.html'
}
  
async function checkIfUserExist() {
    let emailInput = document.getElementById('email')
    let passInput = document.getElementById('password')
    let data = await fetch('http://localhost:3000/api/userlist')
    let userList = await data.json()
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