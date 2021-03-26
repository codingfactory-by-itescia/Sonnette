const { static } = require('express');
const express = require('express');
const bcrypt = require('bcryptjs')
const database = require('./database/databaseFunctions');
const dotenv = require('dotenv').config()
const { WebClient } = require('@slack/web-api');
require = require("esm")(module/*,options*/)

// Slack initiation 
<<<<<<< HEAD
const SLACK_OAUTH_TOKEN = 'xoxb-1780620095984-1780640389808-wguKG7GK69IF0FqaWP3gl5X8'
=======
const SLACK_OAUTH_TOKEN = process.env.SLACK_OAUTH_TOKEN;
>>>>>>> backend
const BOT_SPAM_CHANNEL = 'C01MU05PUSK' // this is the channel you want your bot online & spam to go
const web = new WebClient(SLACK_OAUTH_TOKEN);

// Server initiation
const app = express()
const port = 3001
app.listen(port, () => {
    console.log(`Server start on port ${port}`);
})
app.use(static('public'))
app.use(express.json())
app.use(express.text())

// Send message on Slack Server
app.post('/slack/sendMessage', async (req, res) => {
    const msgData = JSON.parse(req.body)
    const message = {
        username: msgData.username,
        content: msgData.content
    }
    await web.chat.postMessage({ username: message.username, channel: BOT_SPAM_CHANNEL, text: message.content })
    .then(() => { res.sendStatus(200) })
    .catch((error) => { res.send(error) })
})

// Database initiation
database.connect
const Account = database.schemas.Account
const Message = database.schemas.Message
const DefaultTodoList = database.schemas.DefaultTodoList

// Create new account
app.post('/db/createAccount', (req, res) => {
    const userData = req.body

    const createAccount = new Account({
        username: userData.username,
        email: userData.email,
        password: userData.password,
        isAdmin: userData.isAdmin,
        lastConnection: userData.lastConnection
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
app.post('/db/getAccount',(req, res) => {
    const id = req.body
    Account.findById(id)
        .then((result) => { res.send(result)})
        .catch((error) => { res.send(error)})
})
// Delete account by ID
app.post('/db/deleteAccount', async (req, res) => {
    let accountToDelete = await Account.findById(req.body)
    await accountToDelete.remove().then(() => res.sendStatus(200))
})
// Redefine "lastConnection" variable in the user profile
app.post('/db/editLastConnection', (req,res) => {
    const userId = req.body
    const newLastConnection = new Date()

    Account.findById(userId).then(async (user) => {
        user.lastConnection = newLastConnection
        await user.save()
    })
})
// Redefine the password of the user
app.post('/db/editPassword', (req,res) => {
    const userData = JSON.parse(req.body)

    Account.findById(userData.userId).then(async (user) => {
        user.password = bcrypt.hashSync(userData.newPassword, 10)
        await user.save()
    })
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
// Hash password
app.post('/db/hashPassword', async (req, res) => {
    let password = req.body
    bcrypt.hash(password, 10)
    .then((result) => { res.send(result) })
})

// Compare passwords
app.post('/db/comparePasswords', async (req, res) => {
    let passwords = req.body
    bcrypt.compare(passwords.password, passwords.hash)
    .then((match) => {
        if (match) {
            res.sendStatus(200)
        } else {
            res.sendStatus(400)
        }
    })
})
// Get all task of a user
app.post('/db/getPersonalTodoList', (req, res) => {
    const id = req.body
    Account.findById(id)
    .then((user) => res.send(user.personalTodoList))
})
// Set a new task in the "todoList" array of the user
app.post('/db/setNewTask', (req, res) => {
    const data = JSON.parse(req.body)

    Account.findById(data.userId).then(async (user) => {
        const task = {
            taskBody: data.taskBody,
            isDone: data.isDone
        }
    
        user.personalTodoList.push(task)
        await user.save()
        res.send(user.personalTodoList[user.personalTodoList.length-1])
    })
})
// Delete a task with his id
app.post('/db/deletePersonalTask', async (req, res) => {
    let data = JSON.parse(req.body)

    Account.findById(data.userId).then(async (user) => {
        for (let i = 0; i < user.personalTodoList.length; i++) {
            const task = user.personalTodoList[i];
            // Search for the wanted task
            if (task._id == data.taskId) {
                user.personalTodoList.splice(i, 1)
                await user.save().then(() => res.sendStatus(200))
            }
        }
    })
})
// Toggle the "done" or "undone" status of a task
app.post('/db/changePersonalTaskStatus', (req, res) => {
    let data = JSON.parse(req.body)

    Account.findById(data.userId).then(async (user) => {
        for (let i = 0; i < user.personalTodoList.length; i++) {
            const task = user.personalTodoList[i];
            // Search for the wanted task
            if (task._id == data.taskId) {
                task.isDone ? task.isDone = false : task.isDone = true
                await user.save().then(() => res.sendStatus(200))
            }
        }
    })
})
// Get all default tasks
app.get('/db/getDefaultTodoList', (req, res) => {
    DefaultTodoList.find().then((taskList) => res.send(taskList))
})
// Toggle the "done" or "undone" status of a default task
app.post('/db/changeDefaultTaskStatus', (req, res) => {
    let data = JSON.parse(req.body)

    Account.findById(data.userId).then(async (user) => {
        let foundMatch = false

        for (let i = 0; i < user.defaultTodoList.length; i++) {
            const task = user.defaultTodoList[i];

            // Search for the wanted task
            if (task.taskId == data.taskId) {
                foundMatch = true
                task.isDone ? task.isDone = false : task.isDone = true
                await user.save().then(() => res.sendStatus(200))
            }
        }
        // If the task wasn't found, create it and set it to "isDone"
        if (!foundMatch) {
            const newTask = {
                taskId: data.taskId,
                isDone: true
            }
            user.defaultTodoList.push(newTask)
            await user.save().then(() => res.sendStatus(200))
        }
    })
})
// Get "defaultTodoList" variable from user account
app.post('/db/getUserDefaultTodoList', (req, res) => {
    Account.findById(req.body).then((user) => { 
        res.send(user.defaultTodoList)
    })
})
// Delete a default task
app.post('/db/deleteDefaultTask', async (req, res) => {
    DefaultTodoList.findById(req.body).then(async (task) => {
        await task.remove()
    })
    // Delete the default task in the "defaultTodoList" variable of each user
    const userList = await Account.find()
    for (let i = 0; i < userList.length; i++) {
        const user = userList[i];
        // Find the wanted task with his ID
        for (let j = 0; j < user.defaultTodoList.length; j++) {
            const task = user.defaultTodoList[j];
            // When we find the task, delete it
            if (task.taskId == req.body) {
                user.defaultTodoList.splice(j,1)
                await user.save()
            }
        }
    }
    res.sendStatus(200)
})
// Create a new default task
app.post('/db/addNewDefaultTask', (req, res) => {
    const task = new DefaultTodoList ({ task: req.body })
    task.save().then((task => res.send(task)))
})
