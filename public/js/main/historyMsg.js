printHistoryMsg()

async function printHistoryMsg(){
    msgData = await getAllMessages()

    let msgHistoryContainer = document.querySelector('.msgHistoryContainer')
    for (let i = 0; i < msgData.length; i++) {
        const msg = msgData[i];
        const dateCrea = msg.createdAt; 
        const date = new Date(dateCrea);
        let month = date.getMonth() + 1 ;
        let min = date.getUTCMinutes();
        let day = date.getDate()
        if (min < 10) {
            min = '0' + min
        }
        if (month < 10) {
            month = '0' + month
        }
        if (day < 10) {
            day = '0' + day
        }
        let dateToday = new Date()
        let today = dateToday.getDate()
        if(day == today || day + 1 == today){
            msgHistoryContainer.insertAdjacentHTML('afterbegin', `
        <div class="msgCard">
            <div class="userInfos">
                <p class="userName fontStyle">${msg.author}</p>
                <p class="msgTime fontStyle">${day + '/' + month + ' '  + date.getHours() + ':' + min} </p>
            </div>
            <p class="msgContent fontStyle">${msg.body}</p>
        </div>
        `)
        }
        
    }
    
}

function getTime() {
    let date = new Date()
    let min = date.getMinutes()

    if (min < 10) {
        min = '0' + min
    }

    let time = date.getHours() + ':' + min
    return time
}

async function getAllMessages() {
    let messages
    await fetch('/db/getMessages')
        .then((response) => response.json())
        .then((data) => messages = data)
    return messages
}