import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import "../../../../assets/css/sidebar.css";
import { useTranslation, WithTranslation } from "react-i18next";
import ClockPane from "../clock/clock";

interface AppState {
  temperature: string;
  city: string;
  description: string;
  minTemperature: string;
  maxTemperature: string;
  humidity: string;
  windSpeed: string;
  iconUrl: string;
  error: string;
  weatherCode: number;
  clouds: number;
  sunrise: Date;
  sunset: Date;
  precipitation: string;
  feelsLikeTemp: string;
  visibility: string;
  pressure: string;
  uvIndex: string;
  airQualityIndex: string;
}

const WeatherPane: React.FC = () => {
  const { t } = useTranslation();
  const [weatherData, setWeatherData] = useState<AppState>({
    temperature: "",
    city: "",
    description: "",
    minTemperature: "",
    maxTemperature: "",
    humidity: "",
    windSpeed: "",
    iconUrl: "",
    weatherCode: 0,
    clouds: 0,
    sunrise: new Date(),
    sunset: new Date(),
    precipitation: "",
    error: "",
    feelsLikeTemp: "",
    visibility: "",
    pressure: "",
    uvIndex: "",
    airQualityIndex: "",
  });

  const API_KEY: string = "ab771b0791641b4b32511c5c2fcc28f7";
  let weatherUpdateInterval: NodeJS.Timeout | number | null = null;

  const fetchWeather = () => {
    const city = "Quezon City";

    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
    )
      .then((response) => response.json())
      .then((data) => {
        const sunriseTimestamp = data.sys.sunrise * 1000;
        const sunsetTimestamp = data.sys.sunset * 1000;

        let precipitation = "";
        if (data.rain && data.rain["1h"]) {
          precipitation = `Rain: ${data.rain["1h"]} mm/h`;
        } else if (data.snow && data.snow["1h"]) {
          precipitation = `Snow: ${data.snow["1h"]} mm/h`;
        } else {
          precipitation = "No precipitation";
        }

        setWeatherData({
          temperature: Math.round(
            parseFloat(data.main.temp) - 273.15
          ).toString(),
          city: data.name,
          uvIndex: data.uvi,
          pressure: data.main.pressure,
          description: data.weather[0].description,
          feelsLikeTemp: Math.round(
            parseFloat(data.main.feels_like) - 273.15
          ).toString(),
          minTemperature: (parseFloat(data.main.temp_min) - 273.15).toFixed(2),
          maxTemperature: (parseFloat(data.main.temp_max) - 273.15).toFixed(2),
          humidity: data.main.humidity,
          windSpeed: data.wind.speed,
          iconUrl: data.weather[0].icon,
          weatherCode: data.weather[0].id,
          clouds: data.clouds.all,
          sunrise: new Date(sunriseTimestamp),
          sunset: new Date(sunsetTimestamp),
          precipitation: precipitation,
        });
      })
      .catch((error) => {
        setWeatherData((prevData) => ({
          ...prevData,
          error: "Failed to fetch weather data. Please try again later.",
        }));
      });
  };

  const getTemperatureColor = (temperature: number) => {
    if (temperature <= 10) {
      return "text-info";
    } else if (temperature > 10 && temperature <= 30) {
      return "text-base-content";
    } else {
      return "text-error";
    }
  };

  const startWeatherUpdate = () => {
    if (!weatherUpdateInterval) {
      weatherUpdateInterval = setInterval(() => {
        fetchWeather();
      }, 30000);
    }
  };

  useEffect(() => {
    fetchWeather();
    startWeatherUpdate();

    return () => {
      if (weatherUpdateInterval) {
        clearInterval(weatherUpdateInterval);
      }
    };
  }, []);

  const temperatureColor = getTemperatureColor(
    parseFloat(weatherData.temperature)
  );

  const weatherIcons: { [key: string]: string } = {
    // Your weather icon mappings
    "01d": "wi:day-sunny",
    "01n": "wi:night-clear",
    "02d": "wi:day-cloudy",
    "02n": "wi:night-alt-cloudy",
    "03d": "wi:cloud",
    "03n": "wi:cloud",
    "04d": "wi:cloudy",
    "04n": "wi:cloudy",
    "09d": "wi:showers",
    "09n": "wi:showers",
    "10d": "wi:day-rain",
    "10n": "wi:night-alt-rain",
    "11d": "wi:day-thunderstorm",
    "11n": "wi:night-alt-thunderstorm",
    "13d": "wi:snow",
    "13n": "wi:snow",
    "50d": "wi:fog",
    "50n": "wi:fog",
    // Add more mappings for other weather conditions
    // For example, "windy", "tornado", "hail", etc.
  };

  const getWeatherIcon = (iconCode: string) => {
    const defaultIcon = "eos-icons:three-dots-loading";
    const icon = weatherIcons[iconCode] || defaultIcon;
    return <Icon icon={icon} className="w-10 h-10" />;
  };

  const weatherIcon = getWeatherIcon(weatherData.iconUrl);

  return (
    <div className="App">
      <div
        tabIndex={0}
        className=" cursor-pointer hover:duration-150 hover:ease-in-out text-base-content collapse cursor collapse-arrow w-80 shadow-lg rounded-2xl bg-base-100 backdrop-blur-lg"
      >
        <div className="flex flex-col  bg-base-100 rounded-t-2xl">
          <div className="inline-flex justify-between mx-auto  bg-base-100 backdrop-blur-lg rounded-2xl">
            <div className="grid grid-cols-2 justify-between py-2">
              <div className="flex items-center justify-between">
                <div className="flex-shrink-0">
                  <div className="weather-icon">{weatherIcon}</div>
                </div>

                <div className="grow">
                  <p className="text-sm sm:text-base font-semibold">
                    {t("SanBartolome")}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    <span className="text-base-content font-bold">
                      {weatherData.temperature}°C
                    </span>{" "}
                    |{" "}
                    <span className="text-base-content font-bold">
                      {weatherData.city}
                    </span>
                  </p>
                </div>
              </div>
              <div className="">
                <ClockPane name={""} />
              </div>
            </div>
          </div>
        </div>
        <div className=" collapse-content px-2 py-0 bg-base-300 rounded-t-2xl">
          <div className="bg-base-300 p-2 rounded-2xl space-y-2">
          <div className=" w-full mx-auto">
            <div className=" w-full items-center space-y-2">
              <div className="text-xl font-bold grid grid-cols-2 items-center justify-between bg-base-100 p-2 capitalize rounded-xl mt-2 text-base-content">
                <div className="weather-icon flex items-center text-2xl tooltip tooltip-top hover:bg-base-200 py-2 px-3 rounded-xl" data-tip={t("Current Temperature")}>
                  <Icon icon="solar:temperature-broken" className="w-10 h-10" />
                  {weatherData.temperature}°C
                </div>
                <div className="col-span-1 tooltip tooltip-top hover:bg-base-200 py-2 px-3 text-left rounded-xl" data-tip={t("Weather Description")}>
                  <p className="text-sm sm:text-base font-semibold">
                    {weatherData.description}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    <span className="text-base-content font-100 ">
                      {t("feelslike")}:{" "}
                      {parseFloat(weatherData.feelsLikeTemp).toFixed(1)}°c{" "}
                      {/* Display "feels like" temperature with one decimal place */}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
          {weatherData.error && <p>{weatherData.error}</p>}
          <div className=" bg-base-100 rounded-xl">
            <div className="grid grid-cols-4 gap-1 p-2 items-center justify-between mx-auto space-x-auto text-base-content">
              <div
                className="flex flex-col tooltip tooltip-top rounded-xl hover:bg-base-200 items-center space-y-1 px-2"
                data-tip={t("CloudCoverage")}
              >
                {/* <span className="uppercase">wed</span> */}
                <Icon
                  icon="solar:clouds-broken"
                  className="w-8 h-8 mx-2 my-1"
                />
                <span> {weatherData.clouds}%</span>
              </div>
              <div
                className="flex flex-col tooltip tooltip-top rounded-xl hover:bg-base-200 items-center space-y-1 px-2"
                data-tip={t("WindSpeed")}
              >
                {/* <span className="uppercase">wed</span> */}
                <Icon icon="mdi:windy" className="w-8 h-8 mx-2 my-1" />
                <span> {weatherData.windSpeed}m/s</span>
              </div>
              <div
                className="flex flex-col tooltip tooltip-top rounded-xl hover:bg-base-200 items-center space-y-1 px-2"
                data-tip={t("Humidity")}
              >
                {/* <span className="uppercase">wed</span> */}
                <Icon
                  icon="carbon:humidity-alt"
                  className="w-8 h-8 mx-2 my-1"
                />
                <span> {weatherData.humidity}%</span>
              </div>
              <div
                className="flex flex-col tooltip tooltip-top rounded-xl hover:bg-base-200 items-center space-y-1 px-2"
                data-tip={t("Pressure")}
              >
                {/* <span className="uppercase">wed</span> */}
                <Icon icon="mdi:barometer" className="w-8 h-8 mx-2 my-1" />
                <span>
                  {" "}
                  {weatherData.pressure}hPa {/* Display pressure */}
                </span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 p-2 gap-1 text-left bg-base-100 rounded-xl">
            <p
              className="flex items-center tooltip tooltip-top hover:bg-base-200 rounded-lg"
              data-tip={t("MinTemp")}
            >
              <span className="font-bold text-base-content">
                <Icon
                  icon="carbon:temperature-min"
                  className="w-8 h-8 mx-2 my-1"
                />{" "}
              </span>{" "}
              {weatherData.minTemperature}°C
            </p>
            <p
              className="flex items-center tooltip tooltip-top hover:bg-base-200 rounded-lg"
              data-tip={t("MaxTemp")}
            >
              <span className="font-bold text-base-content">
                <Icon
                  icon="carbon:temperature-max"
                  className="w-8 h-8 mx-2 my-1"
                />
              </span>{" "}
              {weatherData.maxTemperature}°C
            </p>

            <p
              className="flex items-center tooltip tooltip-top hover:bg-base-200 rounded-lg"
              data-tip={t("Sunrise")}
            >
              <span className="font-bold text-base-content">
                <Icon
                  icon="solar:sunrise-broken"
                  className="w-8 h-8 mx-2 my-1"
                />{" "}
              </span>{" "}
              {weatherData.sunrise.toLocaleTimeString()}
            </p>
            <p
              className="flex items-center tooltip tooltip-top hover:bg-base-200 rounded-lg"
              data-tip={t("Sunsets")}
            >
              <span className="font-bold text-base-content">
                <Icon
                  icon="solar:sunset-broken"
                  className="w-8 h-8 mx-2 my-1"
                />{" "}
              </span>{" "}
              {weatherData.sunset.toLocaleTimeString()}
            </p>
           
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherPane;
