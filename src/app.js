function formatDate(timestamp) {
let date = new Date(timestamp);
let hours = date.getHours();
if (hours < 10) {
    hours = `0${hours}`;
}
let minutes = date.getMinutes();
if (minutes < 10) {
minutes = `0${minutes}`;
}
let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
];
let day = days[date.getDay()];

return `${day} ${hours}:${minutes}`;
}

function formatDay(timestamp) {
    let date = new Date(timestamp * 1000);
    let day = date.getDay();
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    return days[day];
}

function displayForecast(response) {
    let forecast = response.data.daily;
    let forecastElement = document.querySelector("#forecast");
    
    let forecastHTML = `<div class="row">`;
    forecast.forEach(function (forecastDay, index) {
        if (index < 6) {

    forecastHTML = forecastHTML +
			`
            <div class="col-2">
				<div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
				<img 
				src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png"
				alt=""
				width="42"
				/>
				    <div class="weather-forecast-temp">
						<span class="weather-forecast-temp-max">
						${Math.round(forecastDay.temp.max)}°
						</span>
						<span class="weather-forecast-temp-min">
						${Math.round(forecastDay.temp.min)}°
						</span>
					</div>
			</div>
        `;
            }
        });

    forecastHTML = forecastHTML + `</div>`;
    forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
    let apiKey = "f5e66638242de3dc22bd15c331cb267e";
    let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;
    axios.get(apiUrl).then(displayForecast);
}

function displayTemp(response) {
    celsiusTemp = response.data.main.temp;

    let cityElement = document.querySelector("#city");
    cityElement.innerHTML = response.data.name;
    
    let conditionsElement = document.querySelector("#conditions");
    conditionsElement.innerHTML = response.data.weather[0].description;

    let tempElement = document.querySelector("#temp");
    tempElement.innerHTML = Math.round(celsiusTemp);

    let humidityElement = document.querySelector("#humidity");
    humidityElement.innerHTML = response.data.main.humidity;

    let windElement = document.querySelector("#wind");
    windElement.innerHTML = Math.round(response.data.wind.speed);

    let dateElement = document.querySelector("#date");
    dateElement.innerHTML = formatDate(response.data.dt * 1000);

    let iconElement = document.querySelector("#icon");
    iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
    iconElement.setAttribute("alt", response.data.weather[0].description);

    getForecast(response.data.coord);
}

function handleSubmit(event) {
    event.preventDefault();
    let cityInputElement = document.querySelector("#city-input");
    search(cityInputElement.value);
}

function search(city) {
    let apiKey = "f5e66638242de3dc22bd15c331cb267e";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
    axios.get(apiUrl).then(displayTemp);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

search("Charlotte");