let form = document.querySelector('form')
let textArea = document.querySelector('#msgArea')

function goBack(distance) {
    form.style.transform = `translateX(${distance}px)`
}

function validTextArea() {
    // Check if message is not empty
    if (textArea.value.length > 0) {
        event.preventDefault()
        form.style.transform = "translateX(-500px)"
        $('.sendMsgBtn').css("pointer-events", "all")
        $('.sendMsgContainer .leftArrowContainer').css("pointer-events", "all")
    } else {
        alert('Ton message est vide')
        return false
    }
}

function validSound() {
    event.preventDefault()
    form.style.transform = "translateX(-1000px)"
}

async function playSound(n) {
    // Play the sounds selected
    if (n == 7) {
        let sound = new Audio(urlCurrentSound)
        await getDuration(sound)
    } else {
        let sound = new Audio('../audio/sound' + n + '.mp3') 
        await getDuration(sound)
    }
}

// Check wich sound is selected
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

async function checkChecked(toSpeak){
    let audio
    if (checkSound1.checked ==true){
        audio = new Audio('../audio/sound1.mp3')
    }else if (checkSound2.checked == true){
        audio = new Audio('../audio/sound2.mp3')
    }else if (checkSound3.checked == true){
        audio = new Audio('../audio/sound3.mp3')
    }else if (checkSound4.checked == true){
        audio = new Audio('../audio/sound4.mp3')
    }else if (checkSound5.checked == true){
        audio = new Audio('../audio/sound5.mp3')
    }else if (checkSound6.checked == true){
        audio = new Audio('../audio/sound6.mp3')
    } else if (checkSound7.checked == true){
        audio = new Audio(urlCurrentSound)
    } else{
        SpeakWithTimeOut(toSpeak);
    }
    await getDurationAndSpeak(audio, toSpeak)    
}

async function getDuration(audio) {
    $(audio).on("loadedmetadata", async function(){
        let durationSound = audio.duration;
        await audio.play()
        audio.volume = .25
        if (durationSound < 8) {
            setTimeout(function(){
                pauseAudio(audio)
            }, durationSound*1000)
        } else {
            setTimeout(function(){
                pauseAudio(audio)
            }, 7000)
        }
    });
}

async function getDurationAndSpeak(audio, toSpeak) {
    $(audio).on("loadedmetadata", async function(){
        await audio.play()
        audio.volume = .25
        let durationSound = audio.duration
        if (durationSound < 8) {
            setTimeout(function(){
                pauseAudio(audio)
                SpeakWithTimeOut(toSpeak)
            }, durationSound*1000)
        } else {
            setTimeout(function(){
                pauseAudio(audio)
                SpeakWithTimeOut(toSpeak)
            }, 7000)
        }
    })
}

function pauseAudio(x) {
    x.pause();
}

let input = document.querySelector('#input');
let para = document.querySelector('.preview p');
let urlCurrentSound;


input.addEventListener('change', updateImageDisplay);

function updateImageDisplay() {
    var curFiles = input.files;    
    let nameFile ;
    if(curFiles.length == 0) {
      para.innerHTML = 'Pas de fichier importé';
    } else {
        if (curFiles[0].name.length > 15) {
            nameFile = curFiles[0].name.slice(0,15) 
        }
        else{
            nameFile = curFiles[0].name
        }
        para.innerHTML = 'Nom du son importé ' + nameFile ;
        urlCurrentSound = URL.createObjectURL(curFiles[0])
        check7();
    }
}

const urlDis = "https://discord.com/api/webhooks/778269268533444658/DqY1ieHcWbGCG6LEjzoGUDNXSIyffvc21zViIofbm0vson_v2rtuFrjUrTqYt6LNG3H8";

let durationMsg;
async function sendMessage() {
    event.preventDefault()
    $('.sendMsgBtn').css("pointer-events", "none")
    $('.sendMsgContainer .leftArrowContainer').css("pointer-events", "none")
    let txt = document.getElementById("msgArea").value;
    let msg = {"content": txt};
    // Get the selected alert
    let alert
    const alertList = $('.radioInputContainer input')
    for (let i = 0; i < alertList.length; i++) {
        if (alertList[i].checked) alert = i
    }

    await addMsgToHistory(txt, alert)
    printHistoryMsg()
    
    // Display the message in the history section
    msg.username = await getAuthor()
    await sendMessageSlack(msg.username, txt)
    fetch(urlDis + "?wait=true",{
        method:"POST",
        headers: {"content-type":"application/json"
        },
        "body":JSON.stringify(msg)})
        .then(a=>a.json())
    let toSpeak = new SpeechSynthesisUtterance(textArea.value);
    let selectedVoiceName = voiceList.selectedOptions[0].getAttribute('data-name');
    voices.forEach((voice)=>{
        if(voice.name === selectedVoiceName){
            toSpeak.voice = voice;
        }
    });

    await checkChecked(toSpeak) 
}

function SpeakWithTimeOut(toSpeak){
    synth.speak(toSpeak);
    toSpeak.onend = function(event){
        durationMsg = event.elapsedTime
        textArea.value = ''
        form.style.transform = 'translate(0)'
        counter.innerText = '0/' + maxLength
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
    // Get the voices of the navigator
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

async function checkForRefresh(){
    // Check if ther is the same number of cards in the site that there is in the bdd
    let counter = 0;
    allMsgData = await getAllMessages();
    lastsMsg = $('.msgCard');
    size = lastsMsg.length;
    for(i = 0; i < allMsgData.length; i++){
        const msg = allMsgData[i];
        const dateCrea = msg.createdAt; 
        const date = new Date(dateCrea);
        let day = date.getDate()
        if (day < 10) {
            day = '0' + day
        }
        let dateToday = new Date()
        let today = dateToday.getDate()
        if(day == today || day + 1 == today){
            counter++
        }
    }
    if(counter != size ){
        printHistoryMsg();
    }
}

setInterval(async function(){
    allMsgData = await getAllMessages();
    lastsMsg = $('.msgCard');    
    if (lastsMsg.length != 0) {
        await checkForRefresh()
    }
}, 2000)

async function addMsgToHistory(msg, alert) {
    let authorId =  JSON.parse(localStorage.getItem('codringData')).userId
    let author = await getAuthor()
    let messageData = {
        author: author,
        authorId: authorId,
        body: msg,
        alert: alert
    }
    // Set fetch options
    let options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(messageData)
    }
    await fetch('/db/newMessage', options)
    
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

let counter = document.querySelector('.textAreaContainer span');
let maxLength = textArea.getAttribute('maxlength');

textArea.addEventListener('input', event => {
    // Counter of caracter in the text area
    const valueLength = event.target.value.length;

    if (valueLength > maxLength) {
        return;
    }
    counter.innerText = valueLength + '/' + maxLength
})

async function sendMessageSlack(name, message){
    let msgData = {
        username: name,
        content: message
    }
    let options = {
        method: 'POST',
        body: JSON.stringify(msgData)
    }
    await fetch('/slack/sendMessage', options)
}
