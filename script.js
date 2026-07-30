const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("city");

const cityName = document.getElementById("cityName");
const temperature = document.getElementById("temperature");
const description = document.getElementById("description");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const weatherIcon = document.getElementById("weatherIcon");
const dateTime = document.getElementById("dateTime");

const feelsLike = document.getElementById("feelsLike");
const pressure = document.getElementById("pressure");
const visibility = document.getElementById("visibility");

const sunrise = document.getElementById("sunrise");
const sunset = document.getElementById("sunset");


// Live Date & Time
function updateDateTime(){

    const now = new Date();

    const date = now.toLocaleDateString("en-IN",{
        weekday:"long",
        day:"numeric",
        month:"long",
        year:"numeric"
    });

    const time = now.toLocaleTimeString("en-IN");

    dateTime.innerText = `${date} | ${time}`;
}

setInterval(updateDateTime,1000);
updateDateTime();


// Search Button
searchBtn.addEventListener("click",()=>{

    const city = cityInput.value.trim();

    if(city===""){
        alert("Please enter city name");
        return;
    }

    getWeather(city);

});


// Enter Key
cityInput.addEventListener("keypress",(event)=>{

    if(event.key==="Enter"){
        searchBtn.click();
    }

});


// Convert Time
function convertTime(timestamp){

    const date = new Date(timestamp * 1000);

    return date.toLocaleTimeString("en-IN",{
        hour:"2-digit",
        minute:"2-digit"
    });

}


// Weather API
async function getWeather(city){

    const url =
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;


    try{

        searchBtn.innerText="Loading...";


        const response = await fetch(url);

        const data = await response.json();


        if(data.cod !== 200){

            alert("City not found");
            searchBtn.innerText="Search";
            return;

        }


        cityName.innerText=data.name;


        temperature.innerText =
        `${Math.round(data.main.temp)} °C`;


        description.innerText =
        data.weather[0].description;


        humidity.innerText =
        `${data.main.humidity}%`;


        wind.innerText =
        `${data.wind.speed} km/h`;


        feelsLike.innerText =
        `${Math.round(data.main.feels_like)} °C`;


        pressure.innerText =
        `${data.main.pressure} hPa`;


        visibility.innerText =
        `${(data.visibility/1000).toFixed(1)} km`;



        sunrise.innerText =
        convertTime(data.sys.sunrise);


        sunset.innerText =
        convertTime(data.sys.sunset);



        weatherIcon.src =
        `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;


        weatherIcon.style.display="block";


        searchBtn.innerText="Search";


    }
    catch(error){

        console.log(error);

        alert("Unable to fetch weather data");

        searchBtn.innerText="Search";

    }

}