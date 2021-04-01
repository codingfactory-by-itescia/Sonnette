const mongoose = require('mongoose')
const schemas = require('./schemas')

const DB_URI = "mongodb+srv://Ugo_P:WaDUFQj9vMjxEE7O@codringcluster.zarcm.mongodb.net/codRingDatabase?retryWrites=true&w=majority"

function connect() {
    mongoose.connect(DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => { console.log('Connected to db') })
    .catch((error) => { console.log(error) })
}
function getAllAccounts() {
    let accounts
    schemas.Account.find()
        .then((data) => {
            accounts = data
        })
    return accounts
}



module.exports = {
    connect: connect(),
    schemas: {
        Account: schemas.Account,
        Message: schemas.Message,
        DefaultTodoList: schemas.DefaultTodoList,
        Rewards: schemas.Rewards,
    }
}
