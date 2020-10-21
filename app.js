const exprss = require('express')
const mongoose = require('mongoose')
const {MONGOURI} = require('./keys')

const app = exprss()
const PORT = 5000

require('./models/user')
app.use(exprss.json())
app.use(require('./routes/auth'))

mongoose.connect(MONGOURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
mongoose.connection.on('connected', () => {
    console.log("connected to db")
})
mongoose.connection.on('error', (e) => {
    console.log("Error: ", e)
})
app.listen(PORT, ()=> {
    console.log("server is runnning on", PORT)
})