const { GoogleGenAI } = require("@google/genai");
require('dotenv').config();
const ai = new GoogleGenAI({ apiKey: process.env.API });
const readlineSync = require('readline-sync');

const conversationHistory = [];


async function main() {
    const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: conversationHistory
    });
    return response.text;
}


async function getWeather(location) {
    const weatherInfo = [];
    for (const { city, date } of location) {
        if (date.toLowerCase() == 'today') {
            const response = await fetch(
                `https://api.weatherapi.com/v1/current.json?key=${process.env.WEATHER_API_KEY}&q=${city}`)
            const data = await response.json();
            weatherInfo.push(data);
        }
        else {
            const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${process.env.WEATHER_API_KEY}&q=${city}&dt=${date}`)
            const data = await response.json();
            weatherInfo.push(data);
        }
    }
    return weatherInfo;
}


async function chatting() {
    const question = readlineSync.question("How cam I help you ? ");
    const prompt = ` You are an Ai agetn , who will respond to me in JSON formate only.
Analyse the user query and try to fetch city and date details from it.
Date formate should be in (yyyy-month-date), if user ask for future weather.
If user ask for today weather, mark date as 'today'.
To fetch weather details , i already habve some function which can fetch the weather details for me , 

if you need weather information , use the below formate
JSON formate should look like below:
{
"weather_detail_needed":true,
"location":[{"city":"mumbai","date":"today"},{"city":"delhi","date":"2025-04-30"}]
}

Once you have the weather report details, respond me in JSON formate only.
JSON formate should look like below:
{
"weather_detail_needed":false,
"weather_reports":"Bhai Delhi ka maisam toh badhiya hai , 18 degree temperature hai , ghar par pakode bana lo maza aayega"
}

User asked this question :${question}
Strictly follow JSON formate, respond only in JSON format.

`
    conversationHistory.push({
        role: "user",
        parts: [{ text: prompt }]
    })

    while (true) {
        const rawResponse = await main();
        const cleanedResponse = rawResponse.replace(/```json|```/g, "").trim();
        const response = JSON.parse(cleanedResponse);
        console.log(response);

        if (response.weather_detail_needed == false) {
            console.log(response.weather_reports);
            break;
        }

        conversationHistory.push({ role: "model", parts: [{ text: rawResponse }] });

        const weatherInformation = await getWeather(response.location);
        conversationHistory.push({
            role: "user",
            parts: [{ text: `Here is the weather details: ${JSON.stringify(weatherInformation)}` }]
        });
    }
}
chatting();
//LLM ko Boluga ki Location ka Mausam bata vo but ye mujhe location ka array de dega



//[{city:"delhi" , date:"today"},{city:"mumbai" , date:"today"}]

//Location getWeather --> Actual weather laake de dega

// Actual weather aaya hai , LLM ko dunga , iska weather report card ready kar de

// User output mein show kara dunga



