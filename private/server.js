const express = require('express')
const dotenv = require('dotenv').config()
const {MongoClient} = require('mongodb');
const mongoose = require('mongoose')

// Server initiation
const app = express()
app.listen(3001, () => {
    console.log('server started');
})
app.use(express.json())
app.use(express.text())

// Database initiation
const DB_URI = "mongodb+srv://Ugo_P:WaDUFQj9vMjxEE7O@codringcluster.zarcm.mongodb.net/test?retryWrites=true&w=majority"
mongoose.connect(DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => { console.log('Connected to db') })
.catch((error) => { console.log(error) })

app.use((req, res, next) => {
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
})

