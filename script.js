const apiKey = "65103a86d5b43e5a7936c5abd15238e8";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const weatherContainer = document.getElementById("weatherContainer");
const weatherIcon = document.getElementById("weatherIcon");
const temperature = document.getElementById("temperature");
const cityName = document.getElementById("cityName");
const humidity = document.getElementById("humidity");
const windSpeed = document.getElementById("windSpeed");
const errorContainer = document.getElementById("errorContainer");

async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    if (response.status == 404) {
        errorContainer.style.display = "block";
        weatherContainer.style.display = "none";
    } else {
        var data = await response.json();

        console.log(data);
        cityName.innerHTML = data.name;
        temperature.innerHTML = Math.round(data.main.temp) + "°c";
        humidity.innerHTML = data.main.humidity + "%";
        windSpeed.innerHTML = data.wind.speed + " km/h";

        if (data.weather[0].main == "Clouds") {
            weatherIcon.src = "img/clouds.png";
        } else if (data.weather[0].main == "Clear") {
            weatherIcon.src = "img/clear.png";
        } else if (data.weather[0].main == "Rain") {
            weatherIcon.src = "img/rain.png";
        } else if (data.weather[0].main == "Drizzle") {
            weatherIcon.src = "img/drizzle.png";
        } else if (data.weather[0].main == "Mist") {
            weatherIcon.src = "img/mist.png";
        }

        weatherContainer.style.display = "block";
        errorContainer.style.display = "none";

        // Adding show class to trigger transition
        weatherContainer.classList.add("show");
    }
}

searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});
