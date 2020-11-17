let disconnectionBtn = document.getElementById('disconnectionBtn')
disconnectionBtn.addEventListener('click', () => {
    localStorage.setItem('connected', false)
    window.location.href = '../login.html'
})

function sendMessage() {
    let txt = document.getElementById("msg").value;
    console.log(txt);
}