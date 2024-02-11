import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import "../../../assets/css/sidebar.css";
import { useTranslation, WithTranslation } from "react-i18next";
import ClockPane from "../clock/clock";

const WeatherPane: React.FC = () => {
  const { t } = useTranslation();
  const [weatherData, setWeatherData] = useState({
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
    // error: "",
    feelsLikeTemp: "",
    // visibility: "",
    pressure: "",
    // uvIndex: "",
    // airQualityIndex: "",
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
          // uvIndex: data.uvi,
          pressure: data.main.pressure,
          // airQualityIndex: data.main.airQualityIndex,
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
    // .catch((error) => {
    //   setWeatherData((prevData: any) => ({
    //     ...prevData,
    //     error: "Failed to fetch weather data. Please try again later.",
    //   }));
    // });
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

  const currentDate = new Date();
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = currentDate.toLocaleDateString(undefined, options);
  
  return (
    <div className="App">
      <div
        tabIndex={0}
        className="w-auto shadow-lg cursor-pointer hover:duration-150 hover:ease-in-out text-base-content collapse cursor collapse-arrow min-w-80 max-w-96 rounded-2xl bg-base-100 backdrop-blur-lg"
      >
        <div className="flex flex-col bg-base-100 rounded-t-2xl">
          <div className="inline-flex justify-between mx-auto bg-base-100 backdrop-blur-lg rounded-2xl">
            <div className="grid justify-between grid-cols-2 py-2">
              <div className="flex items-center justify-between">
                <div className="flex-shrink-0">
                  <div className="weather-icon">{weatherIcon}</div>
                </div>

                <div className="grow">
                  <p className="text-sm font-semibold sm:text-base">
                    {t("SanBartolome")}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    <span className="font-bold text-base-content">
                      {weatherData.temperature}°C
                    </span>{" "}
                    |{" "}
                    <span className="font-bold text-base-content">
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
        <div className="px-2 py-0 collapse-content bg-base-300 rounded-t-2xl">
          <div className="px-2 pt-2 space-y-2 bg-base-300 rounded-3xl">
            <div className="w-full mx-auto ">
              <div className="items-center w-full space-y-2 ">
                <div className="grid grid-cols-2">
                  <div
                    className="col-span-2 px-3 py-2 mb-2 text-center tooltip tooltip-top bg-base-100 hover:bg-base-200 rounded-xl"
                    data-tip={t("Current Date")}
                  >
                    <div>
                      <p className="text-xl font-bold">{formattedDate}</p>
                    </div>

                  </div>
                  <div
                    className="col-span-2 text-center tooltip tooltip-top bg-base-100 rounded-xl"

                  >

                    <div className="grid items-stretch justify-between grid-cols-2 p-2 mt-2 text-xl capitalize bg-base-100 rounded-xl text-base-content">


                      <div
                        className="col-span-1 px-3 py-2 text-center tooltip tooltip-top hover:bg-base-200 rounded-xl"
                        data-tip={t("Current Temperature")}
                      >
                        <div className="flex items-center m-2">
                          <Icon
                            icon="solar:temperature-broken"
                            className="w-10 h-10"
                          />
                          <p className="text-2xl font-semibold">
                            {weatherData.temperature}°C
                          </p>
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          <span className="text-base-content font-100 ">
                            {t("feelslike")}:{" "}
                            {parseFloat(weatherData.feelsLikeTemp).toFixed(1)}°c{" "}
                            {/* Display "feels like" temperature with one decimal place */}
                          </span>
                        </p>
                      </div>
                      <div
                        className="items-center col-span-1 px-3 py-2 text-left tooltip tooltip-top hover:bg-base-200 rounded-xl"
                        data-tip={t("Weather Description")}
                      >
                        <div className="flex flex-col items-center justify-center text-sm font-semibold ">
                          <div className="weather-icon">{weatherIcon}</div>
                          {weatherData.description}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* {weatherData.error && <p>{weatherData.error}</p>} */}
                <div className=" bg-base-100 rounded-xl">
                  <div className="grid items-center justify-between grid-cols-4 gap-1 p-2 mx-auto space-x-auto text-base-content">
                    <div
                      className="flex flex-col items-center px-2 space-y-1 tooltip tooltip-top rounded-xl hover:bg-base-200"
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
                      className="flex flex-col items-center px-2 space-y-1 tooltip tooltip-top rounded-xl hover:bg-base-200"
                      data-tip={t("WindSpeed")}
                    >
                      {/* <span className="uppercase">wed</span> */}
                      <Icon icon="mdi:windy" className="w-8 h-8 mx-2 my-1" />
                      <span> {weatherData.windSpeed}m/s</span>
                    </div>
                    <div
                      className="flex flex-col items-center px-2 space-y-1 tooltip tooltip-top rounded-xl hover:bg-base-200"
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
                      className="flex flex-col items-center px-2 space-y-1 tooltip tooltip-top rounded-xl hover:bg-base-200"
                      data-tip={t("Pressure")}
                    >
                      {/* <span className="uppercase">wed</span> */}
                      <Icon icon="mdi:barometer" className="w-8 h-8 mx-2 my-1" />
                      <span>
                        {" "}
                        {weatherData.pressure}
                        <span className="text-[10px]">hPa</span>{" "}
                        {/* Display pressure */}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-1 p-2 text-left bg-base-100 rounded-xl">
                  <p
                    className="flex items-center rounded-lg tooltip tooltip-top hover:bg-base-200"
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
                    className="flex items-center rounded-lg tooltip tooltip-top hover:bg-base-200"
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
                    className="flex items-center rounded-lg tooltip tooltip-top hover:bg-base-200"
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
                    className="flex items-center rounded-lg tooltip tooltip-top hover:bg-base-200"
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
      </div>
    </div>
  );
};

export default WeatherPane;
