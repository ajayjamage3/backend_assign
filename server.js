const express = require("express")
const app = express()
app.use(express.json())
const {connection} = require("./config/db")
const bcrypt = require("bcrypt")
const cors = require("cors")
require('dotenv').config()
app.use(cors())
const {authenticate} = require("./middleware/auth.mid")
const {userRouter} = require("./routes/user.route")
const {noteRouter} = require("./routes/todo.route")
app.get("/",(req,res)=>{
    res.send("Welcome")
})
app.use("/users",userRouter)
app.use(authenticate)
app.use("/notes",noteRouter)

app.listen(process.env.port,async()=>{
    try {
        await connection
        console.log("connected to DB")
    } catch (error) {
        console.log(error)
    }
    console.log("port is running at 4500")
})
