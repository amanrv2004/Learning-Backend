const jwt = require('jsonwebtoken');
const User = require('../Models/Users')
const userAuth = async(req,res,next)=>{
    try{
         const {token} = req.cookies;
        if(!token){
            throw new Error("Token Doesn't Exist")
        }
        const payload = jwt.verify(token,"Aman1321")

        const {_id} = payload;
        if(!_id){
            throw new Error("Id is missing");
        }
        const ans = await User.findById(_id);

        if(!ans){
            throw new Error("User doesn't Exist.")
        }
        req.ans = ans;
        next();
    }
    catch(err){
       res.send("Error "+ err.message);
    }
}


module.exports = { userAuth };