let codringData = JSON.parse(localStorage.getItem('codringData'))

if(codringData.connected == false){
    window.location.href = '../index.html'
}
