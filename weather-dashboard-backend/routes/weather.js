import express from "express";
import axios from "axios";

const router = express.Router();

router.get("/:city", async (req, res) => {
  try {
    const city = req.params.city;
    const apiKey = process.env.WEATHER_API_KEY;
    console.log("City:", city, "API Key:", apiKey); // debug log

    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );

    const data = {
      city: response.data.name,
      temp: response.data.main.temp,
      condition: response.data.weather[0].description,
    };

    res.json(data);
  } catch (err) {
    console.error("Weather API error:", err.response?.data || err.message);
    res.status(500).json({ error: "Failed to fetch weather" });
  }
});

export default router;
