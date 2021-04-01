printAllHistoryMSg()

async function printAllHistoryMSg() {
    msgData = await getAllMessages()

    // Display all messages with details
    for (let i = 0; i < msgData.length; i++) {
        printMsg(msgData[i], false)
    }
}

async function printMsg(msg, newMsg) {
    let msgHistoryContainer = document.querySelector('.msgHistoryContainer')
    const dateCrea = msg.createdAt; 
    const date = new Date(dateCrea);
    
    let month = date.getMonth() + 1 ;
    let min = date.getUTCMinutes();
    let day = date.getDate()
    
    if (min < 10) min = '0' + min
    if (month < 10) month = '0' + month
    if (day < 10) day = '0' + day
    
    msgHistoryContainer.insertAdjacentHTML('afterbegin', `
        <div class="msgCard">
            <div class="userInfos">
                <a href='profil.html?id=${msg.authorId}'><p class="userName fontStyle">${msg.author}</p></a>
                <p class="msgTime fontStyle" style="opacity: .4">${day + '/' + month + ' '  + date.getHours() + ':' + min} </p>
            </div>
            <p class="msgContent fontStyle">${msg.body}</p>
        </div>
    `)

    if (newMsg) {
        const audio = new Audio(`../audio/sound${msg.alert+1}.mp3`)

        $(audio).on("loadedmetadata", async () => {
            // Play the alert
            audio.play()
            // Read the message after the alert
            setTimeout(() => {
                let toSpeak = new SpeechSynthesisUtterance(msg.body);
                speechSynthesis.speak(toSpeak)
            }, audio.duration * 1000)
        })
    }
}


async function getAllMessages() {
    let messages
    await fetch('/db/getMessages')
        .then((response) => response.json())
        .then((data) => messages = data)
    return messages
}

// Each 2 seconds, check if change append in bdd
setInterval(async function(){
    let allMsgData = await getAllMessages();
    let msgList = $('.msgCard')

    if (msgList.length != allMsgData.length) {
        let diffMsg = allMsgData.length - msgList.length

        for (let i = 1; i <= diffMsg; i++) {
            printMsg(allMsgData[allMsgData.length - i], true)
        }
    }  
}, 2000)


