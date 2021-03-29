const messagesList = document.querySelector('.messagesList')
const messagesListInput = document.querySelector('#accountListInput')

// Display all accounts in the container
displayMessages()

async function displayMessages() {
    let messages = document.querySelectorAll('.messagesList .message')
    
    // Delete all messages in the container
    for (let i = 0; i < messages.length; i++) {
        messagesList.removeChild(messages[i]);
    }
    
    messages = await getAllMessages()
    // Display all messages
    for (let i = 0; i < messages.length; i++) {
        const message = messages[i];
        const msg = messages[i];
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
        messagesList.insertAdjacentHTML('afterbegin',`
            <div class="message" id="${message._id}">
                <div class="msgContent">
                    <a href='profil.html?id=${msg.authorId}'><p class="messageAuthor">${msg.author}</p></a>
                    <p class="messageBody">${message.body}</p>
                    <p class="msgTime fontStyle" style="opacity: .4">${day + '/' + month + ' '  + date.getHours() + ':' + min} </p>
                </div>
                
                <div class="binContainer msgBinContainer">
                <div class='confirmDeleteMsgContainer'>
                        <button onclick="deleteMsg('${message._id}')">Supprimer</button>
                        <button onclick="hideDeleteMsgAlert('${message._id}')">Annuler</button>
                    </div>
                    <img src='../../img/blackBin.png' alt='Supprimer ce message' onclick="displayDeleteMsgAlert('${message._id}')">
                </div>
            </div>
        `)
    }

    // Activate the search system
    if (messages.length > 0) {
        messagesSearchSystem()
    } else {
        document.querySelector('.messagesErrorMsg').innerHTML = 'Aucun message n\'a été trouvé'
    }
}

function hideDeleteMsgAlert(id) {
    const account = document.getElementById(id)
    account.querySelector('img').style.display = 'block'
    account.querySelector('.confirmDeleteMsgContainer').style.display = 'none'
}
function displayDeleteMsgAlert(id) {
    const account = document.getElementById(id)
    account.querySelector('img').style.display = 'none'
    account.querySelector('.confirmDeleteMsgContainer').style.display = 'flex'
}
async function deleteMsg(id) {
    // Delete a message with his ID
    let options = {
        method: 'POST',
        body: id
    }
    fetch('/db/deleteMessage', options)
        .then(() => displayMessages())
        .then(() => displayTotalMessages())
}
// Search system
function messagesSearchSystem() {
    let messagesListInput = document.querySelector('#messagesListInput')
    let messagesList = document.querySelectorAll('.message')
    let errorMsg = document.querySelector('.messagesErrorMsg')

    messagesListInput.addEventListener('input', () => {
        const toSearch = messagesListInput.value.toLowerCase()
    
        for (let i = 0; i < messagesList.length; i++) {
            const messageBody = messagesList[i].querySelector('.messageBody').innerHTML.toLowerCase();
    
            // If the message body doesn't match with the user input, hide the message
            if (messageBody.indexOf(toSearch) == -1) {
                messagesList[i].style.display = 'none'
            } else {
                messagesList[i].style.display = 'flex'
            }
        }

        // If all messages are hiden, display the error message
        let hiddenMessages = 0
    
        for (let i = 0; i < messagesList.length; i++) {
            if (messagesList[i].style.display == 'none') {
                hiddenMessages++
            }
        }
        if (hiddenMessages == messagesList.length) {
            errorMsg.classList.remove('hidden')
        } else {
            errorMsg.classList.add('hidden')
        }
    
        // If the input is empty, display all messages
        if (toSearch == '') {
            // Hide the error message
            errorMsg.classList.add('hidden')
    
            for (let i = 0; i < messagesList.length; i++) {
                messagesList[i].style.display = 'flex'
            }
        }
    })
}
async function getAllMessages() {
    let messages
    await fetch('/db/getMessages')
        .then((response) => response.json())
        .then((data) => messages = data)
    return messages
}

async function checkForRefresh(){
    allMsgData = await getAllMessages();
    lastsMsg = $('.message');
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
    }
    if(allMsgData.length != size ){
        displayMessages();
        displayTotalMessages();
    }
}

setInterval(async function(){
    allMsgData = await getAllMessages();
    lastsMsg = $('.message');    
    if (lastsMsg.length != 0) {
        await checkForRefresh()
    }  
}, 2000)
