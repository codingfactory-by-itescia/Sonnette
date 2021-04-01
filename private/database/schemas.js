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
    userPoints: {
        type: Number,
        require: true
    },
    rewards: [
        {
            rewardId: String,
            rewardTitle: String,
            lastClaim: Date,
            claimed: Boolean
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
    },
    alert: {
        type: Number
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
    rewardPoints: {
        type: Number,
        require: true
    },
    isRewardCycled: {
        type: Boolean,
        require: true
    },
    rewardCycle: {
        type: Number
    },
}, {timestamps: true})

module.exports = {
    Account: mongoose.model('accounts', accountSchema),
    Message: mongoose.model('messages', messagesSchema),
    DefaultTodoList: mongoose.model('defaultTodoList', defaultTodoListSchema),
    Rewards: mongoose.model('rewards', rewardsSchema),
}
