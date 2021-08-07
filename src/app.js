let apiKey = "f5e66638242de3dc22bd15c331cb267e";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Charlotte&appid=${apiKey}&units=metric`;

function displayTemp(response) {
   console.log(response.data);
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
}


axios.get(apiUrl).then(displayTemp);