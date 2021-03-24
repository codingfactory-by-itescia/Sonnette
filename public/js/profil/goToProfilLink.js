// Set the href attribute of the "go to profile" link
let userLocalId = JSON.parse(localStorage.getItem('codringData')).userId
let profilPageBtn = document.querySelector('#goToProfilPageBtn')
profilPageBtn.setAttribute('href', `profil.html?id=${userLocalId}`)
