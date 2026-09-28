```javascript
async function getWeather() {

    const city = document.getElementById("cityInput").value.trim();

    const message = document.getElementById("message");

    if (city === "") {
        message.innerText = "Please enter a city name.";
        return;
    }

    message.innerText = "Loading weather...";

    try {

        // Get city coordinates
        const locationResponse = await fetch(
            `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`
        );

        const locationData = await locationResponse.json();

        if (!locationData.results) {
            message.innerText = "City not found. Please try another city.";
            return;
        }

        const location = locationData.results[0];

        const latitude = location.latitude;
        const longitude = location.longitude;

        // Get weather information
        const weatherResponse = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,rain,weather_code,pressure_msl,wind_speed_10m,visibility`
        );

        const weatherData = await weatherResponse.json();

        const current = weatherData.current;

        // Display city
        document.getElementById("cityName").innerText =
            location.name + ", " + location.country;

        // Temperature
        document.getElementById("temperature").innerText =
            Math.round(current.temperature_2m) + " °C";

        // Feels like
        document.getElementById("feelsLike").innerText =
            Math.round(current.apparent_temperature) + " °C";

        // Humidity
        document.getElementById("humidity").innerText =
            current.relative_humidity_2m + " %";

        // Wind
        document.getElementById("wind").innerText =
            current.wind_speed_10m + " km/h";

        // Pressure
        document.getElementById("pressure").innerText =
            Math.round(current.pressure_msl) + " hPa";

        // Visibility
        document.getElementById("visibility").innerText =
            (current.visibility / 1000).toFixed(1) + " km";

        // Rain
        document.getElementById("rain").innerText =
            current.rain + " mm";

        // Weather condition
        const weather = getWeatherCondition(current.weather_code);

        document.getElementById("condition").innerText =
            weather.text;

        document.getElementById("weatherIcon").innerText =
            weather.icon;

        message.innerText = "";

    } catch (error) {

        console.error(error);

        message.innerText =
            "Unable to get weather information. Check your internet connection.";
    }
}


// Convert weather code into description and icon
function getWeatherCondition(code) {

    if (code === 0) {
        return {
            text: "Clear Sky",
            icon: "☀️"
        };
    }

    if (code === 1 || code === 2) {
        return {
            text: "Partly Cloudy",
            icon: "⛅"
        };
    }

    if (code === 3) {
        return {
            text: "Cloudy",
            icon: "☁️"
        };
    }

    if (code >= 45 && code <= 48) {
        return {
            text: "Foggy",
            icon: "🌫️"
        };
    }

    if (code >= 51 && code <= 67) {
        return {
            text: "Rainy",
            icon: "🌧️"
        };
    }

    if (code >= 71 && code <= 77) {
        return {
            text: "Snowy",
            icon: "❄️"
        };
    }

    if (code >= 80 && code <= 82) {
        return {
            text: "Rain Showers",
            icon: "🌦️"
        };
    }

    if (code >= 95) {
        return {
            text: "Thunderstorm",
            icon: "⛈️"
        };
    }

    return {
        text: "Unknown",
        icon: "🌤️"
    };
}
```
