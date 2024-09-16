document
  .getElementById("fetchWeatherBtn")
  .addEventListener("click", function () {
    const location = document.getElementById("locationInput").value;
    if (location) {
      fetchWeatherData(location);
    } else {
      alert("Please enter a location");
    }
  });

function fetchWeatherData(location) {
  const apiKey = "dda73fcdf6d5b409e4da0023c64c4eb7"; // Ersetze dies mit deinem echten API-Schlüssel
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      displayWeather(data);
    })
    .catch((error) => {
      console.error(
        "There has been a problem with your fetch operation:",
        error
      );
      document.getElementById("weatherDisplay").innerHTML =
        "<p>Error fetching weather data</p>";
    });
}

function displayWeather(data) {
    
  const weatherDisplay = document.getElementById("weatherDisplay");
  weatherDisplay.innerHTML = `
        <h2>Weather in ${data.name}</h2>
        <p>Temperature: ${data.main.temp}°C</p>
        <p>Weather: ${data.weather[0].description}</p>
    `;
}
