const rebootPasswordContainer = document.querySelector('.forgotPasswordContainer')
const rebootPasswordBtn = document.querySelector('.rebootPasswordContainer button')
const forgotPasswordBtn = document.querySelector('.forgotPassword button')
const forgotPasswordInput = document.querySelector('#forgotPasswordInput')

// Display the "reboot password" section
rebootPasswordBtn.addEventListener('click', async () => {
    rebootPasswordContainer.style.display = 'flex'

    // Set the mail of the user in the input
    const userId = JSON.parse(localStorage.getItem('codringData')).userId
    setMailInput(userId)
})

// Reboot password
forgotPasswordBtn.addEventListener('click', async () => {
    let isEmailCorrect = await checkEmail(forgotPasswordInput.value)

    if (isEmailCorrect) {
        sendRebootPasswordEmail(forgotPasswordInput.value)
        sucMsg('Email envoyé')
    }
})

async function setMailInput(id) {
    // Get the mail of the user from his id
    const options = {
        method: 'POST',
        body: id
    }

    await fetch('/db/getAccount', options)
    .then((response) => response.json())
    .then((user) => {
        // Display the mail of the user in the input
        rebootPasswordContainer.querySelector('input').value = user.email
    })
}
