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
        messagesList.insertAdjacentHTML('afterbegin',`
            <div class="message">
                <div class="msgContent">
                    <p class="messageAuthor">${message.author}</p>
                    <p class="messageBody">${message.body}</p>
                </div>
                <div class="binContainer msgBinContainer" onclick="deleteMsg('${message._id.toString()}')"></div>
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

async function deleteMsg(id) {
    // Delete a message with his ID
    let options = {
        method: 'POST',
        body: id
    }
    fetch('/db/deleteMessage', options)
        .then(() => displayMessages())
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
