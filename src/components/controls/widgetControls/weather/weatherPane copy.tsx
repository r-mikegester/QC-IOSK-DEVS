import React, { Component } from "react";
import { Icon } from "@iconify/react";
import "../../../../assets/css/sidebar.css";
import { useTranslation, withTranslation, WithTranslation} from "react-i18next";
import ClockPane from "../clock/clock";

interface WeatherPaneProps extends WithTranslation {}

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

class WeatherPane extends Component<{}, AppState> {
  private API_KEY: string = "ab771b0791641b4b32511c5c2fcc28f7";
  private weatherUpdateInterval: NodeJS.Timeout | number | null = null; // Declare the property

  constructor(props: {}) {
    super(props);
    this.state = {
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
    };
  }

  componentDidMount() {
    this.fetchWeather(); // Fetch weather initially
    this.startWeatherUpdate(); // Start updating weather every minute
  }

  componentWillUnmount() {
    if (this.weatherUpdateInterval) {
      clearInterval(this.weatherUpdateInterval); // Clear the interval when component unmounts
    }
  }
  fetchWeather = () => {
    const city = "Quezon City";

    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&appid=" +
        this.API_KEY
    )
      .then((response) => response.json())
      .then((data) => {
        const sunriseTimestamp = data.sys.sunrise * 1000; // Convert sunrise timestamp to milliseconds
        const sunsetTimestamp = data.sys.sunset * 1000; // Convert sunset timestamp to milliseconds

        // Check if precipitation data is available (rain or snow)
        let precipitation = "";
        if (data.rain && data.rain["1h"]) {
          precipitation = `Rain: ${data.rain["1h"]} mm/h`;
        } else if (data.snow && data.snow["1h"]) {
          precipitation = `Snow: ${data.snow["1h"]} mm/h`;
        } else {
          precipitation = "No precipitation";
        }

        this.setState({
          temperature: Math.round(
            parseFloat(data.main.temp) - 273.15
          ).toString(),
          city: data.name,
          uvIndex: data.uvi,
          pressure: data.main.pressure,
          description: data.weather[0].description,
          feelsLikeTemp: Math.round(
            parseFloat(data.main.feels_like) - 273.15
          ).toString(), // Feels like temperature
          minTemperature: (parseFloat(data.main.temp_min) - 273.15).toFixed(2),
          maxTemperature: (parseFloat(data.main.temp_max) - 273.15).toFixed(2),
          humidity: data.main.humidity,
          windSpeed: data.wind.speed,
          iconUrl: data.weather[0].icon,
          weatherCode: data.weather[0].id, // Weather condition code
          clouds: data.clouds.all, // Cloud coverage percentage
          sunrise: new Date(sunriseTimestamp), // Sunrise time
          sunset: new Date(sunsetTimestamp), // Sunset time
          precipitation: precipitation, // Add precipitation data
          // Add more properties if needed, such as rain, snow, etc.
        });
        // Extracting additional weather-related data
        const feelsLikeTemp = Math.round(
          parseFloat(data.main.feels_like) - 273.15
        ).toString();
        const visibility = data.visibility;
        const pressure = data.main.pressure;
        const uvIndex = data.uvi; // Assuming this data is available in the API response
        const airQualityIndex = data.main.aqi; // Assuming this data is available in the API response
      })

