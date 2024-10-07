document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector(".search-form");
  const information = document.querySelector(".weather-info");
  const temperatureElement = document.querySelector(".temperature");
  const conditionElement = document.querySelector(".condition");
  const humidityElement = document.querySelector(".humidity");
  const windSpeedElement = document.querySelector(".wind-speed");
  const city= document.querySelector(".city-name");

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const searchInput = document.querySelector(".Search").value;
    const apiKey = "nope";

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${searchInput}&appid=${apiKey}&units=metric`
      );

      if (!response.ok) {
        throw new Error("City not found");
      }

      const data = await response.json();
      console.log(data);
      displayWeather(data);
    } catch (error) {
      console.log(error);
    }
  });

  function displayWeather(data) {
    const cityName = data.name;
    const temperature = data.main.temp;
    const weatherDescription = data.weather[0].description;

    city.textContent = `${data.name}`;
    temperatureElement.textContent = `${temperature}°C`;
    conditionElement.textContent = `${weatherDescription}`;
    humidityElement.textContent = `Humidity: ${data.main.humidity}%`;
    windSpeedElement.textContent = `Wind Speed: ${data.wind.speed} m/s`;
    information.style.display = "block";
    console.log(cityName + temperature + weatherDescription);
  }
});


