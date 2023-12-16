import React, { useState, useEffect } from 'react';

interface WeatherData {
  main: {
    temp: number;
    humidity: number;
  };
  weather: {
    main: string;
    description: string;
  }[];
}

const WeatherComponent: React.FC = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const apiKey = 'ab771b0791641b4b32511c5c2fcc28f7'; // Replace 'YOUR_API_KEY' with your actual API key

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=QuezonCity,PH&appid=${apiKey}&units=metric`
          // Replace 'CityName' with the name of the city for which you want to fetch weather data
        );

        if (response.ok) {
          const data: WeatherData = await response.json();
          setWeather(data);
        } else {
          console.error('Failed to fetch weather data');
        }
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchData();
  }, [apiKey]);

  return (
    <div>
      <h2>Weather Information</h2>
      {weather ? (
        <div>
          <p>Temperature: {weather.main.temp}°C</p>
          <p>Humidity: {weather.main.humidity}%</p>
          <p>Description: {weather.weather[0].description}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default WeatherComponent;
