let disconnectionBtn = document.getElementById('disconnectionBtn')
disconnectionBtn.addEventListener('click', () => {
    localStorage.setItem('connected', false)
    window.location.href = '../index.html'
})

let form = document.querySelector('form')
let textArea = document.querySelector('#msgArea')

function validTextArea() {
    if (textArea.value.length > 0) {
        event.preventDefault()
        form.style.transform = "translateX(-500px)"
    } else {
        alert('Ton message est vide')
        return false
    }
}

function validSound() {
    event.preventDefault()
    form.style.transform = "translateX(-1000px)"
}

function playSound(n) {
  let sound = new Audio('../audio/sound' + n + '.mp3')
  sound.play()
  sound.volume = .5
}

const urlDis = "https://discord.com/api/webhooks/778269268533444658/DqY1ieHcWbGCG6LEjzoGUDNXSIyffvc21zViIofbm0vson_v2rtuFrjUrTqYt6LNG3H8";

let durationMsg;
function sendMessage() {
    event.preventDefault()
    let txt = document.getElementById("msgArea").value;
    let msg = {"content": txt};
    /*console.log(sessionStorage.getItem(sessionStorage.key(0)))
    console.log(sessionStorage)*/
    msg.username = localStorage.getItem('username')
    console.log(msg)
    fetch(urlDis + "?wait=true",{
        method:"POST",
        headers: {"content-type":"application/json"
        },
        "body":JSON.stringify(msg)})
        .then(a=>a.json()).then(console.log)
    console.log(txt);
    let toSpeak = new SpeechSynthesisUtterance(textArea.value);
    let selectedVoiceName = voiceList.selectedOptions[0].getAttribute('data-name');
    voices.forEach((voice)=>{
        if(voice.name === selectedVoiceName){
            toSpeak.voice = voice;
        }
    });
    synth.speak(toSpeak);
    toSpeak.onend = function(event){
        durationMsg = event.elapsedTime
        console.log(durationMsg)
        window.location.reload()
    }
    
}

let voiceList = document.querySelector('#voiceList');
let synth = window.speechSynthesis;
let voices = [];

PopulateVoices();
if(speechSynthesis !== undefined){
    speechSynthesis.onvoiceschanged = PopulateVoices;
}

function PopulateVoices(){
    voices = synth.getVoices();
    let selectedIndex = voiceList.selectedIndex < 0 ? 0 : voiceList.selectedIndex;
    voiceList.innerHTML = '';
    voices.forEach((voice)=>{
        let listItem = document.createElement('option');
        listItem.textContent = voice.name;
        listItem.setAttribute('data-lang', voice.lang);
        listItem.setAttribute('data-name', voice.name);
        voiceList.appendChild(listItem);
    });

    voiceList.selectedIndex = selectedIndex;
}
