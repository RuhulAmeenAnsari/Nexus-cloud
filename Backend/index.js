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
app.post("/login", async (req, res) => {
    try {
      const { email, password } = req.body;
  
      if (!email || !password) {
        return res.status(400).json({ message: "Please enter all fields" });
      }
  
      const user = await userSchema.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: "User not found!" });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: "Invalid credentials!" });
      }
  
      const token = jwt.sign({ email },"Super Secret Key");
  
      res.cookie("token", token);
  
      res.status(200).json({ message: "Login successful!", token });
    } catch (error) {
      res.status(500).json({ message: "Server error, please try again later." });
    }
  });

app.listen(5000)