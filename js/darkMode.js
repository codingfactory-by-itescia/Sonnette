// If variable 'darkMode' doesn't exist, cerate it
if (localStorage.getItem('darkMode') == null) {
    localStorage.setItem('darkMode', false)
}

// Add correct mode at refresh
if (localStorage.getItem('darkMode') == 'true') {
    darkMode('add')
} else {
    darkMode('remove')
}

// Listen if user
let darkModeBtn = document.querySelector('.darkModeBtn')
darkModeBtn.addEventListener('click', () => {
    if (localStorage.getItem('darkMode') === 'true') {
        darkMode('remove')
    } else {
        darkMode('add')
    }
})

function darkMode(toggle) {
    let html = document.querySelector('html')
    let inputs = document.querySelectorAll('input')

    if (toggle === 'add') {
        html.classList.add('darkMode')
        for (let i = 0; i < inputs.length; i++) {
            const input = inputs[i];
            input.classList.add('darkMode')
        }
        localStorage.setItem('darkMode', true)
    } else {
        html.classList.remove('darkMode')
        for (let i = 0; i < inputs.length; i++) {
            const input = inputs[i];
            input.classList.remove('darkMode')
        }
        localStorage.setItem('darkMode', false)
    }
}