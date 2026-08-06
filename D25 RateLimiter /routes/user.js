const User = require("../Models/Users")
const express = require('express');
const userRouter = express.Router();
const {userAuth}  = require("../middleware/userAuth")

userRouter.get("/" , userAuth, async(req,res)=>{
    try {
        res.status(200).send(req.ans);
    } catch (err) {
        res.status(500).send("Error "+ err.message);
    }
})

userRouter.delete("/:id" , userAuth ,async(req,res)=>{
    try {
        //authenticate user :Token validate

        await User.findByIdAndDelete(req.params.id);
        res.status(200).send("Deleted Successfully ");
    } catch (err) {
        res.status(500).send("Error "+ err.message);
    }
})

userRouter.patch("/" , async(req,res)=>{
    try {
        const {_id, ...update} = req.body;
        await User.findByIdAndUpdate(_id,update);
        res.status(200).send(" Updated Successfully Successfully ");
    } catch (err) {
        res.status(500).send("Error "+ err.message);
    }
})

module.exports = userRouter;
