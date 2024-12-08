async function fetchWeather(location) {
  const response = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=a65937ec19c544bd8f7112656240812&q=${location}&days=3`,
    {
      mode: "cors",
    }
  );

  if (response.status === 400) {
    throwErrorMsg();
  } else {
    const error = document.querySelector(".error-msg");
    error.style.display = "none";
    const responseJson = await response.json();
    const data = findImportantData(responseJson);
    displayData(data);
  }
}

function throwErrorMsg() {
  const error = document.querySelector(".error-msg");
  error.style.display = "block";
  if (error.classList.contains("fade-in")) {
    error.style.display = "none";
    error.classList.remove("fade-in2");
    error.offsetWidth;
    error.classList.add("fade-in");
    error.style.display = "block";
  } else {
    error.classList.add("fade-in");
  }
}

function findImportantData(data) {
  const location =
    data["location"]["name"] + ", " + data["location"]["country"];

  // Today Data
  const currentCondition = data["current"]["condition"]["text"];
  const currentTemp = data["current"]["temp_c"];
  const currentFeelLike = data["current"]["feelslike_c"];
  const currentWind = data["current"]["wind_kph"];
  const currentHumidity = data["current"]["humidity"];

  //   // Forecast Data
  //   const forecastData = data["forecast"]["forecastday"]
  //     .slice(1)
  //     .map((forecast) => ({
  //       date: forecast["date"],
  //       condition: forecast["day"]["condition"]["text"],
  //       avgTemp: forecast["day"]["avgtemp_c"],
  //       willItRain: forecast["day"]["daily_will_it_rain"],
  //       maxWind: forecast["day"]["maxwind_kph"],
  //       avgHumidity: forecast["day"]["avghumidity"],
  //     }));

  const result = {
    location,
    today: {
      currentCondition,
      currentTemp,
      currentFeelLike,
      currentWind,
      currentHumidity,
    },
    // forecast: forecastData,
  };

  return result;
}

function displayData(data) {
  const today = document.querySelector(".today");
  today.textContent = "";
  // make fadein2 work again
  if (today.classList.contains("fade-in2")) {
    today.style.display = "none";
    today.classList.remove("fade-in2");
    today.offsetWidth;
    today.classList.add("fade-in2");
    today.style.display = "block";
  } else {
    today.classList.add("fade-in2");
  }

  const info = document.createElement("div");
  info.classList.add("info");
  const condition = document.createElement("p");
  condition.textContent = data.today.currentCondition;
  condition.classList.add("condition");
  const location = document.createElement("h1");
  location.textContent = data.location;
  location.classList.add("location");
  const temp = document.createElement("span");
  temp.textContent = Math.round(data.today.currentTemp);
  temp.classList.add("degrees");

  info.appendChild(condition);
  info.appendChild(location);
  info.appendChild(temp);

  const details = document.createElement("div");
  details.classList.add("weather-details");
  const feelLike = document.createElement("h3");
  feelLike.textContent = `FEEL LIKE: ${Math.round(data.today.currentFeelLike)}`;
  feelLike.classList.add("feels-like");

  const wind = document.createElement("h3");
  wind.textContent = `WIND: ${data.today.currentWind} KMH`;
  wind.classList.add("wind");

  const humidity = document.createElement("h3");
  humidity.textContent = `HUMIDITY: ${data.today.currentHumidity}`;
  humidity.classList.add("humidity");

  details.appendChild(feelLike);
  details.appendChild(wind);
  details.appendChild(humidity);

  today.appendChild(info);
  today.appendChild(details);
}

const form = document.querySelector("form");
form.addEventListener("submit", (e) => {
  console.log("in");
  e.preventDefault();
  const location = form.city.value;
  fetchWeather(location);
});

window.onload(fetchWeather("Cambodia"));
