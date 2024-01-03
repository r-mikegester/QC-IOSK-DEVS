import React, { Component } from "react";
import { Icon } from "@iconify/react";
import "../../sidebarControls/sidebar.css";
import { useTranslation } from "react-i18next";
import { withTranslation } from "react-i18next";

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
          temperature: (parseFloat(data.main.temp) - 273.15).toFixed(2),
          city: data.name,
          description: data.weather[0].description,
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

        // Log the current update
        // console.log("Weather updated:", {
        //   temperature: this.state.temperature,
        //   city: this.state.city,
        //   description: this.state.description,
        //   minTemperature: this.state.minTemperature,
        //   maxTemperature: this.state.maxTemperature,
        //   humidity: this.state.humidity,
        //   windSpeed: this.state.windSpeed,
        // });
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
    const { t } = this.props;
    const temperatureColor = this.getTemperatureColor(
      parseFloat(this.state.temperature)
    );

    
    return (
      <div className="App">
        <div tabIndex={0} className="cursor-pointer hover:duration-150 hover:ease-in-out text-base-content collapse cursor hover:bg-base-300 w-44 rounded-2xl bg-base-100 backdrop-blur-lg">
          <div className="p-1 text-center ">
            {/* <h1 className="text-base-content">{this.state.city}</h1> */}
             <img
              src={`http://openweathermap.org/img/wn/${this.state.iconUrl}@2x.png`}
              alt="Weather Icon"
              className="justify-center w-20 h-20 mx-auto -my-3"
            />
            <h1 className={`font-bold -mt-3 ${temperatureColor}`}>
              {this.state.temperature}°C
            </h1>
           
            
          </div>
          <div className="collapse-content ">
            {this.state.error && <p>{this.state.error}</p>}
            <h3 className="-mt-2 text-lg font-bold text-center capitalize text-base-content">
              {this.state.description}
            </h3>
            <div className="p-1 text-left bg-base-200/70 rounded-xl">
              <p className="flex items-center tooltip tooltip-top hover:bg-base-100 rounded-xl" data-tip={t("MinTemp")}>
                <span className="font-bold text-base-content">
                  <Icon
                    icon="carbon:temperature-min"
                    className="w-8 h-8 mx-2 my-1"
                  />{" "}
                </span>{" "}
                {this.state.minTemperature}°C
              </p>
              <p className="flex items-center tooltip tooltip-top hover:bg-base-100 rounded-xl" data-tip={t("MaxTemp")}>
                <span className="font-bold text-base-content">
                  <Icon
                    icon="carbon:temperature-max"
                    className="w-8 h-8 mx-2 my-1"
                  />
                </span>{" "}
                {this.state.maxTemperature}°C
              </p>

              <p className="flex items-center tooltip tooltip-top hover:bg-base-100 rounded-xl" data-tip={t("WindSpeed")}>
                <span className="font-bold text-base-content">
                  <Icon icon="mdi:windy" className="w-8 h-8 mx-2 my-1" />{" "}
                </span>{" "}
                {this.state.windSpeed}m/s
              </p>

              <p className="flex items-center tooltip tooltip-top hover:bg-base-100 rounded-xl" data-tip={t("Humidity")}>
                <span className="font-bold text-base-content">
                  <Icon
                    icon="carbon:humidity-alt"
                    className="w-8 h-8 mx-2 my-1"
                  />{" "}
                </span>{" "}
                {this.state.humidity}%
              </p>
              <p className="flex items-center tooltip tooltip-top hover:bg-base-100 rounded-xl" data-tip={t("CloudCoverage")}>
                <span className="font-bold text-base-content">
                  <Icon
                    icon="solar:clouds-broken"
                    className="w-8 h-8 mx-2 my-1"
                  />
                </span>{" "}
                {this.state.clouds}%
              </p>
              <p className="flex items-center tooltip tooltip-top hover:bg-base-100 rounded-xl" data-tip={t("Sunrise")}>
                <span className="font-bold text-base-content">
                  <Icon
                    icon="solar:sunrise-broken"
                    className="w-8 h-8 mx-2 my-1"
                  />{" "}
                </span>{" "}
                {this.state.sunrise.toLocaleTimeString()}
              </p>
              <p className="flex items-center tooltip tooltip-top hover:bg-base-100 rounded-xl" data-tip={t("Sunsets")}>
                <span className="font-bold text-base-content">
                  <Icon
                    icon="solar:sunset-broken"
                    className="w-8 h-8 mx-2 my-1"
                  />{" "}
                </span>{" "}
                {this.state.sunset.toLocaleTimeString()}
              </p>
              {/* <p className="flex items-center">
              <span className="font-bold text-base-content">Precipitation: </span>{" "}
              {this.state.precipitation}
            </p> */}
              {/* Display additional weather information */}
              {/* <p className="flex items-center">
              <span className="font-bold text-base-content">Weather Code: </span>{" "}
              {this.state.weatherCode}
            </p> */}
            </div>
          </div>
        </div>
        
      </div>
    );
  }
}

export default  withTranslation()(WeatherPane);
