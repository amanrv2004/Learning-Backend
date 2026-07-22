const { Auth } = require("./middleware/auth")
const express = require("express");
const app = express();
const main = require("./database")

const User = require("./Models/Users")

app.use(express.json());

app.get("/info",async(req,res)=>{
   const ans =  await User.find({"name":"Aman"});
   res.send(ans);
})

app.post("/info",async(req,res)=>{
    
    // const ans = new User(req.body);
    // await ans.save();
   try{
    await User.create(req.body)
    res.status(200).send("Successfully Updated new User")
   }
   catch(err){
    res.status(500).send(err);
   }

   
});

app.delete("/info",async (req,res)=>{
     
    try{
        await User.deleteOne({"name":"Vishal"});
        res.status(200).send("User Deleted Successfully");
    }
    catch(err){
    res.status(500).send(err);
   }
})

app.put("/info",async (req,res)=>{
     
    try{
        await User.updateOne({"name":"Arpit"},{"name":"Aman","city":"Lucknow"});
        res.status(200).send("User Updated Successfully");
    }
    catch(err){
    res.status(500).send(err);
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


