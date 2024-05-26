const container = document.querySelector(".container");
const homeLogo = document.querySelector(".home-logo");
const searchInput = document.querySelector(".search-box input");
const form = document.querySelector("form");
const weatherBox = document.querySelector(".weather-box");
const weatherDetails = document.querySelector(".weather-details");
const notFound = document.querySelector(".city-not-found");
const cityName = document.querySelector(".city-name");
const cityCountry = document.querySelector(".city-country");
const switchImperial = document.querySelector(".unit-switch-imperial");
const switchMetric = document.querySelector(".unit-switch-metric");
const weatherOpt = document.querySelector(".weather-options");
const moreWeatherDetails = document.querySelector(".more-weather-details");
const moreDetailBtn = document.querySelector(".more-detail-btn");
const moreDetailsGroup = document.querySelector(".more-details-group");
const lessDetailBtn = document.querySelector(".less-detail-btn");
const searchResult = document.querySelector(".search-results");
const eachCity = document.querySelector(".search-results-wrapper ul li");

// Fetch function 2
async function fetchWeater2(cityId, unit) {
  switchMetric.disabled = true;
  switchImperial.disabled = true;
  const APIKey = "681e1c47b7529bb804b6026546154c55";
  const city = document.querySelector(".search-box input").value;

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?id=${cityId}&units=${unit}&appid=${APIKey}`
    );
    const json = await response.json();
    console.log(json);

    if (json.cod == "404") {
      homeLogo.classList.add("resize");
      cityName.textContent = "N/A";
      cityCountry.textContent = "N/A";
      container.style.height = "420px";
      weatherBox.classList.remove("active");
      weatherDetails.classList.remove("active");
      notFound.classList.add("active");
      moreDetailBtn.classList.remove("active");
      moreDetailsGroup.classList.remove("active");
      lessDetailBtn.classList.remove("active");
      return;
    }

    const background = document.querySelector(".weather-bg");
    const img = document.querySelector(".weather-box img");
    const temp = document.querySelector(".weather-box .temperature");
    const desc = document.querySelector(".weather-box .description");
    const humid = document.querySelector(".weather-details .humidity span");
    const wind = document.querySelector(".weather-details .wind span");
    const tempHigh = document.querySelector(".more-details-data .temp-high");
    const tempLow = document.querySelector(".more-details-data .temp-low");
    const pressure = document.querySelector(".more-details-data .pressure");
    const visibility = document.querySelector(".more-details-data .visibility");

    homeLogo.classList.add("resize");
    cityName.textContent = city;
    cityName.innerHTML = "City: " + city;
    cityCountry.innerHTML = `Country: ${json.sys.country}`;
    container.style.height = "556px";
    container.classList.add("active");
    weatherOpt.classList.add("active");
    weatherBox.classList.add("active");
    weatherDetails.classList.add("active");
    moreDetailBtn.classList.add("active");
    notFound.classList.remove("active");
    moreDetailBtn.classList.remove("hidden");
    moreDetailsGroup.classList.remove("active");
    lessDetailBtn.classList.remove("active");

    setTimeout(() => {
      container.classList.remove("active");
      switchMetric.disabled = false;
      switchImperial.disabled = false;
    }, 2500);

    switch (json.weather[0].main) {
      case "Clear":
        img.src = "./assets/img/clear-day.svg";
        background.classList.add("bright");
        background.classList.remove("dark");

        break;

      case "Clouds":
        img.src = "./assets/img/partly-cloudy-day.svg";
        background.classList.add("bright");
        background.classList.remove("dark");
        break;

      case "Mist":
      case "Haze":
        img.src = "./assets/img/fog.svg";
        background.classList.add("dark");
        background.classList.remove("bright");
        break;

      case "Rain":
        img.src = "./assets/img/rain.svg";
        background.classList.add("dark");
        background.classList.remove("bright");
        break;

      case "Thunderstorm":
        img.src = "./assets/img/thunderstorms-rain.svg";
        background.classList.add("dark");
        background.classList.remove("bright");
        break;

      case "Snow":
        img.src = "./assets/img/snow.svg";
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
    tempHigh.innerHTML = `${parseInt(json.main.temp_max)}<span>°</span> / `;
    tempLow.innerHTML = `${parseInt(json.main.temp_min)}<span>°</span>`;
    pressure.innerHTML = `${(json.main.pressure * 0.0295).toFixed(
      2
    )} <span>in</span>`;
    visibility.innerHTML = `${(
      json.visibility / (unit === "metric" ? 1000 : 1609.34)
    ).toFixed(2)}<span> ${unit === "metric" ? "km" : "mi"}</span>`;

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

let selectedCityId = null;
// Input
searchInput.addEventListener("input", async () => {
  const APIKey = "681e1c47b7529bb804b6026546154c55";
  const city = document.querySelector(".search-box input").value;
  searchResult.classList.remove("hidden");

  if (city === "") {
    searchResult.classList.add("hidden");
    return;
  }

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/find?q=${city}&appid=${APIKey}`
    );
    const json = await response.json();
    console.log(json.list);

    // Get the .search-results-wrapper div
    const searchResultsWrapper = document.querySelector(
      ".search-results-wrapper"
    );

    // Clear the .search-results-wrapper div's content
    searchResultsWrapper.innerHTML = "";

    // Create a new ul element
    const ul = document.createElement("ul");

    // For each city, create an li element and append it to the ul
    json.list.forEach((city) => {
      const li = document.createElement("li");

      const span1 = document.createElement("span");
      span1.textContent = `${city.name}`;

      const spanDash = document.createElement("span");
      spanDash.textContent = `-`;

      const span2 = document.createElement("span");
      span2.textContent = `${city.sys.country}`;

      const span3 = document.createElement("span");
      span3.textContent = `${city.coord.lat}, ${city.coord.lon}`;

      li.appendChild(span1);
      li.appendChild(spanDash);
      li.appendChild(span2);
      li.appendChild(span3);

      li.addEventListener("click", () => {
        selectedCityId = city.id;
        fetchWeater2(selectedCityId, "imperial");
        searchResult.classList.add("hidden");
      });

      ul.appendChild(li);
    });

    // Append the ul to the .search-results-wrapper div
    searchResultsWrapper.appendChild(ul);
  } catch (error) {
    console.error(error);
  }
});

// Switch to metric unit
switchMetric.addEventListener("click", async (event) => {
  event.preventDefault();
  if (selectedCityId) {
    fetchWeater2(selectedCityId, "metric");
  } else {
    console.log("No city selected yet");
  }
});

// Switch to imperial unit
switchImperial.addEventListener("click", async (event) => {
  event.preventDefault();
  if (selectedCityId) {
    fetchWeater2(selectedCityId, "imperial");
  } else {
    console.log("No city selected yet");
  }
});

// More details
moreDetailBtn.addEventListener("click", (event) => {
  event.preventDefault;
  container.style.height = "680px";

  moreDetailBtn.classList.add("hidden");

  moreDetailsGroup.classList.add("active");
  lessDetailBtn.classList.add("active");
});

// Less details
lessDetailBtn.addEventListener("click", (event) => {
  event.preventDefault;
  container.style.height = "556px";

  moreDetailBtn.classList.remove("hidden");

  moreDetailsGroup.classList.remove("active");
  lessDetailBtn.classList.remove("active");
});
