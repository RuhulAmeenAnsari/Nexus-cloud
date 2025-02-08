const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const userSchema = require("./models/user")

app.use(cors())
app.use(bodyParser.json())
app.post('/signup', async (req, res) => {
    const { email, name, password } = req.body
    const user = await userSchema.create({
        email,
        name,
        password
    })
    const userinfo = await user.save()
    console.log(userinfo); 
    res.json(userinfo)
   
})
app.listen(5000)