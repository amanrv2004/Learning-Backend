
const http = require('http')

const server = http.createServer((req,res)=>{

    if(req.url ==="/"){
        res.end("Hello Aman");
    }
    else if (req.url ==="/contact"){
        res.end("This is our Contact Page.");
    }
    else if (req.url ==="/about"){
        res.end("This is our About Page.");
    }
    else{
        res.end("Error: Page not found. Goto right url.");
    }
});


const port = 4000;


server.listen(port ,()=>{
    console.log(`server is running on http://localhost:${port}`)
})