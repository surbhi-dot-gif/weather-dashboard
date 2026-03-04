import React, { useState, useEffect } from "react";
import axios from "axios";
import Favorites from "../components/Favorites";

axios.defaults.baseURL = "http://localhost:5000";

// Helper to attach token
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return token ? { headers: { Authorization: `Bearer ${token}` } } : {};
};

const Dashboard = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [aiQuestion, setAiQuestion] = useState("");
  const [aiAnswer, setAiAnswer] = useState("");

  // Fetch weather
  const fetchWeather = async (cityName) => {
    try {
      const res = await axios.get(`/api/weather/${cityName}`, getAuthHeaders());
      setWeatherData(res.data);
    } catch (err) {
      console.error("Weather error:", err);
    }
  };

  // Favorites
  const fetchFavorites = async () => {
    try {
      const res = await axios.get("/api/favorites", getAuthHeaders());
      setFavorites(res.data);
    } catch (err) {
      console.error("Favorites error:", err);
    }
  };

  const saveFavorite = async (cityName) => {
    try {
      await axios.post("/api/favorites", { city: cityName }, getAuthHeaders());
      fetchFavorites();
    } catch (err) {
      console.error("Save favorite error:", err);
    }
  };

  const deleteFavorite = async (cityName) => {
    try {
      await axios.delete(`/api/favorites/${cityName}`, getAuthHeaders());
      fetchFavorites();
    } catch (err) {
      console.error("Delete favorite error:", err);
    }
  };

  // AI Agent
  const askAI = async () => {
    try {
      const res = await axios.post(
        "/api/ai-agent",
        { question: aiQuestion, weatherData },
        getAuthHeaders()
      );
      console.log("Frontend AI response:", res.data);
      setAiAnswer(res.data.answer);
    } catch (err) {
      console.error("AI agent error:", err);
      setAiAnswer("Sorry, AI agent failed to respond.");
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Weather Dashboard</h1>

      {/* Search */}
      <div style={{ marginBottom: "1rem" }}>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city..."
        />
        <button onClick={() => fetchWeather(city)}>Search</button>
      </div>

      {/* Weather card */}
      {weatherData && (
        <div style={{ marginBottom: "1rem" }}>
          <h2>{weatherData.city}</h2>
          <p>{weatherData.temp}°C</p>
          <p>{weatherData.condition}</p>
          <button onClick={() => saveFavorite(weatherData.city)}>
            Save to Favorites
          </button>

          {/* Weather Alerts */}
          {weatherData.alerts && weatherData.alerts.length > 0 && (
            <div style={{ marginTop: "1rem", color: "red" }}>
              <h3>Weather Alerts</h3>
              <ul>
                {weatherData.alerts.map((alert, idx) => (
                  <li key={idx}>{alert}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Favorites */}
      <Favorites
        favorites={favorites}
        fetchWeather={fetchWeather}
        deleteFavorite={deleteFavorite}
      />

      {/* AI Agent */}
      <div style={{ marginTop: "2rem" }}>
        <h3>Ask AI about Weather</h3>
        <input
          type="text"
          value={aiQuestion}
          onChange={(e) => setAiQuestion(e.target.value)}
          placeholder="Type your question..."
        />
        <button onClick={askAI}>Ask AI</button>
        {aiAnswer && <p>{aiAnswer}</p>}
      </div>
    </div>
  );
};

export default Dashboard;
