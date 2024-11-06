import React from "react";
import hot from "./hot.jpg";
import cold from './cold.jpg';
import cloudy from "./cloudy.jpg";
import mist from "./mist1.jpg";
import rainy from "./rainy.jpg";
import smoke from './smoke.jpg';
import clearsky from "./clearsky.jpg";
import brokenclouds from "./brokenclouds1.jpg";
import haze from './hazefi.jpg';
import overcastclouds from "./overcast1.jpg";
import scatteredclouds from "./sc1.jpg";
import Descriptions from "./components/Descriptions";
import { getFormattedWeatherData } from "./components/WeatherService";
import { useEffect, useState } from "react";


function App() {
  const [city, setCity] = useState("chennai");
  const [weather, setWeather] = useState(null);
    const [units, setUnits] = useState("metric");
  const [bg, setBg] = useState("");
  const [error, setError] = useState("");

  
  const unixTimestampToHumanReadable = (timestamp) => {
    const date = new Date(timestamp * 1000); 
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month is zero-based
    const day = date.getDate().toString().padStart(2, '0');
    return `${day}-${month}-${year}`;
  };

  // Function to get the user's current location
  //const getCurrentLocation = () => {
    //return new Promise((resolve, reject) => {
      //navigator.geolocation.getCurrentPosition(resolve, reject);
    //});
  //};
  

  useEffect(() => { 
    const fetchWeatherData = async () => {
      setError('');

      try {
        const data = await getFormattedWeatherData(city, units);
        
        
        const weatherDescription = data.description;
        
        const isbrokenclouds = weatherDescription.includes("broken clouds");
        const isfewclouds = weatherDescription.includes("few clouds");
        const isscatteredclouds =weatherDescription.includes("scattered clouds");
        const ismist = weatherDescription.includes("mist");
        const ishaze = weatherDescription.includes("haze");
        const isRainy = weatherDescription.includes("drizzle");
        const islightrain = weatherDescription.includes("rain");
        const isclearsky = weatherDescription.includes("clear sky");
        const isSunny = weatherDescription.includes("sunny");
        const isovercast = weatherDescription.includes("overcast clouds");
        const issmoky = weatherDescription.includes("smoke");

        
        
          if (isRainy) {
            setBg(rainy);
          } else if (isSunny) {
            setBg(hot);
          } else if (isclearsky) {
            setBg(clearsky);
          } else if (ismist) {
            setBg(mist);
          } else if (isbrokenclouds) {
            setBg(brokenclouds);
          } else if (isovercast) {
            setBg(overcastclouds);
          } else if (isfewclouds) {
            setBg(cloudy);
          } else if (isscatteredclouds) {
            setBg(scatteredclouds);
          } else if (ishaze) {
            setBg(haze);
          } else if (issmoky) {
            setBg(smoke);
          } else if( islightrain){
            setBg(rainy);
          }



        
     

        const threshold = units === 'metric' ? 20 : 68;
        console.log("threshold is:",threshold);
        if (data.temp <= threshold) 
        {
          setBg(cold);
        };

        setWeather(data);

      } catch (error) {
        setError(
          "Error fetching weather data. Please check the city name and try again."
        );
      }

      
    };

    fetchWeatherData();
  }, [units, city]);



  const handleUnitsClick = (e) => {
    const button = e.currentTarget;
    const currentUnit = button.innerText;

    const isCelsius = currentUnit === "C";
    button.innerText = isCelsius ? "F" : "C";
    setUnits(isCelsius ? "metric" : "imperial");
  };

  // e represents keyboard event.
  const enterkeypressed = (e) => {
    if (e.keyCode === 13) {
      setCity(e.currentTarget.value);
      e.target.blur();
    }
  };

  return (
    <div className="app" style={{ backgroundImage: error ? `url(defaulterrorimg)` : `url(${bg})` }}>
      <div className="overlay">
        {error ? (
          <p style={{ color: 'red', fontSize: '24px' }} className="error">{error}</p>
        ) : ( weather &&(
          <div className="container">


            <div className="section section__inputs">
              <input
                onKeyDown={enterkeypressed}
                type="text"
                // name="city"
                placeholder="Enter city name..."/>
              <button onClick={(e) => handleUnitsClick(e)}> <sup>o</sup>F</button>
            </div>


            <div className="section section__temperature">
              <div className="icon">
                <h3>{`${weather.name}, ${weather.country}`}</h3>
                
                <img src={weather.iconURL} alt="weather icon" />
                <h3>{weather.description}</h3>
                <br/>
                <p>Date: {unixTimestampToHumanReadable(weather.dt)}</p> 
              </div>

              <div className="temperature">
                <h1>{`${weather.temp.toFixed()}
                ${String.fromCharCode(176)}${
                  units === "metric" ? "C" : "F"
                }`}</h1>
              </div>
            </div>


            {/*bottom description*/}
            <Descriptions weather={weather} units={units} />
          </div>
        )
        )}
      </div>
      </div>
  )};
export default App;
