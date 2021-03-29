let accountsListContainer = document.querySelector('.accountsList')

// Display all accounts in the container
displayAccounts()

async function displayAccounts() {
    const accountsContainer = document.querySelector('.accountsList')
    let accounts = document.querySelectorAll('.accountsList .account')

    // Delete all accounts of the container
    for (let i = 0; i < accounts.length; i++) {
        accountsContainer.removeChild(accounts[i]);
    }

    // Display all accounts 
    accounts = await getAllAccounts()

    for (let i = 0; i < accounts.length; i++) {
        const account = accounts[i];
        accountsListContainer.insertAdjacentHTML('afterbegin',`
            <div class="account" id="${account._id}">
                <p class="accountName">${account.username}</p>
                <p class="accountEmail">${account.email}</p>
                <p class="accountPassword">${account.password}</p>
                <p class="accountAdmin">${account.isAdmin ? 'oui' : 'non'}</p>
                <div class="binContainer">
                    <div class='confirmDeleteAccountContainer'>
                        <button onclick="deleteAccount('${account._id.toString()}')">Supprimer</button>
                        <button onclick="hideDeleteAccountAlert('${account._id}')">Annuler</button>
                    </div>
                    <img src='../../img/blackBin.png' alt='Supprimer ce compte' onclick="displayDeleteAccountAlert('${account._id}')">
                </div>
            </div>
        `)
    }

    // Activate the search system
    if (accounts.length > 0) {
        accountsSearchSystem()
    } else {
        document.querySelector('.accountErrorMsg').innerHTML = 'Aucun compte n\'a été trouvé'
    }
}

function hideDeleteAccountAlert(id) {
    const account = document.getElementById(id)
    account.querySelector('img').style.display = 'block'
    account.querySelector('.confirmDeleteAccountContainer').style.display = 'none'
}
function displayDeleteAccountAlert(id) {
    const account = document.getElementById(id)
    account.querySelector('img').style.display = 'none'
    account.querySelector('.confirmDeleteAccountContainer').style.display = 'flex'
}

async function deleteAccount(id) {
    // Delete a user with his ID
    let options = {
        method: 'POST',
        body: id
    }
    fetch('/db/deleteAccount', options)
        .then(() => displayAccounts())
}

// Search system
function accountsSearchSystem() {
    let accountsListInput = document.querySelector('#accountListInput')
    let accountsList = document.querySelectorAll('.account')
    let errorMsg = document.querySelector('.accountErrorMsg')

    accountsListInput.addEventListener('input', () => {
        const toSearch = accountsListInput.value.toLowerCase()
    
        for (let i = 0; i < accountsList.length; i++) {
            const username = accountsList[i].querySelector('.accountName').innerHTML.toLowerCase();
            const email = accountsList[i].querySelector('.accountEmail').innerHTML.toLowerCase();
    
            // If the account name or email doesn't match with the user input, hide the account
            if (username.indexOf(toSearch) == -1 && email.indexOf(toSearch) == -1) {
                accountsList[i].style.display = 'none'
            } else {
                accountsList[i].style.display = 'flex'
            }
        }

        // If all accounts are hiden, display the error message
        let hiddenAccounts = 0
    
        for (let i = 0; i < accountsList.length; i++) {
            if (accountsList[i].style.display == 'none') {
                hiddenAccounts++
            }
        }
        if (hiddenAccounts == accountsList.length) {
            errorMsg.classList.remove('hidden')
        } else {
            errorMsg.classList.add('hidden')
        }
    
        // If the input is empty, display all accounts
        if (toSearch == '') {
            // Hide the error message
            errorMsg.classList.add('hidden')
    
            for (let i = 0; i < accountsList.length; i++) {
                accountsList[i].style.display = 'flex'
            }
        }
    })
}

async function getAllAccounts() {
    let accounts
    await fetch('/db/getAccounts')
        .then((response) => response.json())
        .then((data) => accounts = data)
    return accounts
}
