// Get user id from url
const url = window.location.search
const urlParams = new URLSearchParams(url)
const userId = urlParams.get('id')

setUserData()

async function setUserData() {
    // Get user profile from id
    const user = await getUser()
    
    // Set the username on each span who contains the class "username"
    const usernameSpanList = document.querySelectorAll('.username')
    for (let i = 0; i < usernameSpanList.length; i++) {
        usernameSpanList[i].innerHTML = user.username
    }
    // Set the creation date of the account
    const creationDateElement = document.querySelector('.profilHeader .creationDate')
    creationDateElement.innerHTML = `Compte créé le ${getCreationDate(user.createdAt)}`
    // Set the total messages counter
    const totalMsgElements = document.querySelectorAll('.userDataCounter .userTotalMsg p')
    const totalMsgCounter = await getAllUserMessages(userId)
    totalMsgElements[0].innerHTML = totalMsgCounter
    totalMsgElements[1].innerHTML = `message${totalMsgCounter > 1 ? 's' : ''}`
}

async function getUser() {
    let user
    const options = {
        method: 'POST',
        body: userId
    }
    await fetch('/db/getAccount', options)
    .then(response => response.json())
    .then((data) => user = data )
    .catch(() => window.location.href = 'profilNotFound.html')
    return user
}

function getCreationDate(creationDate) {
    const date = new Date(creationDate);
    let day = date.getDate()
    let month = date.getMonth();
    let year = date.getFullYear();

    let months = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre']

    if (day < 10) day = '0' + day

    return `${day} ${months[month]} ${year}`
}

async function getAllUserMessages(id) {
    let msgList = await getAllMessages()
    let msgCounter = 0

    for (let i = 0; i < msgList.length; i++) {
        if (msgList[i].authorId == id) {
            msgCounter++
        }
    }
    return msgCounter
}
