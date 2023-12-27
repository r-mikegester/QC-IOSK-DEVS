import React, { Component } from "react";

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
      let precipitation = '';
      if (data.rain && data.rain['1h']) {
        precipitation = `Rain: ${data.rain['1h']} mm/h`;
      } else if (data.snow && data.snow['1h']) {
        precipitation = `Snow: ${data.snow['1h']} mm/h`;
      } else {
        precipitation = 'No precipitation';
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
      return "text-sky-200"; // Cold temperature
    } else if (temperature > 10 && temperature <= 30) {
      return "text-yellow-200"; // Moderate temperature
    } else {
      return "text-red-300"; // Hot temperature
    }
  };

  startWeatherUpdate = () => {
    if (!this.weatherUpdateInterval) {
      this.weatherUpdateInterval = setInterval(() => {
        this.fetchWeather(); // Fetch updated weather data every minute
      }, 3000); // 60000 milliseconds = 1 minute
    }
  };

  render() {
    const temperatureColor = this.getTemperatureColor(
      parseFloat(this.state.temperature)
    );
    return (
      <div className="App">
        <div className="w-44 h-auto text-center bg-gray-900/50 backdrop-blur-lg rounded-2xl py-1 pb-5 text-sm justify-start px-3">
          <h1>{this.state.city}</h1>
          <h2 className={`font-bold ${temperatureColor}`}>
            {this.state.temperature}°C
          </h2>
          <img
            src={`http://openweathermap.org/img/wn/${this.state.iconUrl}@2x.png`}
            alt="Weather Icon"
            className="justify-center mx-auto -my-12 w-44 h-44"
          />
          {this.state.error && <p>{this.state.error}</p>}
          <h3 className="capitalize text-lg font-bold">
            {this.state.description}
          </h3>
          <div className="bg-gray-800/50 text-left p-2 rounded-xl">
            <p>
              <span className="text-gray-400">Min Temp: </span>{" "}
              {this.state.minTemperature}°C
            </p>
            <p>
              <span className="text-gray-400">Max Temp: </span>{" "}
              {this.state.maxTemperature}°C
            </p>
            
            <p>
              <span className="text-gray-400">Wind Speed: </span>{" "}
              {this.state.windSpeed}m/s
            </p>
            {/* Display additional weather information */}
            <p>
              <span className="text-gray-400">Weather Code: </span>{" "}
              {this.state.weatherCode}
            </p>
            <p>
              <span className="text-gray-400">Sunrise: </span>{" "}
              {this.state.sunrise.toLocaleTimeString()}
            </p>
            <p>
              <span className="text-gray-400">Sunset: </span>{" "}
              {this.state.sunset.toLocaleTimeString()}
            </p>
            <p>
              <span className="text-gray-400">Humidity: </span>{" "}
              {this.state.humidity}%
            </p>
            <p>
              <span className="text-gray-400">Cloud Coverage: </span>{" "}
              {this.state.clouds}%
            </p>
            <p>
              <span className="text-gray-400">Precipitation: </span>{" "}
              {this.state.precipitation}
            </p>
           
          </div>
        </div>
      </div>
    );
  }
}

export default WeatherPane;
