const { GoogleGenAI } = require("@google/genai");
require('dotenv').config();
const ai = new GoogleGenAI({ apiKey: process.env.API });

async function main(msg) {
    // Generate response using Google Gen AI SDK
    const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: msg
    });
    return response.text;
}
module.exports = main;

