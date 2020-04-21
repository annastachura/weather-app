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


// fetch('http://api.openweathermap.org/data/2.5/weather?q=Krakow&APPID=b77d6549110ac17233e88b98716d9e61&units=metric')
//     .then(resp => resp.json())
//     .then(resp => {
//         resp.main.temp
//         temperature.innerHTML = Math.round(resp.main.temp);
//         humidity.innerHTML = resp.main.humidity;
//         pressure.innerHTML = resp.main.pressure;
//         wind.innerHTML = resp.wind.speed;
//     })
//     .catch(err => {
//         console.log(err);
//     })

// const temperature = document.querySelector('.now__temperature--js');
// const humidity = document.querySelector('.now__condition--humidity');
// const pressure = document.querySelector(".now__condition--pressure");
// const wind = document.querySelector(".now__condition--wind");


fetch('http://api.openweathermap.org/data/2.5/forecast/?q=London,uk&APPID=b77d6549110ac17233e88b98716d9e61&units=metric')
    .then(resp => resp.json())
    .then(resp => {
        const forecastList = resp.list;


        for (const forecast of forecastList) {
            console.log(forecast);
            hour.innerHTML += `<li class="hour__list--item">
            <span class="hour__list--time">${hours}</span>
            <span class="hour__list--temp">${Math.round(forecast.main.temp)}°C</span>
        </li>`

            var date = new Date(forecast.dt * 1000);
            var hours = date.getHours();
            console.log(hours);

        }
    })
    .catch(err => {
        console.log(err);
    })

const timeVisible = document.querySelector(".today");
const hourSection = document.querySelector(".hour");
const hour = document.querySelector(".hour__list");
const time = document.querySelector(".hour__list--time");
hour.innerHTML = "";

const everyHour = document.querySelector(".list__element--hour");
everyHour.addEventListener('click', function() {
    hourSection.classList.add("hour--visible");
    timeVisible.classList.remove("today--visible");
});

const now = document.querySelector(".list__element--now");
now.addEventListener('click', function() {
    timeVisible.classList.add("today--visible");
    hourSection.classList.remove("hour--visible");
})