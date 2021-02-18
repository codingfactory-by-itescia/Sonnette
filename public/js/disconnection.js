const disconnectionBtn = document.querySelector('#disconnectionBtn')

disconnectionBtn.addEventListener('click', () => {
    let codringData = JSON.parse(localStorage.getItem('codringData'))
    codringData.connected = false
    localStorage.setItem('codringData', JSON.stringify(codringData))

    window.location.href = '../index.html'
})