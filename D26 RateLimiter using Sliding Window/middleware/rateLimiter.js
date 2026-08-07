
const { RedisSentinel, RedisClient } = require("redis");
const redisClient = require("../config/redis");


const windowSize = 3600;  // total time
const Maxrequest = 60; 


const rateLimiter = async (req,res,next)=>{
    try{

        const key = `IP:${req.ip}`;
        const current_time = Date.now()/1000;
        const window_Time = current_time - windowSize;
        //

        await redisClient.zRemRangeByScore(key,0,window_Time);

        const number_of_request = await redisClient.zCard(key);

        if(number_of_request>=Maxrequest){
            throw new Error("No. of Request Exceeded.");
        }
        
        await redisClient.zAdd(key,[{score:current_time,value:`${current_time}:${Math.random()}`}]) //Request is added

        //key TTL increase karna 
        await redisClient.expire(key,windowSize);

        next();
    }
    catch(err){
        res.send("Error : "+ err.message);
    }
}

module.exports = rateLimiter;