let darkModeCheckbox = document.querySelector('#darkModeCheckbox')

// If variable 'darkMode' doesn't exist, create it
if (localStorage.getItem('darkMode') == null) {
    localStorage.setItem('darkMode', false)
}

// Add correct mode at refresh
if (localStorage.getItem('darkMode') == 'true') {
    darkMode('add')
    darkModeCheckbox.checked = true
} else {
    darkMode('remove')
}

// Listen if user
darkModeCheckbox.addEventListener('change', () => {
    if (localStorage.getItem('darkMode') === 'false') {
        darkMode('add')
    } else {
        darkMode('remove')
    }
})

function darkMode(toggle) {
    let html = document.querySelector('html')
    let inputs = document.querySelectorAll('input')
    let textArea = document.querySelector('#msgArea')

    if (toggle === 'add') {
        html.classList.add('darkMode')
        textArea == null ? '' : textArea.classList.add('darkMode')
        for (let i = 0; i < inputs.length; i++) {
            const input = inputs[i];
            input.classList.add('darkMode')
        }
        localStorage.setItem('darkMode', true)
    }
    else {
        html.classList.remove('darkMode')
        textArea == null ? '' : textArea.classList.remove('darkMode')
        for (let i = 0; i < inputs.length; i++) {
            const input = inputs[i];
            input.classList.remove('darkMode')
        }
        localStorage.setItem('darkMode', false)
    }
}