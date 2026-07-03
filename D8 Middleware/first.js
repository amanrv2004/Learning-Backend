
const express = require("express");
const app = express();


app.use("/user",(req,res)=>{
    console.log("first");
    res.send("Hello Gi");
},(req,res)=>{
    console.log("second");
    res.send("Hello I am Second");
})



app.listen(3000,()=>{
    console.log(`http://localhost:3000`);
})