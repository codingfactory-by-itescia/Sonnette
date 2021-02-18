// If user try to go to the admin panel, redirect him to the main page
checkForEntry()

async function checkForEntry() {
    let isUserAdmin
    // Get user by ID
    let id = JSON.parse(localStorage.getItem('codringData')).userId

    let options = {
        method: 'POST',
        body: id
    }
    await fetch('/db/getAccount', options)
    .then((response) => response.json())
    .then((data) => data.isAdmin ? isUserAdmin = true : isUserAdmin = false)

    if (!isUserAdmin) {
        window.location.href = 'main.html'
    }
}