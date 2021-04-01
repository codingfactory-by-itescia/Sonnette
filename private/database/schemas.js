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
    personalTodoList: [
        {
            taskId: mongoose.Schema.Types.ObjectId,
            taskBody: String,
            isDone: Boolean
        }
    ],
    defaultTodoList: [
        {
            taskId: String,
            isDone: Boolean

        }
    ],
    rewards: [
        {
            rewardId: String,
            rewardTitle: String,
            lastClaim: Date
        }
    ],
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

const defaultTodoListSchema = new mongoose.Schema({
    task: String
        
}, {timestamps: true})

const rewardsSchema = new mongoose.Schema({
    rewardTitle: {
        type: String,
        require: true
    },
    isRewardCycled: {
        type: Boolean,
        require: true
    },
    rewardCycle: {
        type: Number
    }
}, {timestamps: true})

module.exports = {
    Account: mongoose.model('accounts', accountSchema),
    Message: mongoose.model('messages', messagesSchema),
    DefaultTodoList: mongoose.model('defaultTodoList', defaultTodoListSchema),
    Rewards: mongoose.model('rewards', rewardsSchema),
}
