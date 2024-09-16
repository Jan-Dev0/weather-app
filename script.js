const apiKey = "dda73fcdf6d5b409e4da0023c64c4eb7";
const weatherUrl = "https://api.openweathermap.org/data/2.5/weather";
const forecastUrl = "https://api.openweathermap.org/data/2.5/forecast";

// Select elements
const cityInput = document.getElementById("cityInput");
const fetchWeatherBtn = document.getElementById("fetchWeatherBtn");

async function fetchWeatherData(city) {
  try {
    const response = await fetch(
      `${weatherUrl}?q=${city}&appid=${apiKey}&units=metric`
    );
    if (!response.ok) throw new Error("Network response was not ok");
    const data = await response.json();
    displayWeatherData(data);
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
}

async function fetchForecastData(city) {
  try {
    const response = await fetch(
      `${forecastUrl}?q=${city}&appid=${apiKey}&units=metric`
    );
    if (!response.ok) throw new Error("Network response was not ok");
    const data = await response.json();
    displayForecastData(data);
  } catch (error) {
    console.error("Error fetching forecast data:", error);
  }
}

function displayWeatherData(data) {
  const iconCode = data.weather[0].icon; // Icon-Code aus der API-Antwort
  const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`; // Icon-URL

  const dayName = new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(
    new Date(data.dt * 1000)
  );
  const monthDate = new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
  }).format(new Date(data.dt * 1000));
  const temperature = Math.round(data.main.temp);
  const condition = data.weather[0].description;
  const windSpeed = data.wind.speed;
  const humidity = data.main.humidity;

  document.getElementById("weather").innerHTML = `
    <div class="weather-app__current-left">
      <div class="weather-app__current-date">
        <h2 class="weather-app__current-day">${dayName}</h2>
        <p class="weather-app__current-month-date">${monthDate}</p>
      </div>
      <div class="weather-app__current-info">
        <div class="weather-app__current-temperature">
          <h3 class="weather-app__current-temp">${temperature}°C</h3>
          <p class="weather-app__current-condition">${condition}</p>
        </div>
        <div class="weather-app__current-icon">
          <img src="${iconUrl}" alt="Weather Icon" />
        </div>
      </div>
    </div>
    <div class="weather-app__current-right">
      <div class="weather-app__current-details">
        <p class="weather-app__current-wind">Wind: ${windSpeed} km/h</p>
        <p class="weather-app__current-humidity">Humidity: ${humidity}%</p>
      </div>
    </div>
  `;
}

function displayForecastData(data) {
  const forecastList = document.getElementById("forecastList");
  forecastList.innerHTML = ""; // Clear previous forecasts

  data.list.forEach((entry, index) => {
    // Displaying data for 5 days, every 8th entry (3-hour intervals)
    if (index % 8 === 0) {
      const listItem = document.createElement("li");
      listItem.classList.add("weather-app__forecast-item");

      const temp = entry.main.temp.toFixed(0); // Remove decimal places

      listItem.innerHTML = `
        <div class="weather-app__forecast-item-content">
          <div class="weather-app__forecast-day">${new Date(
            entry.dt * 1000
          ).toLocaleDateString("en-US", { weekday: "short" })}</div>
          <img src="https://openweathermap.org/img/wn/${
            entry.weather[0].icon
          }.png" alt="Weather Icon" class="weather-app__forecast-icon">
          <div class="weather-app__forecast-temp">${temp}°C</div>
          <div class="weather-app__forecast-condition">${
            entry.weather[0].description
          }</div>
        </div>
      `;
      forecastList.appendChild(listItem);
    }
  });
}




// Event listener for fetching weather data
fetchWeatherBtn.addEventListener("click", function () {
  const city = cityInput.value;
  if (city) {
    fetchWeatherData(city);
    fetchForecastData(city);
  }
});
