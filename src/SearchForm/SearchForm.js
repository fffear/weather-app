import fetchWeatherData from "../fetchWeatherData";
import processWeatherData from "../processWeatherData";
import Input from "./Input/Input";
import Events from "../EventPubSub/EventPubSub";
import containerClass from "../Container/container.css";
import searchFormClass from "./SearchForm.css";

let searchForm = (() => {
  const form = document.createElement("form");
  form.classList.add(searchFormClass.searchForm);
  const container = document.querySelector(`.${containerClass.container}`);

  const cityInput = Input({
    inputtype: "input",
    id: "city",
    type: "text",
    name: "city",
    placeholder: "City"
  });

  const submitBtn = document.createElement("button");
  submitBtn.textContent = "Search";
  submitBtn.classList.add(searchFormClass.searchBtn);

  form.appendChild(cityInput);
  form.appendChild(submitBtn);

  container.appendChild(form);

  form.addEventListener("submit", processData);

  async function processData(e) {
    e.preventDefault();
    const weatherData = await fetchWeatherData(e.target[0].value);
    Events.emit("displayWeather", processWeatherData.relevantData(weatherData));
  }
})();

export default searchForm;
