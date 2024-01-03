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

const WeatherPane: React.FC = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const apiKey = 'ab771b0791641b4b32511c5c2fcc28f7'; // Replace 'YOUR_API_KEY' with your actual API key

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=Quezon City&appid=${apiKey}&units=metric`
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
    <div className="w-44 h-auto bg-gray-100/50 backdrop-blur-lg rounded-2xl py-1 pb-5 text-sm justify-start px-3">
      <h2 className="text-xs font-extrabold">Weather Information</h2>
      {weather ? (
        <div>
          <p>Temperature: <span className="text-yellow-500">{weather.main.temp}°C</span></p>
          <p>Humidity: <span className="text-yellow-500">{weather.main.humidity}%</span></p>
          <p>Description: <span className="text-yellow-500">{weather.weather[0].description}</span></p>
        </div>
      ) : (
        <p className="text-xs">Loading Weather Data please wait...</p>
      )}
    </div>
  );
};

export default WeatherPane;
