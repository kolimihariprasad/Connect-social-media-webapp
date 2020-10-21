const exprss = require('express')
const router = exprss.Router()

router.get("/", (req, res) => {
    res.send("auth")
})

router.post("/signup", (req,res) => {
    const {name, email, password } = req.body
    if(!email || !password || !name) {
       return res.status(422).json({error:"please enter the details"})
    }
    res.json({message:"User added successfuly"})
})

module.exports = router