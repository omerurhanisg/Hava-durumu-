import React, { useEffect, useState } from "react";
import "../components/style.css";
import WeatherDetails from "./WeatherDetails";

function SearchMain() {
  const [searchTerm, setSearchTerm] = useState("Antalya");
  const [tempInfo, setTempInfo] = useState({});

  const getWeatherInfo = async () => {
    try {
      let url = `http://api.openweathermap.org/data/2.5/weather?q=${searchTerm}&units=metric&appid=f840f08444c59ce09a2fbb87f9bff214`;

      let res = await fetch(url);
      let data = await res.json();
      const { temp, humidity, pressure } = data.main;
      const { main: weatherType } = data.weather[0];
      const { name } = data;
      const { speed } = data.wind;
      const { country, sunset } = data.sys;

      const myNewWeatherInfo = {
        temp,
        humidity,
        pressure,
        weatherType,
        name,
        speed,
        country,
        sunset,
      };

      setTempInfo(myNewWeatherInfo);
      // console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getWeatherInfo();
  }, []);

  return (
    <>
      <div className="wrap">
        <div className="search">
          <input
            type="ara"
            placeholder="şehir ara.."
            id="ara"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="searchButton" onClick={getWeatherInfo}>
            Şehir ara
          </button>
        </div>
      </div>
      {/* This the the weather details page */}
      <WeatherDetails {...tempInfo} />
    </>
  );
}

export default SearchMain;
