import React, { useState, useEffect } from "react";
import axios from "axios";
import Favorites from "../components/Favorites";

axios.defaults.baseURL = "http://localhost:5000";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return token ? { headers: { Authorization: `Bearer ${token}` } } : {};
};

export default function Dashboard() {
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
    <div className="min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-[length:200%_200%] animate-gradient-x p-6 text-gray-100">
      <h1 className="text-4xl font-extrabold text-white mb-8 text-center drop-shadow-lg">
        🌤 Weather Dashboard
      </h1>

      {/* Search */}
      <div className="mb-6 flex gap-4 justify-center">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city..."
          className="flex-1 max-w-md p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 shadow-md"
        />
        <button
          onClick={() => fetchWeather(city)}
          className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-semibold px-6 py-2 rounded-lg hover:from-yellow-500 hover:to-orange-600 transition-transform transform hover:scale-105 shadow-lg"
        >
          Search
        </button>
      </div>

      {/* Weather card */}
      {weatherData && (
        <div className="bg-white/20 backdrop-blur-md shadow-2xl rounded-xl p-6 mb-6 max-w-md mx-auto transition-transform transform hover:scale-105">
          <h2 className="text-xl font-semibold text-white">{weatherData.city}</h2>
          <p className="text-yellow-200">{weatherData.temp}°C</p>
          <p className="text-gray-200">{weatherData.condition}</p>
          <button
            onClick={() => saveFavorite(weatherData.city)}
            className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-transform transform hover:scale-105"
          >
            Save to Favorites
          </button>

          {weatherData.alerts && weatherData.alerts.length > 0 && (
            <div className="mt-4 bg-red-200/30 border-l-4 border-red-500 p-4 rounded-lg text-white">
              <h3 className="font-semibold">⚠️ Weather Alerts</h3>
              <ul className="list-disc list-inside">
                {weatherData.alerts.map((alert, idx) => (
                  <li key={idx}>{alert}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Favorites */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold text-white mb-4">Favorites</h3>
        <Favorites
          favorites={favorites}
          fetchWeather={fetchWeather}
          deleteFavorite={deleteFavorite}
        />
      </div>

      {/* AI Agent */}
      <div className="mt-8 bg-white/20 backdrop-blur-md shadow-xl rounded-lg p-6 max-w-md mx-auto border-l-4 border-indigo-500">
        <h3 className="text-lg font-semibold mb-4 text-white">Ask AI about Weather</h3>
        <div className="flex gap-4 mb-4">
          <input
            type="text"
            value={aiQuestion}
            onChange={(e) => setAiQuestion(e.target.value)}
            placeholder="Type your question..."
            className="flex-1 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-md"
          />
          <button
            onClick={askAI}
            className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-2 rounded-lg hover:from-indigo-600 hover:to-purple-700 transition-transform transform hover:scale-105 shadow-lg"
          >
            Ask AI
          </button>
        </div>
        {aiAnswer && (
          <p className="mt-2 bg-indigo-100/70 p-3 rounded-lg text-indigo-800 shadow-inner">
            {aiAnswer}
          </p>
        )}
      </div>
    </div>
  );
}