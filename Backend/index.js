const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const userSchema = require("./models/user")
const cookieparser = require('cookie-parser')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')



app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieparser())
app.use(cors())
app.use(bodyParser.json())


app.post('/signup',  (req, res) => {
    const { email, name, password } = req.body

    bcrypt.genSalt(10,(err,salt)=>{
        bcrypt.hash(password,salt,async(err,hash)=>{
            let user = await userSchema.create({
                email,
                name,
                password:hash
            })
            const userinfo = await user.save()
            let token = jwt.sign({email},"secretkey")
            res.cookie("token",token)
            res.json(userinfo)
        })
    })   
})
app.post('/login', async (req, res) => {
    const { email, password } = req.body
    const user = await userSchema.findOne({email})   
    if(!user){
        res.json({message:"User not found"})
    }
    bcrypt.compare(password,user.password,(err,result)=>{
        if(result){
            let token = jwt.sign({email},"secretkey")
            res.cookie("token",token)
            res.json({message:"Login Success"})
        }else{
            res.json({message:"Password not matched"})
        }
    })
})


app.listen(5000)