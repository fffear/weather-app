import Events from "../EventPubSub/EventPubSub";
import processWeatherData from "../processWeatherData";
import containerClass from "../Container/container.css";
import reportClass from "./Report.css";

const Report = (() => {
  let unit = "fahrenheit";
  let currentData = null;

  const container = document.querySelector(`.${containerClass.container}`);
  const reportDiv = document.createElement("div");
  reportDiv.classList.add(reportClass.report);
  const locationDiv = document.createElement("div");
  locationDiv.classList.add(reportClass.location);
  const weatherConditionDiv = document.createElement("div");
  weatherConditionDiv.classList.add(reportClass.weatherCondition);
  const currentTempDiv = document.createElement("div");
  currentTempDiv.classList.add(reportClass.currentTemp);
  const feelsLikeDiv = document.createElement("div");
  feelsLikeDiv.classList.add(reportClass.feelsLike);
  const TempRangeDiv = document.createElement("div");
  TempRangeDiv.classList.add(reportClass.tempRange);

  reportDiv.appendChild(locationDiv);

  const weatherConditionDescriptionSpan = document.createElement("span");
  weatherConditionDescriptionSpan.classList.add(
    reportClass.weatherConditionDescription
  );
  const weatherConditionIconSpan = document.createElement("span");
  weatherConditionIconSpan.classList.add(reportClass.weatherConditionIconSpan);

  const weatherIcon = document.createElement("img");
  weatherConditionDiv.appendChild(weatherConditionDescriptionSpan);
  weatherConditionIconSpan.appendChild(weatherIcon);
  weatherConditionDiv.appendChild(weatherConditionIconSpan);
  reportDiv.appendChild(weatherConditionDiv);

  reportDiv.appendChild(currentTempDiv);

  reportDiv.appendChild(feelsLikeDiv);

  const minTempSpan = document.createElement("span");
  minTempSpan.classList.add(reportClass.minTemp);
  TempRangeDiv.appendChild(minTempSpan);
  const maxTempSpan = document.createElement("span");
  maxTempSpan.classList.add(reportClass.maxTemp);
  TempRangeDiv.appendChild(maxTempSpan);
  reportDiv.appendChild(TempRangeDiv);

  const celciusBtn = document.createElement("button");
  celciusBtn.classList.add(reportClass.celciusBtn);
  celciusBtn.textContent = "Celcius";
  reportDiv.appendChild(celciusBtn);
  const fahrenheitBtn = document.createElement("button");
  fahrenheitBtn.classList.add(reportClass.fahrenheitBtn);
  fahrenheitBtn.textContent = "Fahrenheit";
  reportDiv.appendChild(fahrenheitBtn);

  container.appendChild(reportDiv);

  const setCurrentData = data => {
    currentData = data;
  };

  const displayCelciusTemp = data => {
    if (data) {
      locationDiv.textContent = `${data.city}, ${data.country}`;
      weatherConditionDescriptionSpan.textContent = data.condition;
      weatherIcon.src = `https://openweathermap.org/img/wn/${data.icon}@2x.png`;
      weatherIcon.classList.add(reportClass.weatherIcon);
      currentTempDiv.textContent = processWeatherData.celciusFormatter(
        processWeatherData.convertCelcius(data.currentTemp)
      );
      feelsLikeDiv.textContent = `Feels like ${processWeatherData.celciusFormatter(
        processWeatherData.convertCelcius(data.feelsLike)
      )}`;
      minTempSpan.textContent = `Min: ${processWeatherData.celciusFormatter(
        processWeatherData.convertCelcius(data.minTemp)
      )}`;
      maxTempSpan.textContent = `Max: ${processWeatherData.celciusFormatter(
        processWeatherData.convertCelcius(data.maxTemp)
      )}`;
    } else {
      locationDiv.textContent = `--------, --`;
      weatherConditionDescriptionSpan.textContent = "--------";
      weatherIcon.src = "";
      weatherIcon.classList.remove(reportClass.weatherIcon);
      currentTempDiv.textContent = processWeatherData.celciusFormatter("--");
      feelsLikeDiv.textContent = `Feels like ${processWeatherData.celciusFormatter(
        "--"
      )}`;
      minTempSpan.textContent = `Min: ${processWeatherData.celciusFormatter(
        "--"
      )}`;
      maxTempSpan.textContent = `Max: ${processWeatherData.celciusFormatter(
        "--"
      )}`;
    }
  };

  const displayFahrenheitTemp = data => {
    if (data) {
      locationDiv.textContent = `${data.city}, ${data.country}`;
      weatherConditionDescriptionSpan.textContent = currentData.condition;
      weatherIcon.src = `https://openweathermap.org/img/wn/${data.icon}@2x.png`;
      weatherIcon.classList.add(reportClass.weatherIcon);
      currentTempDiv.textContent = processWeatherData.fahrenheitFormatter(
        processWeatherData.convertFahrenheit(data.currentTemp)
      );
      feelsLikeDiv.textContent = `Feels like ${processWeatherData.fahrenheitFormatter(
        processWeatherData.convertFahrenheit(data.feelsLike)
      )}`;
      minTempSpan.textContent = `Min: ${processWeatherData.fahrenheitFormatter(
        processWeatherData.convertFahrenheit(data.minTemp)
      )}`;
      maxTempSpan.textContent = `Max: ${processWeatherData.fahrenheitFormatter(
        processWeatherData.convertFahrenheit(data.maxTemp)
      )}`;
    } else {
      locationDiv.textContent = `--------, --`;
      weatherConditionDescriptionSpan.textContent = "--------";
      weatherIcon.src = "";
      weatherIcon.classList.remove(reportClass.weatherIcon);
      currentTempDiv.textContent = processWeatherData.fahrenheitFormatter("--");
      feelsLikeDiv.textContent = `Feels like ${processWeatherData.fahrenheitFormatter(
        "--"
      )}`;
      minTempSpan.textContent = `Min: ${processWeatherData.fahrenheitFormatter(
        "--"
      )}`;
      maxTempSpan.textContent = `Max: ${processWeatherData.fahrenheitFormatter(
        "--"
      )}`;
    }
  };

  const displayData = async data => {
    setCurrentData(data);

    if (unit === "celcius" && currentData !== null) {
      displayCelciusTemp(currentData);
    } else if (unit === "fahrenheit" && currentData !== null) {
      displayFahrenheitTemp(currentData);
    } else if (unit === "celcius") {
      displayCelciusTemp(null);
    } else if (unit === "fahrenheit") {
      displayFahrenheitTemp(null);
    }
  };

  celciusBtn.addEventListener("click", e => {
    unit = "celcius";
    displayCelciusTemp(currentData);
  });

  fahrenheitBtn.addEventListener("click", e => {
    unit = "fahrenheit";
    displayFahrenheitTemp(currentData);
  });

  Events.on("displayWeather", displayData);

  return { displayData };
})();

export default Report;
