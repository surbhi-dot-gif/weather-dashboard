import { useState } from "react";
import axios from "axios";

function Dashboard() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);

  const fetchWeather = async () => {
    try {
      const res = await axios.get(`/api/weather/${city}`);
console.log("Weather response:", res.data); // 👈 debug log
      setWeatherData(res.data);
    } catch (err) {
      console.error("Frontend error:", err.response?.data || err.message);
      alert("Error fetching weather");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Weather Dashboard</h1>
      <div className="flex mb-4">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city"
          className="border p-2 rounded w-full"
        />
        <button
          onClick={fetchWeather}
          className="ml-2 bg-blue-600 text-white px-4 py-2 rounded"
        >
          Search
        </button>
      </div>

      {weatherData && (
        <div className="bg-gray-100 p-4 rounded shadow">
          <h2 className="text-xl font-semibold">{weatherData.city}</h2>
          <p>Temperature: {weatherData.temp}°C</p>
          <p>Condition: {weatherData.condition}</p>
        </div>
      )}
    </div>
  );
}

export default Dashboard;