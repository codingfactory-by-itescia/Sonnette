let accountsListContainer = document.querySelector('.accountsList')

// Display all accounts in the container
displayAccounts()

async function displayAccounts() {
    let accounts = await getAllAccounts()

    for (let i = 0; i < accounts.length; i++) {
        const account = accounts[i];
        accountsListContainer.insertAdjacentHTML('afterbegin',`
            <div class="account">
                <p class="accountName">${account.username}</p>
                <p class="accountEmail">${account.email}</p>
                <p class="accountPassword">${account.password}</p>
                <p class="accountAdmin">${account.isAdmin ? 'oui' : 'non'}</p>
                <div class="binContainer" onclick="deleteAccount('${account._id.toString()}')"></div>
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

async function deleteAccount(id) {
    // Delete a user with his ID
    let options = {
        method: 'POST',
        body: id
    }
    fetch('/db/deleteAccount', options)
        .then(() => updateAccountsList())
}
function updateAccountsList() {
    const accountsContainer = document.querySelector('.accountsList')
    const accounts = document.querySelectorAll('.accountsList .account')

    for (let i = 0; i < accounts.length; i++) {
        accountsContainer.removeChild(accounts[i]);
    }
    displayAccounts()
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