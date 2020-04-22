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


fetch('http://api.openweathermap.org/data/2.5/weather?q=Krakow&APPID=b77d6549110ac17233e88b98716d9e61&units=metric')
    .then(resp => resp.json())
    .then(resp => {
        resp.main.temp
        temperature.innerHTML = Math.round(resp.main.temp);
        humidity.innerHTML = resp.main.humidity;
        pressure.innerHTML = resp.main.pressure;
        wind.innerHTML = resp.wind.speed;
        const icon = document.querySelector(".now__icon--js");
        icon.src = `http://openweathermap.org/img/wn/${resp.weather[0].icon}@2x.png`
    })
    .catch(err => {
        console.log(err);
    })

const temperature = document.querySelector('.now__temperature--js');
const humidity = document.querySelector('.now__condition--humidity');
const pressure = document.querySelector(".now__condition--pressure");
const wind = document.querySelector(".now__condition--wind");


fetch('http://api.openweathermap.org/data/2.5/forecast/?q=London,uk&APPID=b77d6549110ac17233e88b98716d9e61&units=metric')
    .then(resp => resp.json())
    .then(resp => {
        const forecastList = resp.list;



        for (const forecast of forecastList) {
            console.log(forecast);
            var date = new Date(forecast.dt * 1000);
            var hours = date.getHours();
            hour.innerHTML += `<li class="hour__list--item">
            <span class="hour__list--time">${hours}:00</span>
            <img class="hour__list--icon" src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png" alt="hour icon"></img>
            <span class="hour__list--temp">${Math.round(forecast.main.temp)}°C</span>
        </li>`


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