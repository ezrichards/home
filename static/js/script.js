let user_name;

$(document).ready(function () { 
    $.ajax({
        url: "http://localhost:8888/settings",
        type: 'POST',
        success: function(res) {
            user_name = res.name;
        }
    });

    $.ajax({
        url: "http://localhost:8888/weather",
        type: 'POST',
        success: function(res) {
            document.getElementById("temperature").innerHTML = Math.ceil(res.temperature) + "℉";
            document.getElementById("feelslike").innerHTML = "Feels like " + Math.ceil(res.feels_like) + "℉";
            document.getElementById("weather").innerHTML = res.weather;
            document.getElementById("location").innerHTML = res.location;
            document.getElementById("min").innerHTML = Math.ceil(res.min_temp) + "℉";
            document.getElementById("max").innerHTML = Math.ceil(res.max_temp) + "℉";
        }
    });

    $.ajax({
        url: "http://localhost:8888/news",
        type: 'POST',
        success: function(res) {
            document.getElementById("headline1").innerHTML = res.headline1;
            document.getElementById("headline1").setAttribute("href", res.headline1url)
            document.getElementById("headline2").innerHTML = res.headline2;
            document.getElementById("headline2").setAttribute("href", res.headline2url)
        }
    });
});

// Setting background image & date
var images = new Array("image", "image2", "image3", "image4");
var image = images[Math.floor(Math.random() * images.length)];
document.body.style.backgroundImage = 'url(' + "static/images/" + image + '.jpg)';

const days = new Array("Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday");
const months = new Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December");

// Based off Momentum https://github.com/yinghang/chrome-momentum/blob/master/js/momentum.js 
function setTimeAndDate() {
    var now = new Date();      
    var hours = now.getHours();
    var minutes = now.getMinutes();
    var seconds = now.getSeconds();
    var timeStamp = "AM";
    var greeting = "Good ";

    if(hours > 11 && hours < 24) {
        timeStamp = "PM";
    }

    // if hour is 1-12 (1:00 AM -> 12:00PM), Good morning
    if(hours < 12) {
        greeting = greeting + "morning, " + user_name + ". It's";
    }

     // if hour is 12-17 (1:00PM -> 4:00PM), Good afternoon
    if(hours >= 12 && hours <= 16) {
        greeting = greeting + "afternoon, " + user_name + ". It's";
    }

    // if hour is 18-24 (5:00PM -> 12:00AM), Good evening
    if(hours > 16) {
        greeting = greeting + "evening, " + user_name + ". It's";
    }

    if(hours > 12) {
        hours -= 12;
    }
    
    if(minutes < 10) {
        minutes = "0" + minutes;
    }

    if(seconds < 10) {
        seconds = "0" + seconds;
    }

    var time = hours + ":" + minutes + ":" + seconds + " " + timeStamp;
    document.getElementById("time").innerHTML = time;
    document.getElementById("greeting").innerHTML = greeting;
    document.getElementById("date").innerHTML = days[now.getDay()] + ", " + months[now.getMonth()] + " " + now.getDate() + ", " + now.getUTCFullYear();
}

// Updating the clock.
setInterval(function() {
    setTimeAndDate();
}, 1000);
