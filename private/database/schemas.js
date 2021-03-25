const { Timestamp } = require('mongodb')
const mongoose = require('mongoose')

const accountSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    isAdmin: {
        type: Boolean,
        require: true
    },
    lastConnection: {
        type: Date,
        require: true
    },
    todoList: [
        {
            taskId: mongoose.Schema.Types.ObjectId,
            taskBody: String,
            isDone: Boolean
        }
    ]
}, {timestamps: true})

const messagesSchema = new mongoose.Schema({
    author: {
        type: String,
        require: true
    },
    authorId: {
        type: String,
        require: true
    },
    body: {
        type: String,
        require: true
    }
}, {timestamps: true})

module.exports = {
    Account: mongoose.model('accounts', accountSchema),
    Message: mongoose.model('messages', messagesSchema)
}
