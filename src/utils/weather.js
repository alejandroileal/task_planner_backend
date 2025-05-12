// utils/weather.js
import fetch from "node-fetch";

export const fetchWeather = async (date, apiKey) => {
  try {
    const eventDate = new Date(date);
    const timestamp = Math.floor(eventDate.getTime() / 1000);

    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=40.4165&lon=-3.70256&appid=${apiKey}&units=metric&lang=es`
    );

    const { list } = await response.json();

    let closestData = list[0];
    let closestDiff = Math.abs(list[0].dt - timestamp);

    for (const item of list) {
      const diff = Math.abs(item.dt - timestamp);
      if (diff < closestDiff) {
        closestDiff = diff;
        closestData = item;
      }
    }

    return {
      temp: closestData.main.temp,
      temp_min: closestData.main.temp_min,
      temp_max: closestData.main.temp_max,
      description: closestData.weather[0].description,
      icon: closestData.weather[0].icon,
    };
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return null;
  }
};
