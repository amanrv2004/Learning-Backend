const express = require('express');
const app = express()
const main = require("./aichat")

app.use(express.json());

const chattingHistory = {}; // store the history , key:id , value: array

app.post("/chatting", async (req, res) => {
    const { id, msg } = req.body;
    if (!chattingHistory[id]) {
        chattingHistory[id] = [];
    }

    const history = chattingHistory[id]; // array of history 

    const promptmessage = [...history, {
        role: "user",
        parts: [{ text: msg }]
    }];
    console.log(msg);
    const ans = await main(promptmessage);

    console.log(ans)
    //update the history 
    history.push({
        role: "user",
        parts: [{ text: msg }],
    });

    history.push({
        role: "model",
        parts: [{ text: ans }],
    });
    res.status(200).send(ans);
    console.log(ans)
})

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})