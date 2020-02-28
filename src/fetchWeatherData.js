const fetchWeatherData = async city => {
  const weatherResponse = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=7a9c0cc9f0d0ac4ee9351db63fcf3eb6`,
    { mode: "cors" }
  );
  const weatherData = await weatherResponse.json();
  return weatherData;
};

export default fetchWeatherData;
