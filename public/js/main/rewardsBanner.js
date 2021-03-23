// At the load of the page, get the diff time between now and the last connection
const userId = JSON.parse(localStorage.getItem('codringData')).userId
const options = {
    method: 'POST',
    body: userId
}
fetch('/db/getAccount', options)
.then((response) => response.json())
.then((user) => {
    console.log(`Last connection : ${new Date(user.lastConnection).toLocaleString()}`);

    const now = new Date()
    const lastConnection = new Date(user.lastConnection)
    const diffMilli = now - lastConnection
    
    const diffMinutes = Math.floor(diffMilli / 60000);
    const diffHours = Math.floor(diffMilli / (60000 * 60));
    const diffDays = Math.floor(diffMilli / (60000 * 60 * 24));

    displayDiffTime(diffMinutes, diffHours, diffDays)
})

function displayDiffTime(diffMinutes, diffHours, diffDays) {
    const lastConnectionTxt = document.querySelector('.getRewardsContainer .lastConnection')

    if (diffDays > 0) {
        lastConnectionTxt.innerHTML += ` ${diffDays} jour${diffDays > 1 ? 's' : ''}`
    } else if (diffHours > 0) {
        lastConnectionTxt.innerHTML += ` ${diffHours} heure${diffHours > 1 ? 's' : ''}`
    } else if (diffMinutes == 0) {
        lastConnectionTxt.innerHTML += ' moins d\'une minute'
    } else {
        lastConnectionTxt.innerHTML += ` ${diffMinutes} minute${diffMinutes > 1 ? 's' : ''}`
    }
}

// When the user quit the website, save the actual date in his profil
window.onbeforeunload = async () => {
    const userId = JSON.parse(localStorage.getItem('codringData')).userId

    const options = {
        method: 'POST',
        body: userId
    }
    await fetch('/db/editLastConnection', options)
}


