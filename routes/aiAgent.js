import express from "express";
import { askWeatherAI } from "../services/aiAgent.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { question, weatherData } = req.body;
  try {
    const answer = await askWeatherAI(question, weatherData);
    res.json({ answer });
  } catch (err) {
  console.error("FULL ERROR:", err);
  return "Sorry, AI agent failed to respond.";
}
});

export default router;

