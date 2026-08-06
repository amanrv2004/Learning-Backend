const redis = require("redis")
const redisClient = redis.createClient({
    username: 'default',
    password: 'UoXKc9KqSRH4NjkHFmtspt4uV6QdxXqB',
    socket: {
        host: 'flax-sky-form-27772.db.redis.io',
        port: 17021
    }
});

// await client.set('foo', 'bar');
// const result = await client.get('foo');
// console.log(result);

module.exports = redisClient;


