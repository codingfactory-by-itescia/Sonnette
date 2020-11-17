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