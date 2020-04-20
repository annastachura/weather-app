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
    })
    .catch(err => {
        console.log(err);
    })

const temperature = document.querySelector('.now__temperature--js');
const humidity = document.querySelector('.now__condition--humidity');
const pressure = document.querySelector(".now__condition--pressure");
const wind = document.querySelector(".now__condition--wind");