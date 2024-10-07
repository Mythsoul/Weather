document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("#weather-form");
    const information = document.querySelector("#weather-info");
    const temperatureElement = document.querySelector(".temperature");
    const conditionElement = document.querySelector(".condition");
    const humidityElement = document.querySelector(".humidity");
    const windSpeedElement = document.querySelector(".wind-speed");
    const city = document.querySelector(".city-name");
    const searchInput = document.querySelector(".Search");
    const suggestionsContainer = document.querySelector(".suggestions");
    
  

    // Fetch the cities from the JSON file
    fetch("cities.json")
        .then((response) => response.json())
        .then((data) => {
            cities = data.cities; // Assign the cities from the JSON to the array
        })
        .catch((error) => {
            console.error("Error fetching cities:", error);
        });

    form.addEventListener("submit", async function (e) {
        e.preventDefault();
        const searchInputValue = searchInput.value.trim();
        const apiKey = "1c7a8384f7b1bd29fdaae24cf6156eac";

        try {
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${searchInputValue}&appid=${apiKey}&units=metric`
            );

            if (!response.ok) {
                throw new Error("City not found");
            }

            const data = await response.json();
            displayWeather(data);
        } catch (error) {
            console.log(error);
            alert(error.message); // Show an alert for better user experience
        }
    });

    function displayWeather(data) {
        const cityName = data.name;
        const temperature = data.main.temp;
        const weatherDescription = data.weather[0].description;

        // Clear previous weather information
        city.textContent = `${cityName}`;
        temperatureElement.textContent = `${temperature}°C`;
        conditionElement.textContent = `${weatherDescription}`;
        humidityElement.textContent = `Humidity: ${data.main.humidity}%`;
        windSpeedElement.textContent = `Wind Speed: ${data.wind.speed} m/s`;
        information.style.display = "block";

        // Set background image based on weather description
        document.body.style.backgroundImage = `url(images/${weatherDescription}.png)`;
    }

    searchInput.addEventListener("input", function () {
        const query = searchInput.value.toLowerCase();
        suggestionsContainer.innerHTML = ""; // Clear previous suggestions

        if (query) {
            const filteredCities = cities.filter((city) =>
                city.toLowerCase().includes(query)
            );

            displaySuggestions(filteredCities);
        } else {
            suggestionsContainer.style.display = "none"; // Hide suggestions if input is empty
        }
    });

    function displaySuggestions(suggestions) {
        suggestionsContainer.innerHTML = suggestions
            .map(s => `<div class="suggestion-item cursor-pointer p-2 hover:bg-gray-200">${s}</div>`)
            .join('');
        suggestionsContainer.style.display = suggestions.length ? "block" : "none";
    }

    suggestionsContainer.addEventListener("click", function (e) {
        if (e.target.classList.contains("suggestion-item")) {
            searchInput.value = e.target.textContent; // Set input to selected suggestion
            suggestionsContainer.style.display = "none"; // Hide suggestions
            form.dispatchEvent(new Event('submit')); // Trigger the form submission
        }
    });
});
