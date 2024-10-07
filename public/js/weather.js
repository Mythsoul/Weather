document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector(".search-form");
    const mainText = document.querySelector(".main-text");
  
    form.addEventListener("submit", async function (e) {
      e.preventDefault(); 
  
      const searchInput = document.querySelector(".Search").value;
      const apiKey = "1c7a8384f7b1bd29fdaae24cf6156eac";
      
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
        mainText.textContent = error.message; 
      }
    });
  
    function displayWeather(data) {
      const cityName = data.name;
      const temperature = data.main.temp;
      const weatherDescription = "rain  ";
  
      mainText.textContent = `Weather in ${cityName}: ${temperature}°C, ${weatherDescription}`;
      switch (weatherDescription) {
        case "rain":
            document.querySelector(".image-1").src = "images/rain.png";
            break;
        case "clear":
            document.querySelector(".image-1").src = "images/clear.png";
            break;
        case "clouds":
            document.querySelector(".image-1").src = "images/clouds.png";
            break;
        case "snow":
            document.querySelector(".image-1").src = "images/snow.png";
            break;
        case "thunderstorm":
            document.querySelector(".image-1").src = "images/drizzle.png";
            break;
        default:
            document.querySelector(".image-1").src = "images/wind.png";
      }
    }
  });
  