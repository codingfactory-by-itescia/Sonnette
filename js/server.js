const express = require('express')
const dataStore = require('nedb')

// DB init
const db =  new dataStore({ filename: 'userList'})
db.loadDatabase()

// Init server
const app = express()
app.use(express.json())

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });


// POST
app.post('/api/userlist', (req, res) => {
    console.log('request !');
    console.log(req.body);
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

app.listen(3000)