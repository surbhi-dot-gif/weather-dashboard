import React, { useState, useEffect } from "react";
import axios from "axios";
import Favorites from "../components/Favorites";

const Dashboard = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [favorites, setFavorites] = useState([]);

  // Fetch weather for a city
  const fetchWeather = async (cityName) => {
    try {
      const res = await axios.get(`/api/weather/${cityName}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      setWeatherData(res.data);
    } catch (err) {
      console.error("Error fetching weather:", err);
    }
  };

  // Save city to favorites
  const saveFavorite = async (cityName) => {
    try {
      await axios.post("/api/favorites", { city: cityName }, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      fetchFavorites();
    } catch (err) {
      console.error("Error saving favorite:", err);
    }
  };

  // Fetch favorites list
  const fetchFavorites = async () => {
    try {
      const res = await axios.get("/api/favorites", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      setFavorites(res.data);
    } catch (err) {
      console.error("Error fetching favorites:", err);
    }
  };

  // Delete a favorite
  const deleteFavorite = async (cityName) => {
    try {
      await axios.delete(`/api/favorites/${cityName}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      fetchFavorites();
    } catch (err) {
      console.error("Error deleting favorite:", err);
    }
  };

  // Load favorites on mount
  useEffect(() => {
    fetchFavorites();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Weather Dashboard</h1>

      {/* Search bar */}
      <div className="flex mb-4">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city..."
          className="border rounded-full px-4 py-2 shadow w-full"
        />
        <button
          onClick={() => fetchWeather(city)}
          className="ml-2 bg-blue-600 text-white px-4 py-2 rounded"
        >
          Search
        </button>
      </div>

      {/* Weather card */}
      {weatherData && (
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm mx-auto text-center">
          <h2 className="text-2xl font-bold text-blue-700">{weatherData.city}</h2>
          <p className="text-4xl font-semibold mt-2">{weatherData.temp}°C</p>
          <p className="text-gray-600 capitalize mt-1">{weatherData.condition}</p>
          <button
            onClick={() => saveFavorite(weatherData.city)}
            className="mt-2 bg-green-600 text-white px-3 py-1 rounded"
          >
            Save to Favorites
          </button>
        </div>
      )}

      {/* Favorites list */}
      <Favorites
        favorites={favorites}
        fetchWeather={fetchWeather}
        deleteFavorite={deleteFavorite}
      />
    </div>
  );
};

export default Dashboard;