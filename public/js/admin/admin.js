async function getAllAccounts() {
    let accounts
    await fetch('/db/getAccounts')
        .then((response) => response.json())
        .then((data) => accounts = data)
    return accounts
}

async function getAllMessages() {
    let messages
    await fetch('/db/getMessages')
        .then((response) => response.json())
        .then((data) => messages = data)
    return messages
}