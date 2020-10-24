const exprss = require('express')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {} = require('../keys')

const router = exprss.Router()
const User = mongoose.model("User")

router.post("/signup", (req,res) => {
    const {name, email, password } = req.body
    if(!email || !password || !name) {
       return res.status(422).json({error:"please enter the details"})
    }
    User.findOne({email:email})
        .then((saveduser) =>{
            if(saveduser){
                return res.status(422).json({error:"user already exist with the email"})
            }
            bcrypt.hash(password,12)
            .then(hashedpassword => {
                const user = new User({
                    email,
                    password:hashedpassword,
                    name                
                })
                user.save()
                .then(user => {
                    res.json({message:"Save successfuly"})
                }).catch(e => {
                    console.log(err)
                
                })
            })
            
        }).catch(e => {
            console.log(err)
            })
})

router.post("/signin",(req, res ) => {
    const {email, password} = req.body
    if(!email || !password) {
        return res.status(422).json({error:"please enter the details"})
     }
     User.findOne({email:email})
     .then(savedUser => {  
         if(!savedUser) {
            return res.status(422).json({error:"invalid email or password"})
         }
         bcrypt.compare(password, savedUser.password)
         .then(doMatch => {
             if(doMatch) {
                //res.json({message:"Successfuly logedin"})

             } else {
                res.status(422).json({error:"invalid email or password"})
             }
         })
     }) 
})
module.exports = router