      .catch((error) => {
        this.setState({
          error: "Failed to fetch weather data. Please try again later.",
        });
      });
  };
  // Function to determine temperature color based on a range
  getTemperatureColor = (temperature: number) => {
    if (temperature <= 10) {
      return "text-info"; // Cold temperature
    } else if (temperature > 10 && temperature <= 30) {
      return "text-base-content"; // Moderate temperature
    } else {
      return "text-error"; // Hot temperature
    }
  };

  startWeatherUpdate = () => {
    if (!this.weatherUpdateInterval) {
      this.weatherUpdateInterval = setInterval(() => {
        this.fetchWeather(); // Fetch updated weather data every minute
      }, 30000); // 60000 milliseconds = 1 minute
    }
  };

  render() {
  
    const temperatureColor = this.getTemperatureColor(
      parseFloat(this.state.temperature)
    );
    interface WeatherIcons {
      [key: string]: string;
    }

    const weatherIcons: WeatherIcons = {
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

    // Inside your component or helper function
    const getWeatherIcon = (iconCode: string) => {
      const defaultIcon = "eos-icons:three-dots-loading"; // Default icon if the code doesn't match

      // Check if the weather code exists in the mapping, if not, use the default icon
      const icon = weatherIcons[iconCode] || defaultIcon;

      return <Icon icon={icon} className="w-10 h-10" />;
    };

    // Inside your render method or where the weather icon is displayed
    const weatherIcon = getWeatherIcon(this.state.iconUrl); // Assuming this.state.iconUrl holds the weather icon code from the OpenWeatherAPI

    return (
      <div className="App">
        <div className="">
          <div
            tabIndex={0}
            className=" cursor-pointer hover:duration-150 hover:ease-in-out text-base-content collapse cursor collapse-arrow w-96 rounded-2xl bg-base-300 backdrop-blur-lg"
          >
            <div className="flex flex-col  bg-base-100 rounded-t-2xl">
              <div className="inline-flex justify-between mx-auto w-80 bg-base-100 backdrop-blur-lg rounded-2xl">
                <div className="inline-flex justify-between py-2 mx-auto w-80">
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
                          {this.state.temperature}°c
                        </span>{" "}
                        |{" "}
                        <span className="text-base-content font-bold">
                          {this.state.city}
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
            <div className="space-y-2 collapse-content">
              <div className=" w-full mx-auto">
                <div className=" w-full items-center space-y-2">
                  <div className="text-xl font-bold flex items-center justify-between bg-base-200 p-2 capitalize rounded-lg mt-2 text-base-content">
                    <div className="weather-icon flex items-center text-2xl">
                    <Icon icon="solar:temperature-broken" className="w-10 h-10" />
                      {this.state.temperature}°c
                    </div>
                    <div className="mx-8">
                      <p className="text-sm sm:text-base font-semibold">
                        {this.state.description}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        <span className="text-base-content font-bold">
                          {t("feelslike")}:{" "}
                          {parseFloat(this.state.feelsLikeTemp).toFixed(1)}°c{" "}
                          {/* Display "feels like" temperature with one decimal place */}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              {this.state.error && <p>{this.state.error}</p>}
<div className="grid p-2 text-left bg-base-200/70 rounded-xl">
                <div className="flex items-center justify-between mx-auto space-x-auto text-base-content">
                  <div
                    className="flex flex-col tooltip tooltip-top rounded-xl hover:bg-base-100 items-center space-y-1 px-2"
                    data-tip={t("CloudCoverage")}
                  >
                    {/* <span className="uppercase">wed</span> */}
                    <Icon
                      icon="solar:clouds-broken"
                      className="w-8 h-8 mx-2 my-1"
                    />
                    <span> {this.state.clouds}%</span>
                  </div>
                  <div
                    className="flex flex-col tooltip tooltip-top rounded-xl hover:bg-base-100 items-center space-y-1 px-2"
                    data-tip={t("WindSpeed")}
                  >
                    {/* <span className="uppercase">wed</span> */}
                    <Icon icon="mdi:windy" className="w-8 h-8 mx-2 my-1" />
                    <span> {this.state.windSpeed}m/s</span>
                  </div>
                  <div
                    className="flex flex-col tooltip tooltip-top rounded-xl hover:bg-base-100 items-center space-y-1 px-2"
                    data-tip={t("Humidity")}
                  >
                    {/* <span className="uppercase">wed</span> */}
                    <Icon
                      icon="carbon:humidity-alt"
                      className="w-8 h-8 mx-2 my-1"
                    />
                    <span> {this.state.humidity}%</span>
                  </div>
                  <div
                    className="flex flex-col tooltip tooltip-top rounded-xl hover:bg-base-100 items-center space-y-1 px-2"
                    data-tip={t("Pressure")}
                  >
                    {/* <span className="uppercase">wed</span> */}
                    <Icon icon="mdi:barometer" className="w-8 h-8 mx-2 my-1" />
                    <span>
                      {" "}
                      {this.state.pressure} hPa {/* Display pressure */}
                    </span>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 p-2 gap-1 text-left bg-base-200/70 rounded-xl">
                <p
                  className="flex items-center tooltip tooltip-top hover:bg-base-100 rounded-lg"
                  data-tip={t("MinTemp")}
                >
                  <span className="font-bold text-base-content">
                    <Icon
                      icon="carbon:temperature-min"
                      className="w-8 h-8 mx-2 my-1"
                    />{" "}
                  </span>{" "}
                  {this.state.minTemperature}°C
                </p>
                <p
                  className="flex items-center tooltip tooltip-top hover:bg-base-100 rounded-lg"
                  data-tip={t("MaxTemp")}
                >
                  <span className="font-bold text-base-content">
                    <Icon
                      icon="carbon:temperature-max"
                      className="w-8 h-8 mx-2 my-1"
                    />
                  </span>{" "}
                  {this.state.maxTemperature}°C
                </p>

                <p
                  className="flex items-center tooltip tooltip-top hover:bg-base-100 rounded-lg"
                  data-tip={t("Sunrise")}
                >
                  <span className="font-bold text-base-content">
                    <Icon
                      icon="solar:sunrise-broken"
                      className="w-8 h-8 mx-2 my-1"
                    />{" "}
                  </span>{" "}
                  {this.state.sunrise.toLocaleTimeString()}
                </p>
                <p
                  className="flex items-center tooltip tooltip-top hover:bg-base-100 rounded-lg"
                  data-tip={t("Sunsets")}
                >
                  <span className="font-bold text-base-content">
                    <Icon
                      icon="solar:sunset-broken"
                      className="w-8 h-8 mx-2 my-1"
                    />{" "}
                  </span>{" "}
                  {this.state.sunset.toLocaleTimeString()}
                </p>
                <p
                  className="flex items-center tooltip tooltip-top hover:bg-base-100 rounded-lg"
                  data-tip={t("UVIndex")}
                >
                  <span className="font-bold text-base-content">
                    <Icon
                      icon="carbon:uv-index"
                      className="w-8 h-8 mx-2 my-1"
                    />
                  </span>{" "}
                  {this.state.uvIndex} {/* Display UV index */}
                </p>
                <p
                  className="flex items-center tooltip tooltip-top hover:bg-base-100 rounded-lg"
                  data-tip={t("Visibility")}
                >
                  <span className="font-bold text-base-content">
                    <Icon
                      icon="dashicons:visibility"
                      className="w-8 h-8 mx-2 my-1"
                    />
                  </span>{" "}
                  {this.state.visibility}
                </p>
              </div>

              
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default withTranslation()(WeatherPane);
