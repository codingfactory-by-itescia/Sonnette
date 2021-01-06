let darkModeCheckbox = document.querySelector('#darkModeCheckbox')

// If variable 'darkMode' doesn't exist, create it
if (localStorage.getItem('darkMode') === null) {
    localStorage.setItem('darkMode', 'true')
}


// Add correct mode at refresh
if (localStorage.getItem('darkMode') === 'true') {
    darkMode('add')
    if (darkModeCheckbox) {
        darkModeCheckbox.checked = true
    }
} else {
    darkMode('remove')
}

if (darkModeCheckbox) {
    darkModeCheckbox.addEventListener('change', () => {
        if (localStorage.getItem('darkMode') === 'false') {
            darkMode('add')
            localStorage.setItem('darkMode', 'true')
        } else {
            darkMode('remove')
            localStorage.setItem('darkMode', 'false')
        }
    }
)}

function darkMode(arg) {
    let head = document.querySelectorAll('head')[0]

    // Add dark mode by adding the darMode.css file to the html page
    if (arg === 'add') {
        let cssFile = document.createElement('link')
        cssFile.rel  = 'stylesheet';
        cssFile.type = 'text/css';
        cssFile.href = '../css/darkMode.css'

        head.appendChild(cssFile)
    }
    // Remove dark mode by deleting the darkMode.css file
    else {
        for (let i = 0; i < document.styleSheets.length; i++) {
            let cssFile = document.styleSheets[i].href
            let regExp = new RegExp('\/css\/darkMode\.css$')

            if (regExp.test(cssFile)) {
                cssFile.disabled = true
                document.location.reload(true);
                break
            }
        }
    }
}