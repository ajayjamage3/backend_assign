const express = require("express")
const noteRouter = express.Router()
const {NoteModel} = require("../models/todo.model")
noteRouter.get("/",async(req,res)=>{
    res.send(await NoteModel.find())
})

noteRouter.post("/create",async(req,res)=>{
    const payload = req.body
    try {
        const newNote = new NoteModel(payload)
        await newNote.save()
        res.send("Note created")
    } catch (error) {
        res.send("something went wrong")
    }
})

noteRouter.patch("/update/:id",async(req,res)=>{
    const note = await NoteModel.findOne({"_id":req.params.id})
    const userID_in_note = note.userId
    const userId_making_req = req.body.userId
    try {
        if(userID_in_note !== userId_making_req){
            res.send("You are not authorized")
        }
        else{
            await NoteModel.findByIdAndUpdate({_id:req.params.id},req.body)
            res.send("Updated")
        }
    } catch (error) {
        res.send("Somethong went wrong")
    }
})

noteRouter.delete("/delete/:id",async(req,res)=>{
    const note = await NoteModel.findOne({"_id":req.params.id})
    const userID_in_note = note.userId
    const userId_making_req = req.body.userId
    try {
        if(userID_in_note !== userId_making_req){
            res.send("You are not authorized")
        }
        else{
            await NoteModel.findByIdAndDelete({_id:req.params.id})
            res.send("Deleted")
        }
    } catch (error) {
        res.send("Somethong went wrong")
    }
   
})

module.exports={noteRouter}