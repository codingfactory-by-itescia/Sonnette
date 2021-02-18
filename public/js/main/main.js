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

let checkSound1 = document.getElementById("sound1")
let checkSound2 = document.getElementById("sound2")
let checkSound3 = document.getElementById("sound3")
let checkSound4 = document.getElementById("sound4")
let checkSound5 = document.getElementById("sound5")
let checkSound6 = document.getElementById("sound6")
let checkSound7 = document.getElementById("sound7")

let msgButton= document.querySelector('.sendMsgBtn')

function check1(){
    checkSound1.checked = true;
    checkSound2.checked = false;
    checkSound3.checked = false;
    checkSound4.checked = false;
    checkSound5.checked = false;
    checkSound6.checked = false;
    checkSound7.checked = false;
    console.log('check1')
}
function check2(){
    checkSound1.checked = false;
    checkSound2.checked = true;
    checkSound3.checked = false;
    checkSound4.checked = false;
    checkSound5.checked = false;
    checkSound6.checked = false;
    checkSound7.checked = false;
}
function check3(){
    checkSound1.checked = false;
    checkSound2.checked = false;
    checkSound3.checked = true;
    checkSound4.checked = false;
    checkSound5.checked = false;
    checkSound6.checked = false;
    checkSound7.checked = false;
}
function check4(){
    checkSound1.checked = false;
    checkSound2.checked = false;
    checkSound3.checked = false;
    checkSound4.checked = true;
    checkSound5.checked = false;
    checkSound6.checked = false;
    checkSound7.checked = false;
}
function check5(){
    checkSound1.checked = false;
    checkSound2.checked = false;
    checkSound3.checked = false;
    checkSound4.checked = false;
    checkSound5.checked = true;
    checkSound6.checked = false;
    checkSound7.checked = false;
}
function check6(){
    checkSound1.checked = false;
    checkSound2.checked = false;
    checkSound3.checked = false;
    checkSound4.checked = false;
    checkSound5.checked = false;
    checkSound6.checked = true;
    checkSound7.checked = false;
}
function check7(){
    checkSound1.checked = false;
    checkSound2.checked = false;
    checkSound3.checked = false;
    checkSound4.checked = false;
    checkSound5.checked = false;
    checkSound6.checked = false;
    checkSound7.checked = true;
}

function checkChecked(){
    if (checkSound1.checked ==true){
        let audio = new Audio('../audio/sound1.mp3')
        audio.play()
        audio.volume = .2
    }else if (checkSound2.checked == true){
        let audio = new Audio('../audio/sound2.mp3')
        audio.play()
        audio.volume = .2
    }else if (checkSound3.checked == true){
        let audio = new Audio('../audio/sound3.mp3')
        audio.play()   
        audio.volume = .2
    }else if (checkSound4.checked == true){
        let audio = new Audio('../audio/sound4.mp3')
        audio.play()    
        audio.volume = .2
    }else if (checkSound5.checked == true){
        let audio = new Audio('../audio/sound5.mp3')
        audio.play()  
        audio.volume = .2
    }else if (checkSound6.checked == true){
        let audio = new Audio('../audio/sound6.mp3')
        audio.play() 
        audio.volume = .2
    }       
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
    checkChecked()    
    
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

