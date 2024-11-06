import React from "react";
import "./descriptions.css";
import { FaArrowUp, FaArrowDown, FaWind } from "react-icons/fa";
import { BiHappy } from "react-icons/bi";
import { GiSunrise, GiSunset } from "react-icons/gi";
import {
  MdCompress,
  MdOutlineVisibility,
  MdOutlineWaterDrop,
} from "react-icons/md";

const Descriptions = ({ weather, units }) => {
  const sunriseTimestamp = weather.sunrise;
  const sunsetTimestamp = weather.sunset;

  //sunrise code
  const sunriseTime = new Date(sunriseTimestamp * 1000).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  console.log(sunriseTime);
  
  const extractedTimeUnit1 = sunriseTime.slice(-2);
 // console.log("hi",extractedTimeUnit1);
  const sunriseTimewithoutunit = new Date(sunriseTimestamp * 1000).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  

  // sunset code
  const sunsetTime = new Date(sunsetTimestamp * 1000).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  console.log(sunsetTime);
  const extractedTimeUnit2 = sunsetTime.slice(-2);
  const sunsetTimewithoutunit = new Date(
    sunsetTimestamp * 1000
  ).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  const tempUnit = units === "metric" ? "C" : "F";
  const windUnit = units === "metric" ? "m/s" : "m/hr";
  const cards = [
    {
      id: 1,
      icon: <FaArrowDown />,
      title: "min",
      data: weather.temp_min.toFixed(),
      unit: tempUnit,
    },
    {
      id: 2,
      icon: <FaArrowUp />,
      title: "max",
      data: weather.temp_max.toFixed(),
      unit: tempUnit,
    },
    {
      id: 3,
      icon: <BiHappy />,
      title: "feels like",
      data: weather.feels_like.toFixed(),
      unit: tempUnit,
    },
    {
      id: 4,
      icon: <MdCompress />,
      title: "pressure",
      data: weather.pressure.toFixed(),
      unit: "hPa",
    },
    {
      id: 5,
      icon: <MdOutlineWaterDrop />,
      title: "humidty",
      data: weather.humidity.toFixed(),
      unit: "%",
    },
    {
      id: 6,
      icon: <FaWind />,
      title: "Wind Speed",
      data: weather.speed.toFixed(),
      unit: windUnit,
    },
    {
      id: 7,
      icon: <MdOutlineVisibility />,
      title: "Visibility",
      data: weather.visibility / 1000,
      unit: "Km",
    },
    {
      id: 8,
      icon: <GiSunrise />,
      title: "SunRise",
      data: sunriseTimewithoutunit,
      unit: extractedTimeUnit1,
    },
    {
      id: 9,
      icon: <GiSunset />,
      title: "SunSet",
      data: sunsetTimewithoutunit,
      unit: extractedTimeUnit2,
    },
  ];

  return (
    <div className="section section__descriptions">
      {cards.map(({ id, icon, title, data, unit }) => (
        <div key={id} className="card">
          <div className="description__card-icon">
            {icon}
            <small>{title}</small>
          </div>
          <h2>{`${data} ${unit}`}</h2>
        </div>
      ))}
    </div>
  );
};

export default Descriptions;
