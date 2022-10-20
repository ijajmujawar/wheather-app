import { useEffect, useState } from "react";
import "./styles.css";

const apiKey = "fb616e0b552489bffa28fde43b9da46f";

const App = () => {
  const [search, setSearch] = useState("");
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState("");
  const [unit, setUnit] = useState("C");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const url = `http://api.weatherstack.com/current?access_key=${apiKey}&query=${city}`;
      const response = await fetch(url);
      try {
        const data = await response.json();
        console.log("data", data);
        if (data.cod === 200) {
          setWeather(data);
        } else {
          setError(data.message);
          setWeather("");
        }
      } catch (error) {
        console.log("error", error);
      }
    };
    city ? fetchData() : setWeather("");
  }, [city]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setCity(search);
  };

  const getTemp = (tempInKelvin = "0", unit = "C") => {
    const temp =
      unit === "C"
        ? `${Math.round(tempInKelvin - 273)} °C`
        : `${Math.round((tempInKelvin - 273.15) * 1.8 + 32)} °F`;

    console.log("converted temp", temp);
    return temp;
  };

  return (
    <div className="App">
      <h1>React weather app</h1>
      <div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder={"Enter city name"}
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
          <button type="submit">Search</button>
          <button
            onClick={() => {
              setCity("");
              setSearch("");
            }}
          >
            Clear
          </button>
          <select
            onChange={(e) => {
              setUnit(e.target.value);
            }}
            value={unit}
          >
            <option>C</option>
            <option>F</option>
          </select>
        </form>
      </div>
      <div>
        {error && <h1>{error}</h1>}
        {weather && (
          <>
            <h1>{weather?.name}</h1>
            <h1>{getTemp(weather?.main?.temp, unit)}</h1>
            <h2>{weather?.weather[0]?.description}</h2>
          </>
        )}
      </div>
    </div>
  );
};

export default App;
