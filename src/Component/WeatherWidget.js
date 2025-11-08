import { useEffect, useState } from "react";
import temperature from "../images/temperature.png";
import humidity from "../images/humidity.png";
import arrows from "../images/arrows.png";
import atmospheric from "../images/atmospheric.png";

const WeatherWidget = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");
  const [localTime, setLocalTime] = useState("");

  const apiKey = "cb1bc2db8a9532a67589b24d0133ba7b";

  // 🌤️ Fetch weather + compute local time
  const fetchWeather = async (city) => {
    if (!city) return;
    setLoading(true);
    setError("");
    setLocalTime("");

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
      );
      const ApiData = await response.json();

      if (response.ok) {
        setData(ApiData);

        // 🕓 Calculate local time using timezone offset (in seconds)
        const utc = new Date().getTime() + new Date().getTimezoneOffset() * 60000;
        const cityTime = new Date(utc + ApiData.timezone * 1000);
        const dateString = cityTime.toLocaleString("en-IN", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        });
        setLocalTime(dateString);
      } else {
        setError(ApiData.message || "City not found");
        setData(null);
      }
    } catch (error) {
      setError("Failed to fetch data. Please try again.");
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!query.trim()) {
      setError("Please enter a city name.");
      return;
    }
    fetchWeather(query.trim());
    setQuery("");
  };

  return (
    <div className="WeatherWidgetCom text-center mx-auto">
      {/* 🔍 Search Field */}
      <form className="searchForm my-5" onSubmit={handleSubmit}>
        <input
          id="searchField"
          type="text"
          placeholder="Enter City Name"
          className="px-4 py-2 rounded-l-md"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <input
          id="submitBtn"
          type="submit"
          value="Search"
          className="px-4 py-2 bg-blue-600 text-white rounded-r-md cursor-pointer hover:bg-blue-700"
        />
      </form>

      {/* Loader / Error */}
      {loading && <p className="text-gray-300">Loading...</p>}
      {error && <p className="text-red-400">{error}</p>}

      <div id="weatherData">
        {data && (
          <>
            <h2 className="text-white text-2xl font-bold">{data.name}</h2>
            {localTime && <p className="text-gray-300 mb-4">{localTime}</p>}

            <div className="flex flex-wrap justify-between  my-6 text-center">
              <div className="text-white w-1/2 sm:w-1/4">
                <img src={temperature} height={32} className="mx-auto my-3" />
                <p><span className='block'>Temperature</span> {data.main?.temp.toFixed(1)} °C</p>
              </div>

              <div className="text-white w-1/2 sm:w-1/4">
                <img src={humidity} height={32} className="mx-auto my-3" />
                <p><span className='block'>Humidity</span> {data.main?.humidity}%</p>
              </div>

              <div className="text-white w-1/2 sm:w-1/4">
                <img src={arrows} height={32} className="mx-auto my-3" />
                <p><span className='block'>Wind Speed</span> {data.wind?.speed} m/s</p>
              </div>

              <div className="text-white w-1/2 sm:w-1/4">
                <img src={atmospheric} height={32} className="mx-auto my-3" />
                <p><span className='block'>Condition</span>  {data.weather?.[0]?.description}</p>
              </div>
            </div>
          </>
        )}

        {!loading && !data && !error && (
          <p className="text-gray-400">Search for a city to see weather.</p>
        )}
      </div>
    </div>
  );
};

export default WeatherWidget;
