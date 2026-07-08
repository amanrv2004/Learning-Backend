const {Auth}= require("./middleware/auth")
const express = require("express");
const app = express();


app.use(express.json());

// Database : array 

const FoodMenu = [
    {id:1,food:"Chowmein",category:"veg",price:500},
    {id:2,food:"Butter Naam",category:"veg",price:100},
    {id:3,food:"Chicken",category:"non veg",price:1000},
    {id:4,food:"Mutton",category:"non veg",price:1500},
    {id:5,food:"Momo",category:"veg",price:300},
    {id:6,food:"Chai",category:"veg",price:50},
    {id:7,food:"Roti",category:"veg",price:300},
    {id:8,food:"Lolopop",category:"non veg",price:20},
    {id:9,food:"kabab",category:"non veg",price:700},
    {id:10,food:"Paneer",category:"veg",price:400},
    {id:11,food:"Egg Curry",category:"non veg",price:300},
    {id:12,food:"Salad",category:"veg",price:100},
    {id:13,food:"Shourma",category:"non veg",price:300},
    {id:14,food:"Butter Chicken",category:"non veg",price:900},
    {id:15,food:"Mushroom",category:"veg",price:700},
];
const AddToCart =[];



app.get("/food",(req,res)=>{
    res.send(FoodMenu);
})

app.use("/admin",Auth);

app.post("/admin",(req,res)=>{
        FoodMenu.push(req.body);
        res.status(200).send("Item Added Successfully");
});

app.delete("/admin/:id",(req,res)=>{
    
        const id = parseInt(req.params.id);
        const index = FoodMenu.findIndex(item = item.id === id);
        if(index === -1){
            res.status(202).send("Items Doesnot exist.")
        }
        else{
            FoodMenu.splice(index,1);
            res.status(200).send("Item Deleted Successfully");
        }
});

app.patch("/admin",(req,res)=>{
       const id = req.body.id;
       const fooddata = FoodMenu.find(item => item.id === id);
       if(fooddata){
            if(req.body.food){
                fooddata.food = req.body.food;
            }
            if(req.body.price){
                fooddata.price = req.body.price;
            }
       }
       else{
        res.send("Item updated Successfully.");
       }
});


app.post("/user/:id",(req,res)=>{
    const id = parseInt(req.params.id);
    const foodItem = FoodMenu.find(item => item.id === id);
    if(foodItem){
        AddToCart.push(foodItem);
        res.status(200).send("Item Added Successfully.")
    }
    else{
        res.send("Item Out of Stock");
    }
})

app.delete("/user/:id",(req,res)=>{
    const id = parseInt(req.params.id);
    const index = AddToCart.findIndex(item => item.id === id);

    if(index!=-1){
        AddToCart.splice(index,1);
        res.send("Item Removed")
    }
    else{
        res.send("Item is not present in Cart")
    }

})

app.get("/user",(req,res)=>{
    if(AddToCart.length == 0){
        res.send("Cart is Empty");
    }
    else{
        res.send(AddToCart);
    }
})

app.get("/dummmy",(req,res)=>{
    try{
    JSON.parse('{"name":"Aman"}');
    res.send("hello");
    }
    catch(err){
        res.send("Some Error Occured");
    }
})

app.listen(3000,()=>{
    console.log(`http://localhost:3000`);
})