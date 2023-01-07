//get rid of preloader once page loads
window.addEventListener('load', () => {
    const preload = document.querySelector('.preload');
    preload.classList.add("preload-finish");
});

const timeEl = document.getElementById('time');
const dateEl = document.getElementById('date');
const currentWeatherItemsEl = document.getElementById('weatherInfo');
const timezoneEl = document.getElementById('timezone');
const countryEl = document.getElementById('country');
const weatherForecastEl = document.getElementById('upcomingWeather');
const currentTempEl = document.getElementById('weatherToday');
const actualCurrentTempEl = document.getElementById('temp');
const cityInput = document.getElementById('text');
let cityFinal = '';


const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const key = '3648e2eb427a7b4bfa5e427b7d5ba89a';


setInterval(() => {
    const time = new Date();
    const month = time.getMonth();
    const day = time.getDay();
    const year = time.getFullYear();
    const date = time.getDate();
    const date1 = date == 1 ? '1st' : date == 2 ? '2nd' : date == 3 ? '3rd' : date + 'th'
    const hour = time.getHours();
    const hour12 = hour >= 13 ? hour % 12 : hour == 0 ? 12 : hour
    const minute = time.getMinutes();
    const minute1 = minute <= 9 ? '0' + minute : minute
    const ampm = hour >= 12 ? 'PM' : 'AM'

    timeEl.innerHTML = (hour12 <= 9 ? '0' + hour12 : hour12) + ':' + minute1 + ' ' + `<span id="am-pm">${ampm}</span>`

    dateEl.innerHTML = days[day] + ', ' + date1 + ' ' + months[month] + ' ' + year

}, 1000);

function showWeatherData(data) {
    let { feels_like, humidity, uvi, wind_speed, sunrise, sunset, temp } = data.current;

    timezoneEl.innerHTML = data.timezone;

    actualCurrentTempEl.innerHTML = `${temp.toFixed(0)}&#176; C`;

    currentWeatherItemsEl.innerHTML =
        `<div class="specificInfo">
        <div>Feels like:</div>
        <div>${feels_like.toFixed(0)}&#176; C</div>
    </div>
    <div class="specificInfo">
        <div>Humidity:</div>
        <div> </div>
        <div>${humidity}%</div>
    </div>
    <div class="specificInfo">
        <div>UV index:</div>
        <div> </div>
        <div>${uvi}</div>
    </div>
    <div class="specificInfo">
        <div>Wind:</div>
        <div> </div>
        <div>${wind_speed} m/s</div>
    </div>`;

    let otherDayForcast = ''
    data.daily.forEach((day, idx) => {
        if (idx == 0) {
            currentTempEl.innerHTML =
                `<img
                src="http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png"
                alt="weatherIcon"
                class="WIcon"
            />
            <div class="day">Today</div>
            <div class="todayTemperatureDay">Day  ${day.temp.day.toFixed(0)}&#176; C</div>
            <div class="todayTemperatureNight">Night  ${day.temp.night.toFixed(0)}&#176; C</div>
            <div class="todayHumidity">Humidity  ${day.humidity}%</div>
            <div class="todayPop">Precipitation  ${day.pop}%</div>`
        }
        else {
            otherDayForcast +=
                `<div class="upcoming-info">
                <img
                src="http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png"
                alt="weatherIcon"
                class="WIcon"
                />
                <div class="day">${window.moment(day.dt * 1000).format('ddd')}</div>
                <div class="temperatureDay">Day  ${day.temp.day.toFixed(0)}&#176; C</div>
                <div class="temperatureNight">Night  ${day.temp.night.toFixed(0)}&#176; C</div>
                <div class="humidity">Humidity  ${day.humidity}%</div>
                <div class="pop">Precipitation  ${day.pop}%</div>
            </div>`
        }
    })

    weatherForecastEl.innerHTML = otherDayForcast;
}

function start() {

    navigator.geolocation.getCurrentPosition((success) => {
        console.log(success);
        let { latitude, longitude } = success.coords;
        let lang = 'en';
        let units = 'metric';
        fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&appid=${key}&units=${units}&lang=${lang}`)
            .then(res => res.json()).then(data => {
                console.log(data)
                showWeatherData(data);
            })
    })

    document.querySelector(".search button").addEventListener("click", function () {
        cityFinal = cityInput.value;
        getWeatherData(cityFinal);
    })
    document.querySelector(".search-bar").addEventListener("keyup", function (event) {
        if (event.key == "Enter") {
            cityFinal = cityInput.value;
            getWeatherData(cityFinal);
        }
    })
}

function getWeatherData(place) {
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${place}&limit=1&appid=${key}`)
        .then(res => res.json()).then(cityData => {
            console.log(cityData)
            let { lat, lon } = cityData[0];
            let lang = 'en';
            let units = 'metric';
            fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely&appid=${key}&units=${units}&lang=${lang}`)
                .then(res => res.json()).then(data => {
                    console.log(data)
                    showWeatherData(data);
                })
        })
}

start();
