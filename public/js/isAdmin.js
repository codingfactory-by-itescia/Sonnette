
// If the connnected user is an admin, display the admin icon
isUserAdmin()

async function isUserAdmin() {
    let admin
    // Get user by ID
    let id = JSON.parse(localStorage.getItem('codringData')).userId

    let options = {
        method: 'POST',
        body: id
    }
    await fetch('/db/getAccount', options)
    .then((response) => response.json())
    .then((data) => data.isAdmin ? admin = true : admin = false)

    if (admin) {
        adminIcon.style.display = 'inline'
        adminIcon.addEventListener('click', () => window.location.href = 'admin.html')
    } else {
        adminIcon.style.display = 'none'
    }
}

