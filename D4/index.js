
const http = require('http')

const server = http.createServer((req,res)=>{
    res.end("Hello Man")
});

const port = 4000;


server.listen(port ,()=>{
    console.log(`server is running on http://localhost:${port}`)
})