import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const client = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1", // ✅ OpenRouter endpoint
});

export const askWeatherAI = async (question, weatherData) => {
  try {
    const completion = await client.chat.completions.create({
      model: "openai/gpt-3.5-turbo", // ✅ free model via OpenRouter
      messages: [
        { role: "system", content: "You are a helpful weather assistant." },
        { role: "user", content: `Weather: ${JSON.stringify(weatherData)}. Q: ${question}` },
      ],
    });

    const answer = completion.choices[0].message.content;
    console.log("OpenRouter raw answer:", answer);
    return answer;
  } catch (err) {
    console.error("OpenRouter Agent error:", err.message || err);
    return "Sorry, AI agent failed to respond.";
  }
};
