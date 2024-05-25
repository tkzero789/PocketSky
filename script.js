const container = document.querySelector(".container");
const search = document.querySelector(".search-box button");
const form = document.querySelector("form");
const weatherBox = document.querySelector(".weather-box");
const weatherDetails = document.querySelector(".weather-details");
const notFound = document.querySelector(".not-found");
const cityName = document.querySelector(".city-name");
const switchImperial = document.querySelector(".unit-switch-imperial");
const switchMetric = document.querySelector(".unit-switch-metric");
const weatherOpt = document.querySelector(".weather-options");

// Fetch function
async function fetchWeater(unit) {
  switchMetric.disabled = true;
  switchImperial.disabled = true;
  const APIKey = "681e1c47b7529bb804b6026546154c55";
  const city = document.querySelector(".search-box input").value;

  if (city === "") return;

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${APIKey}`
    );
    const json = await response.json();
    console.log(json);

    if (json.cod == "404") {
      cityName.textContent = city;
      container.style.height = "555px";
      weatherBox.classList.remove("active");
      weatherDetails.classList.remove("active");
      notFound.classList.add("active");
      search.disabled = false;
      return;
    }

    const background = document.querySelector(".weather-bg");
    const img = document.querySelector(".weather-box img");
    const temp = document.querySelector(".weather-box .temperature");
    const desc = document.querySelector(".weather-box .description");
    const humid = document.querySelector(".weather-details .humidity span");
    const wind = document.querySelector(".weather-details .wind span");

    cityName.textContent = city;
    weatherOpt.classList.add("active");
    cityName.innerHTML = "City: " + city;
    container.style.height = "555px";
    container.classList.add("active");
    weatherBox.classList.add("active");
    weatherDetails.classList.add("active");
    notFound.classList.remove("active");

    setTimeout(() => {
      container.classList.remove("active");
      search.disabled = false;
      switchMetric.disabled = false;
      switchImperial.disabled = false;
    }, 2500);

    switch (json.weather[0].main) {
      case "Clear":
        img.src = "./assets/img/clear.png";
        background.classList.add("bright");
        background.classList.remove("dark");

        break;

      case "Clouds":
        img.src = "./assets/img/cloud.png";
        background.classList.add("bright");
        background.classList.remove("dark");
        break;

      case "Mist":
      case "Haze":
        img.src = "./assets/img/mist.png";
        background.classList.add("dark");
        background.classList.remove("bright");
        break;

      case "Rain":
        img.src = "./assets/img/rain.png";
        background.classList.add("dark");
        background.classList.remove("bright");
        break;

      case "Snow":
        img.src = "./assets/img/snow.png";
        background.classList.add("dark");
        background.classList.remove("bright");
        break;

      default:
        img.src = "./assets/img/cloud.png";
        break;
    }

    temp.innerHTML = `${parseInt(json.main.temp)}<span>${
      unit === "metric" ? "°C" : "°F"
    }</span>`;
    desc.innerHTML = `${json.weather[0].description}`;
    humid.innerHTML = `${json.main.humidity}%`;
    wind.innerHTML = `${parseInt(json.wind.speed)} ${
      unit === "metric" ? "km/h" : "mph"
    }`;

    // Clone (for transition animation)
    const weatherInfo = document.querySelector(`.weather-info`);
    const humidInfo = document.querySelector(`.humid-info`);
    const windInfo = document.querySelector(`.wind-info`);

    const elCloneWeatherInfo = weatherInfo.cloneNode(true);
    const elCloneHumidInfo = humidInfo.cloneNode(true);
    const elCloneWindInfo = windInfo.cloneNode(true);

    elCloneWeatherInfo.id = "clone-weather-info";
    elCloneWeatherInfo.classList.add("active-clone");

    elCloneHumidInfo.id = "clone-humid-info";
    elCloneHumidInfo.classList.add("active-clone");

    elCloneWindInfo.id = "clone-wind-info";
    elCloneWindInfo.classList.add("active-clone");

    setTimeout(() => {
      weatherInfo.insertAdjacentElement("afterend", elCloneWeatherInfo);
      humidInfo.insertAdjacentElement("afterend", elCloneHumidInfo);
      windInfo.insertAdjacentElement("afterend", elCloneWindInfo);
    }, 2200);

    const cloneWeatherInfo = document.querySelectorAll(
      ".weather-info.active-clone"
    );
    const totalCloneWeatherInfo = cloneWeatherInfo.length;
    const cloneWeatherInfoSub = cloneWeatherInfo[0];

    const cloneHumidInfo = document.querySelectorAll(
      ".humid-info.active-clone"
    );
    const cloneHumidInfoSub = cloneHumidInfo[0];

    const cloneWindInfo = document.querySelectorAll(".wind-info.active-clone");
    const cloneWindInfoSub = cloneWindInfo[0];

    if (totalCloneWeatherInfo > 0) {
      cloneWeatherInfoSub.classList.remove("active-clone");
      cloneHumidInfoSub.classList.remove("active-clone");
      cloneWindInfoSub.classList.remove("active-clone");

      setTimeout(() => {
        cloneWeatherInfoSub.remove();
        cloneHumidInfoSub.remove();
        cloneWindInfoSub.remove();
      }, 2200);
    }
  } catch (error) {
    console.error(error);
  }
}

// Switch to imperial unit
switchImperial.addEventListener("click", async (event) => {
  event.preventDefault();
  fetchWeater("imperial");
});

// Switch to metric unit
switchMetric.addEventListener("click", async (event) => {
  event.preventDefault();
  fetchWeater("metric");
});

search.addEventListener("click", async (event) => {
  event.preventDefault();
  search.disabled = true;
  fetchWeater("metric");
  document.activeElement.blur();
});
