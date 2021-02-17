const { static } = require('express');
const express = require('express');
const database = require('./database/databaseFunctions');

// Server initiation
const app = express()
const port = 3001
app.listen(port, () => {
    console.log(`Server start on port ${port}`);
})
app.use(static('public'))
app.use(express.json())
app.use(express.text())

// Database initiation
database.connect
const Account = database.schemas.Account
const Message = database.schemas.Message

// Create new account
app.post('/db/createAccount', (req, res) => {
    const userData = req.body

    const createAccount = new Account({
        username: userData.username,
        email: userData.email,
        password: userData.password,
        isAdmin: userData.isAdmin
    })
    createAccount.save()
        .then(() => { res.sendStatus(200) })
        .catch((error) => { res.send(error) })
})
// Get all accounts
app.get('/db/getAccounts', (req, res) => {
    Account.find().then((data) => {
        res.send(data)
    })
})
// Get account by ID
app.get('/db/getAccount', (req, res) => {
    const id = req.body

    Account.findById(id)
        .then((result) => { res.send(result) })
        .catch((error) => { res.send(error)})
})
// Delete account by ID
app.post('/db/deleteAccount', async (req, res) => {
    let accountToDelete = await Account.findById(req.body)
    await accountToDelete.remove().then(() => res.sendStatus(200))
})
// Get all messages
app.get('/db/getMessages', (req, res) => {
    Message.find().then((data) => {
        res.send(data)
    })
})
// Create new message
app.post('/db/newMessage', (req, res) => {
    let msgData = req.body
    const newMessage = new Message({
        author: msgData.author,
        authorId: msgData.authorId,
        body: msgData.body
    })

    newMessage.save()
        .then((result) => { res.send(result) })
        .catch((error) => { res.send(error) })
})
// Delete message by ID
app.post('/db/deleteMessage', async (req, res) => {
    let messageToDelete = await Message.findById(req.body)
    await messageToDelete.remove().then(() => res.sendStatus(200))
})