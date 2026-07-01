
const express = require("express");

const app = express();

// app.use("/user",(req,res)=>{
//     res.send("Hello Coder Army")
// })

//get  


// parsing 

app.use(express.json());

app.get("/user",(req,res)=>{
    // console.log(req);
    res.send({name:"Aman"})

})

app.post("/user",(req,res)=>{
    // console.log("Data send Successfully");
    console.log(typeof req.body.age);
    res.send("Data Saved Successfully");
})




app.listen(4000,()=>{
    console.log(`http://localhost:4000`);
})