
const express = require("express");
const app = express();


// app.use("/user",[(req,res,next)=>{
//     console.log("first");
//     //res.send("Hello Gi");
//     next();
// },(req,res,next)=>{
//     console.log("second");
//     // res.send("Hello I am Second");
//     next();
// },(req,res,next)=>{
//     console.log("third");
//     res.send("Hello I am Third");
// }])


app.use("/user",(req,res,next)=>{
    console.log(`${Date.now()} ${req.method} ${req.url}`)
    next();
})

app.get("/user",(req,res)=>{
    
    res.send("Info about User");
});

app.post("/user",(req,res)=>{
   
    res.send("Information Saved");
});

app.delete("/user",(req,res)=>{
   
    res.send("Info Deleted Successfully");
});





app.listen(3000,()=>{
    console.log(`http://localhost:3000`);
})