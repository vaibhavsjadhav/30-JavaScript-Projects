// Define the API key for accessing the OpenWeatherMap API
const apiKey = "75f93bca81d716dff4845e8e272cff11";

// Define the base URL for the OpenWeatherMap API endpoint
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

// Select the input element for searching cities
const searchBox = document.querySelector(".search input");

// Select the button element for initiating the search
const searchBtn = document.querySelector(".search button");

// Select the element where the weather icon will be displayed
const weatherIcon = document.querySelector(".weather-icon");

// Define an asynchronous function to check the weather for a given city
async function checkWeather(city) {
  // Fetch weather data for the specified city from the OpenWeatherMap API
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

  // If the response indicates that the city was not found (404 status code)
  if (response.status == 404) {
    // Display an error message indicating that the city was not found
    document.querySelector(".error").style.display = "block";

    // Hide the weather information display
    document.querySelector(".weather").style.display = "none";
  } else {
    // If the city was found, parse the JSON response
    let data = await response.json();

    // Display the name of the city
    document.querySelector(".city").innerHTML = data.name;

    // Display the temperature in Celsius
    document.querySelector(".temp").innerHTML =
      Math.round(data.main.temp) + "°c";

    // Display the humidity percentage
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";

    // Display the wind speed in kilometers per hour
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

    // Set the weather icon based on the weather conditions
    if (data.weather[0].main == "Clouds") {
      weatherIcon.src = "images/clouds.png";
    } else if (data.weather[0].main == "Clear") {
      weatherIcon.src = "images/clear.png";
    } else if (data.weather[0].main == "Rain") {
      weatherIcon.src = "images/rain.png";
    } else if (data.weather[0].main == "Drizzle") {
      weatherIcon.src = "images/drizzle.png";
    } else if (data.weather[0].main == "Mist") {
      weatherIcon.src = "images/mist.png";
    }

    // Display the weather information
    document.querySelector(".weather").style.display = "block";

    // Hide the error message if previously displayed
    document.querySelector(".error").style.display = "none";
  }
}

// Add an event listener to the search button to trigger weather check
searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value);
});
