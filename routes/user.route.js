const express = require("express")
const app = express()
app.use(express.json())
const {UserModel} = require("../models/user.model")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const userRouter = express.Router()
app.get("/",(req,res)=>{
    res.send("Welcome")
})

userRouter.post("/register",async(req,res)=>{
    const {email,pass,name,age} = req.body
    try {
        bcrypt.hash(pass,5, async(err, secure_pass) =>{
            if(err){
                console.log(err)
            }
            else{
                const user = new UserModel({email,pass:secure_pass,name,age})
                await user.save()
                res.send("registered")
            }
        });
       
    } catch (error) {
        console.log(error)
    }
})

userRouter.post("/login",async(req,res)=>{
    const {email,pass} = req.body
    try {
        const user = await UserModel.find({email})
        if(user.length>0){
            const hashed_pass = user[0].pass
            bcrypt.compare(pass, hashed_pass, (err, result)=> {
                if(result){
                    const token = jwt.sign({userId:user[0]._id},'masai')
                    res.send({"msg":"Login Successfull","token":token})    
                }
                else{
                    res.send("Wrong Password")
                }
            });
        }
        else{
            res.send("Wrong username")
        }
        console.log(user)
    } catch (error) {
        console.log(error)
    }
    
})

module.exports = {
    userRouter
}