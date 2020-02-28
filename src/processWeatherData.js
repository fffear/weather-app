const processWeatherData = (() => {
  const convertCelcius = temperature => {
    return parseFloat(temperature - 273.15).toFixed(2);
  };

  const convertFahrenheit = temperature => {
    return parseFloat(temperature * (9 / 5) - 459.67).toFixed(2);
  };

  const celciusFormatter = temperature => {
    return `${temperature} \xB0C`;
  };

  const fahrenheitFormatter = temperature => {
    return `${temperature} \xB0F`;
  };

  const relevantData = weatherData => {
    if (weatherData === null || weatherData.message === "city not found") {
      return null;
    } else {
      return {
        city: weatherData.name,
        country: weatherData.sys.country,
        icon: weatherData.weather[0].icon,
        currentTemp: weatherData.main.temp,
        maxTemp: weatherData.main.temp_max,
        minTemp: weatherData.main.temp_min,
        feelsLike: weatherData.main.feels_like,
        condition: weatherData.weather[0].main
      };
    }
  };

  return {
    relevantData,
    convertCelcius,
    convertFahrenheit,
    celciusFormatter,
    fahrenheitFormatter
  };
})();

export default processWeatherData;
