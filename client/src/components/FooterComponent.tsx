import axios from "axios";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { IWeatherData } from "../types/weather";

function FooterComponent() {
  const [weather, setWeather] = useState<IWeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        // Replace with your API key and desired location
        const apiKey = "e9d186d7d20458b620f22402e4f4e592";
        const city = "fairfield";
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

        const response = await axios.get(url);
        setWeather(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch weather data");
        setLoading(false);
        console.error("Error fetching weather:", err);
      }
    };

    fetchWeather();
  }, []);
  return (
    <footer className=" footer py-3 bg-light mt-4">
      <Container className="d-flex flex-wrap justify-content-between align-items-center">
        <span className="mb-3 mb-md-0 text-body-secondary">
          &copy;{new Date().getFullYear()} Yordanos
        </span>
        <div>
          <span>Weather in {weather?.name} </span>
          <span>
            {weather?.main.temp !== undefined
              ? Math.round(weather.main.temp)
              : "--"}{" "}
            °C
          </span>
          {weather?.weather[0]?.icon && (
            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
              alt={weather.weather[0].description}
            />
          )}
          <span>{weather?.weather[0]?.description}</span>
        </div>
      </Container>
    </footer>
  );
}

export default FooterComponent;
