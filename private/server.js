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
    Account.find()
        .then((result) => { res.send(result) })
        .catch((error) => { res.send(error)})
})

// Get account by ID
app.get('/db/getAccount', (req, res) => {
    const id = '602a8682239bf91def86143b'

    Account.findById(id)
        .then((result) => { res.send(result) })
        .catch((error) => { res.send(error)})
})

// Create new message
app.get('/db/newMessage', (req, res) => {
    const newMessage = new Message({
        author: 'user 4',
        authorId: '602a8962dfdd061fb33d0e6d',
        body: 'azerty'
    })

    newMessage.save()
        .then((result) => { res.send(result) })
        .catch((error) => { res.send(error) })
})













/* app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

// POST
app.post('/api/userlist', (req, res) => {
    db.insert(req.body)
})
// READ
app.get('/api/userlist', (req, res) => {
    db.find({}, (err, docs) => {
        if (err) {
            console.log(err);
        } else {
            res.send(docs)
        }
    })
}) */