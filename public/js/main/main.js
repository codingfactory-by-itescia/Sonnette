let form = document.querySelector('form')
let textArea = document.querySelector('#msgArea')

function goBack(distance) {
    form.style.transform = `translateX(${distance}px)`
}


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
async function sendMessage() {
    event.preventDefault()
    let txt = document.getElementById("msgArea").value;
    let msg = {"content": txt};

    addMsgToHistory(txt)

    // Display the message in the history section
    msg.username = await getAuthor()

    fetch(urlDis + "?wait=true",{
        method:"POST",
        headers: {"content-type":"application/json"
        },
        "body":JSON.stringify(msg)})
        .then(a=>a.json()).then(console.log)
    console.log(msg);
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
        textArea.value = ''
        form.style.transform = 'translate(0)'
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

async function addMsgToHistory(msg) {
    let authorId =  JSON.parse(localStorage.getItem('codringData')).userId
    let author = await getAuthor()
    console.log(author)
    let messageData = {
        author: author,
        authorId: authorId,
        body: msg
    }

    // Set fetch options
    options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(messageData)
    }
    fetch('/db/newMessage', options)
    
}

async function getAuthor(){
    let authorId = JSON.parse(localStorage.getItem('codringData')).userId
    let author
    let options = {
        method: 'POST',
        body: authorId
    }
    await fetch('/db/getAccount', options)
    .then((response) => response.json())
    .then((data) => author = data.username )
    return author
}

