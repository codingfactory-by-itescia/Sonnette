let disconnectionBtn = document.getElementById('disconnectionBtn')
disconnectionBtn.addEventListener('click', () => {
    localStorage.setItem('connected', false)
    window.location.href = '../index.html'
})
const whurl = "https://discord.com/api/webhooks/778269268533444658/DqY1ieHcWbGCG6LEjzoGUDNXSIyffvc21zViIofbm0vson_v2rtuFrjUrTqYt6LNG3H8";

function sendMessage() {
    let txt = document.getElementById("msg").value;
    let msg = {"content": txt};
    console.log(msg)
    fetch(whurl + "?wait=true",{
        method:"POST",
        headers: {"constent-type":"application/json"
        }, 
        "body":JSON.stringify(msg)})
        .then(a=>a.json()).then(console.log)
    console.log(txt);
}

/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function dropdown() {
    document.getElementById("theDropdown").classList.toggle("show");
  }
  
  // Close the dropdown menu if the user clicks outside of it
  window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
      let dropdowns = document.getElementsByClassName("dropDown");
      let i;
      for (i = 0; i < dropdowns.length; i++) {
        let openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
  }

let nextMenu = document.getElementById('main');

nextMenu.classList.toggle('show')

function changeMenu(menu){
  //Hide the old active menu
  let oldMenu = nextMenu;
  oldMenu.classList.toggle("show");

  //Show the new active menu
  nextMenu = document.getElementById(menu);
  nextMenu.classList.toggle("show");
}










