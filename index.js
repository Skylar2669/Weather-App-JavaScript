const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");
const apiKey = "48206941a069865b260fb2e12dbe5e19";

weatherForm.addEventListener("submit", async event => {
    //form有一个default behaviour，这个是为了去掉它的
    event.preventDefault();

    const city = cityInput.value;

    //if there is a city...
    if(city){
        try{
            const weatherData = await getWeatherData(city);
            displayWeatherInfo(weatherData);
        }
        catch(error){
            console.error(error);
            displayError(error);
        }
    }
    else{
        displayError("Please enter a city");
    }
});

async function getWeatherData(city){
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    const response = await fetch(apiUrl);

    if(!response.ok){
        throw new Error("Could not fetch weather data");
    }

    return await response.json();
}

function displayWeatherInfo(data){
    const {name: city, 
           main: {temp, humidity}, 
           weather: [{description, id}]} = data;

    card.innerHTML = "";
    card.style.display = "flex";
    
    const cityDisplay = document.createElement("h1");
    const tempDisplay = document.createElement("p");
    const humidityDisplay = document.createElement("p");
    const descDisplay = document.createElement("p");
    const weatherDisplay = document.createElement("h");
    
    cityDisplay.innerHTML = city;
    tempDisplay.innerHTML = `${temp}°F`;
    humidityDisplay.innerHTML = `Humidity: ${humidity}`;
    descDisplay.innerHTML = description;
    weatherDisplay.innerHTML = getWeatherEmoji(id);

    cityDisplay.classList.add("cityDisplay");
    tempDisplay.classList.add("tempDisplay");
    humidityDisplay.classList.add("humidityDisplay");
    descDisplay.classList.add("descDisplay");
    weatherDisplay.classList.add("weatherEmoji");

    card.appendChild(cityDisplay);
    card.appendChild(tempDisplay);
    card.appendChild(humidityDisplay);
    card.appendChild(descDisplay);
    card.appendChild(weatherDisplay);
    
}

function getWeatherEmoji(weatherId){
    switch(true){
        case(weatherId >= 200 && weatherId < 300):
            return "⛈️";
        case(weatherId >= 300 && weatherId < 400):
            return "🌧️";
        case(weatherId >= 500 && weatherId < 600):
            return "🌧️";
        case(weatherId >= 600 && weatherId < 700):
            return "❄️";
        case(weatherId >= 700 && weatherId < 800):
            return "🌫️";
        case(weatherId === 800):
            return "☀️";
        case(weatherId >= 801 && weatherId < 810):
            return "☁️";
        default:
            return "🤷";
    }
}

function displayError(message){
    const errorDisplay = document.createElement("p");
    errorDisplay.innerHTML = message;
    errorDisplay.classList.add("errorDisplay");

    card.innerHTML = "";
    card.style.display = "flex";
    card.appendChild(errorDisplay);
}