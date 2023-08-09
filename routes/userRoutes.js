const express=require("express")
const {UserModel}=require("../model/userModel")

const userRouter=express.Router() //it is used to navigate the req from index file to desired routes

//CREATE
userRouter.post("/add",async(req,res)=>{
    const data=req.body
    try{
        const user=new UserModel(data)
        await user.save()
        res.send({"msg":"New user has been Registered"})
    } catch(err){
        res.send({"err":err})
    }    
})

//READ
userRouter.get("/",async(req,res)=>{
    const q=req.query
    try{
        const users=await UserModel.find(q)
        res.send(users)
    } catch(err){
        res.send({"err":err})
    } 
})

//UPDATE
userRouter.patch("/update/:userID",async(req,res)=>{
    const {userID}=req.params
    try{
        await UserModel.findByIdAndUpdate({_id:userID},req.body)
        res.send({"msg":`Updated the document with _id:${userID}`})
    } catch(err){
        res.send({"err":err})
    }
})

//DELETE
userRouter.delete("/delete/:userID",async(req,res)=>{
    const {userID}=req.params
    try{
        await UserModel.findByIdAndDelete({_id:userID})
        res.send({"msg":`Deleted the document with _id:${userID}`})
    } catch(err){
        res.send({"err":err})
    }
})

module.exports={
    userRouter
}