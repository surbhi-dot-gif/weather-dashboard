// services/alerts.js
export const checkAlerts = (weatherData) => {
  const alerts = [];
  if (weatherData.main.temp < 10) {
    alerts.push("Temperature below 10°C – Cold alert!");
  }
  if (weatherData.wind.speed > 20) {
    alerts.push("High wind speed – Secure outdoor items!");
  }
  if (weatherData.weather[0].main === "Rain") {
    alerts.push("Rain alert – Carry umbrella!");
  }
  return alerts;
};