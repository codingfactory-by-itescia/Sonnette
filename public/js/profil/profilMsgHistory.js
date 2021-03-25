printHistoryMsg()

async function printHistoryMsg(){
    let messages = document.querySelectorAll('.profilMsgHistory .msgCard')
    let msgHistoryContainer = document.querySelector('.profilMsgHistory')
    // Get all messages
    const msgList = await getAllMessages()
    let msgCounter = 0
    // Get user id from url
    const url = window.location.search
    const urlParams = new URLSearchParams(url)
    const userId = urlParams.get('id')

    // Delete all messages in the container
    for (let i = 0; i < messages.length; i++) {
        msgHistoryContainer.removeChild(messages[i]);
    }
    
    // Display all messages with details
    for (let i = 0; i < msgList.length; i++) {
        const msg = msgList[i];
        
        if (msg.authorId == userId) {
            const date = new Date(msg.createdAt);
            let month = date.getMonth() + 1 ;
            let min = date.getUTCMinutes();
            let day = date.getDate()
    
            if (min < 10) min = '0' + min
            if (month < 10) month = '0' + month
            if (day < 10) day = '0' + day
            
            msgHistoryContainer.insertAdjacentHTML('afterbegin', `
                <div class="msgCard">
                    <p class="msgContent fontStyle">${msg.body}</p>
                    <p class="msgTime fontStyle" style="opacity: .4">${day + '/' + month + ' '  + date.getHours() + ':' + min} </p>
                </div>
            `)
            msgCounter++
        }
    }
    // If user has no message, display the empty message
    if (msgCounter == 0) {
        document.querySelector('.profilMsgHistory .emptyMsgAlert').style.display = 'block'
    }
}

async function getAllMessages() {
    let messages
    await fetch('/db/getMessages')
        .then((response) => response.json())
        .then((data) => messages = data)
    return messages
}
