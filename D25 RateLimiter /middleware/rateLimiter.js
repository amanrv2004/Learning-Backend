
const redisClient = require("../config/redis");

const rateLimiter = async (req,res,next)=>{
    try{

        const ip = req.ip;

        const number_of_request = await redisClient.incr(ip); // increment the key value by 1 

        //kya ye IP exist karta hai 
        // set method redisClient.set(ip,`1:${Date.now()/1000});
        //await redisClient.expire(3600);



        if(number_of_request == 1){
            redisClient.expire(ip,3600);
        }

        if(number_of_request>10){
            throw new Error("User Limit Exceeded.")
        }
        console.log(number_of_request);
       
        next();
    }
    catch(err){
        res.send("Error : "+ err.message);
    }
}

module.exports = rateLimiter;