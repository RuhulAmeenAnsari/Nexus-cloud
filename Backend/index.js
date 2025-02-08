const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const userSchema = require("./models/user")

app.use(cors())
app.use(bodyParser.json())
app.post('/signup', (req, res) => {
    console.log(req.body);
    res.send('server started')
})
app.listen(5000)