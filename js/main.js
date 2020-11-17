let disconnectionBtn = document.getElementById('disconnectionBtn')
disconnectionBtn.addEventListener('click', () => {
    localStorage.setItem('connected', false)
    window.location.href = '../index.html'
})
const whurl = "https://discord.com/api/webhooks/778269268533444658/DqY1ieHcWbGCG6LEjzoGUDNXSIyffvc21zViIofbm0vson_v2rtuFrjUrTqYt6LNG3H8";

function sendMessage() {
    let txt = document.getElementById("msg").value;
    let msg = {"content": txt};
    console.log(msg)
    fetch(whurl + "?wait=true",{
        method:"POST",
        headers: {"constent-type":"application/json"
        }, 
        "body":JSON.stringify(msg)})
        .then(a=>a.json()).then(console.log)  
    console.log(txt);
}