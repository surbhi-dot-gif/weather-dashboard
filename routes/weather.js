import express from "express";
import axios from "axios";

const router = express.Router();

// Utility function for alerts
const checkAlerts = (weatherData) => {
  const alerts = [];
  if (weatherData.main.temp < 10) {
    alerts.push("Temperature below 10°C – Cold alert!");
  }
  if (weatherData.wind.speed > 20) {
    alerts.push("High wind speed – Secure outdoor items!");
  }
  if (weatherData.weather[0].main.toLowerCase().includes("rain")) {
    alerts.push("Rain alert – Carry umbrella!");
  }
  return alerts;
};

router.get("/:city", async (req, res) => {
  try {
    const city = req.params.city;
    const apiKey = process.env.WEATHER_API_KEY;
    console.log("City:", city, "API Key:", apiKey); // debug log

    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );

    const weatherData = response.data;

    const data = {
      city: weatherData.name,
      temp: weatherData.main.temp,
      condition: weatherData.weather[0].description,
      alerts: checkAlerts(weatherData), // ✅ add alerts here
    };

    res.json(data);
  } catch (err) {
    console.error("Weather API error:", err.response?.data || err.message);
    res.status(500).json({ error: "Failed to fetch weather" });
  }
});

export default router;
