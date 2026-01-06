async function getWeather() {
    const city = document.getElementById("city").value;
    const apiKey = "e9addcc730fe6463de95acb2c59e067a";

    if (city === "") {
        alert("Please enter a city name");
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.cod === "404") {
            document.getElementById("result").innerHTML = "City not found!";
            return;
        }

        document.getElementById("result").innerHTML = `
            <h3>${data.name}</h3>
            <p>Temperature: ${data.main.temp} °C</p>
            <p>Weather: ${data.weather[0].description}</p>
            <p>Humidity: ${data.main.humidity}%</p>
            <p>Wind Speed: ${data.wind.speed} m/s</p>
        `;
    } catch (error) {
        document.getElementById("result").innerHTML = "Error fetching data";
    }
}
