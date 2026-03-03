import React from "react";

const Favorites = ({ favorites, fetchWeather, deleteFavorite }) => (
  <div className="mt-6">
    <h3 className="text-xl font-bold">Favorites</h3>
    <ul>
      {favorites.map(fav => (
        <li key={fav._id} className="flex justify-between items-center">
          <button
            onClick={() => fetchWeather(fav.city)}
            className="text-blue-600 underline"
          >
            {fav.city}
          </button>
          <button
            onClick={() => deleteFavorite(fav.city)}
            className="text-red-500 ml-4"
          >
            Remove
          </button>
        </li>
      ))}
    </ul>
  </div>
);

export default Favorites;
