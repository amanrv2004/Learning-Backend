// const data = await fetch('http://sdfghj.com');

const response1 = await fetch('https://api.example' , {
    method : 'POST',
    headers : {
        'Content-Type':'application/json'
    },
    body: JSON.stringify({name:'John',age:30})
});


const response2 = await fetch('https://api.example');

const response1 = await fetch('https://api.example' , {
    method : 'PATCH',
    headers : {
        'Content-Type':'application/json'
    },
    body: JSON.stringify({age:31})
});