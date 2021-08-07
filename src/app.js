let apiKey = "f5e66638242de3dc22bd15c331cb267e";
let city = "Charlotte";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

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


function displayTemp(response) {
    let cityElement = document.querySelector("#city");
    cityElement.innerHTML = response.data.name;
    
    let conditionsElement = document.querySelector("#conditions");
    conditionsElement.innerHTML = response.data.weather[0].description;

    let tempElement = document.querySelector("#temp");
    tempElement.innerHTML = Math.round(response.data.main.temp);

    let humidityElement = document.querySelector("#humidity");
    humidityElement.innerHTML = response.data.main.humidity;

    let windElement = document.querySelector("#wind");
    windElement.innerHTML = Math.round(response.data.wind.speed);

    let dateElement = document.querySelector("#date");
    dateElement.innerHTML = formatDate(response.data.dt * 1000);

}


axios.get(apiUrl).then(displayTemp);