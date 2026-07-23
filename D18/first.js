const { Auth } = require("./middleware/auth")
const express = require("express");
const app = express();
const main = require("./database")

const User = require("./Models/Users")

app.use(express.json());

app.post("/register" , async(req,res)=>{
    try {

        const mandatory = ["firstName","emailId","age"]
        const IsAllowed = Object.keys(req.body).every((keys)=>mandatory.includes(keys));
        if(!IsAllowed)
            throw new Errpr("Fields Missing")

        const data = req.body;
        await User.create(data);
        res.status(200).send("User registered Successfully !")
    } catch (err) {
        res.status(500).send("Error "+ err.message);
    }
})

app.get("/info" , async(req,res)=>{
    try {
        const ans = await User.find();
        res.status(200).send(ans);
    } catch (err) {
        res.status(500).send("Error "+ err.message);
    }
})

app.get("/user/:id" , async(req,res)=>{
    try {
        const ans = await User.findById(req.params.id);
        res.status(200).send(ans);
    } catch (err) {
        res.status(500).send("Error "+ err.message);
    }
})

app.delete("/user/:id" , async(req,res)=>{
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).send("Deleted Successfully ");
    } catch (err) {
        res.status(500).send("Error "+ err.message);
    }
})

app.patch("/user" , async(req,res)=>{
    try {
        const {_id, ...update} = req.body;
        await User.findByIdAndUpdate(_id,update);
        res.status(200).send(" Updated Successfully Successfully ");
    } catch (err) {
        res.status(500).send("Error "+ err.message);
    }
})


main()
    .then(async () => {
        console.log("Connected to DB");
        app.listen(3000, () => {
            console.log(`http://localhost:3000`);
        })
          const result = await User.find({name:"Aman"});
          console.log(result);
    })
    .catch((err) => console.log(err));


