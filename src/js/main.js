"use strict";

// service worker registration - remove if you're not going to use it

if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('serviceworker.js').then(function(registration) {
            // Registration was successful
            console.log('ServiceWorker registration successful with scope: ', registration.scope);
        }, function(err) {
            // registration failed :(
            console.log('ServiceWorker registration failed: ', err);
        });
    });
}


const city = document.querySelector(".header__city--js");
const search = document.querySelector(".header__button--js");
city.addEventListener('keyup', function(e) {
    if (event.keyCode === 13) {
        upDateWeather();
        event.preventDefault();
    };
});

function upDateWeather() {

    fetch(`https://eu1.locationiq.com/v1/search.php?key=cc47948346ea6b&q=${city.value}&format=json`)
        .then(resp => resp.json())
        .then(resp => {
            const lat = resp[0].lat
            const lon = resp[0].lon
            fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=b77d6549110ac17233e88b98716d9e61&units=metric&lang=pl`)
                .then(resp => resp.json())
                .then(resp => {
                    resp.current.temp
                    temperature.innerHTML = Math.round(resp.current.temp);
                    humidity.innerHTML = resp.current.humidity;
                    pressure.innerHTML = resp.current.pressure;
                    wind.innerHTML = resp.current.wind_speed;
                    const icon = document.querySelector(".now__icon--js");
                    icon.src = `http://openweathermap.org/img/wn/${resp.current.weather[0].icon}@2x.png`

                    for (const forecast of resp.hourly) {

                        var date = new Date(forecast.dt * 1000);
                        var hours = date.getHours();
                        hour.innerHTML += `<li class="hour__list--item">
                <span class="hour__list--time">${hours}:00</span>
                <img class="hour__list--icon" src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png" alt="hour icon"></img>
                <span class="hour__list--temp">${Math.round(forecast.temp)}°C</span>
            </li>`

                    }
                    const daysList = document.querySelector(".days__list--js");
                    daysList.innerHTML = "";


                    for (const day of resp.daily) {
                        var date = new Date(day.dt * 1000);
                        var dayOfWeek = DaysOfWeek[date.getDay()];
                        daysList.innerHTML += `<li class="list">
                <div class="list__element">
                    <p class="list__title">${dayOfWeek}</p>
                    <p class="list__description">${day.weather[0].description}</p>
                </div>
                <img class="list__icon" src="http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="weather icon">
                <div class="list__temp">
                    <p class="list__maxTemp">${Math.round(day.temp.max)}°</p>
                    <p class="list__minTemp">${Math.round(day.temp.min)}°</p>
                </div>
            </li>`

                    }
                    const now = document.querySelector('.now--js');
                    now.classList.add("now--visible");
                })


            .catch(err => {
                console.log(err);
            })

        })
}

search.addEventListener('click', function() {
    upDateWeather()
});




const DaysOfWeek = ["niedziela", "poniedziałek", "wtorek", "środa", "czartek", "piątek", "sobota"]

const temperature = document.querySelector('.now__temperature--js');
const humidity = document.querySelector('.now__condition--humidity');
const pressure = document.querySelector(".now__condition--pressure");
const wind = document.querySelector(".now__condition--wind");



const timeVisible = document.querySelector(".today");
const hourSection = document.querySelector(".hour");
const hour = document.querySelector(".hour__list");
const time = document.querySelector(".hour__list--time");
hour.innerHTML = "";

const everyHour = document.querySelector(".list__element--hour");
everyHour.addEventListener('click', function() {
    hourSection.classList.add("hour--visible");
    timeVisible.classList.remove("today--visible");
    days.classList.remove("days--visible");
});

const now = document.querySelector(".list__element--now");
now.addEventListener('click', function() {
    timeVisible.classList.add("today--visible");
    hourSection.classList.remove("hour--visible");
    days.classList.remove("days--visible");
});

const everyDay = document.querySelector(".list__element--days");
const days = document.querySelector(".days");
everyDay.addEventListener('click', function() {
    days.classList.add("days--visible");
    hourSection.classList.remove("hour--visible");
    timeVisible.classList.remove("today--visible");
});


// fetch('http://api.openweathermap.org/data/2.5/forecast/?q=London,uk&APPID=b77d6549110ac17233e88b98716d9e61&units=metric')
//     .then(resp => resp.json())
//     .then(resp => {
//         const daysWeather = resp.
//     })