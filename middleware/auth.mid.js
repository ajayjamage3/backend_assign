const jwt = require("jsonwebtoken")

const authenticate = (req,res,next)=>{
    const token = req.headers.authorization
    if(token){
        const decode = jwt.verify(token,"masai")
        if(decode){
            const userId = decode.userId
            req.body.userId = userId
            next()
        }
        else{
            res.send("Please login first")
        }
    }
    else{
        res.send("Please login first")
    }
}
module.exports={authenticate}