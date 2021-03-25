// Set the href attribute of the "go to profile" link
let userLocalId = JSON.parse(localStorage.getItem('codringData')).userId
let profilPageBtn = document.querySelectorAll('.goToProfilPageBtn')
for (let i = 0; i < profilPageBtn.length; i++) {
    profilPageBtn[i].setAttribute('href', `profil.html?id=${userLocalId}`)
}

