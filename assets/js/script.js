// Creating a variable to store the API key
var apiKey = '&appid=c974392a54c31d140036260bfd2c80a0';


// DOM Elements
var inputEl = document.querySelector('.input');
var searchBtnEl = document.querySelector('.search-btn');
var citiesListEl = document.querySelector(".cities-list");



// Creating a variable to store user's input for city and saving it to local storage
var cityName = localStorage.getItem('cityStorage');



// Setting input value to local storage

// Constructing a Query URL to make the API call
var URLWeather = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + '&units=imperial' + apiKey;
// URL for 5-days forecast parameters (city name + weather units of measurements)
var URLForecast = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + '&units=imperial' + apiKey;

// Setting input value to local storage

function recordCityData() {
    localStorage.setItem('cityStorage', inputEl.value);
   
}

// Appending the search input from the local storage to the city list
for (var i = 0; i < localStorage.length; i++) {
    $(".cities-list").append("<p>" + localStorage.getItem(localStorage.key(i)) + "</p>");
}


// Making the API call using fetch request
$.ajax ({
    url: URLWeather,
    method: "GET"
})
.then(function (response) {

// Adding weather info to the page
$('.city').html("<h2>" + response.name + "</h2>");
$('.weather-icon').html("<img src='https://openweathermap.org/img/w/" + response.weather[0].icon + ".png' >");
$('.wind').text("Wind Speed: " + response.wind.speed + " MPH");
$('.humidity').text("Humidity: " + response.main.humidity + "%");
$(".temperature").text("Temperature: " + response.main.temp + " F");


// Getting the URL for UV index
var lat = response.coord.lat;
var lon = response.coord.lon;

var queryURLUv = "https://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + apiKey;

        

// Making the API call of the Uv index
$.ajax ({
    url : queryURLUv,
    method : "GET"
})


.then(function (response) {
    
    var uvValue = response.value

    // Add UV index to page

    $('.uv').text("UV Index: " + response.value);
    $('.uv').css("background-color", uvColor(uvValue));

});

}
);
// Adding color function
function uvColor(uvValue, colorbgd) {
    var colorbgd = "";
    if (uvValue <= 2) {
        colorbgd = "#66ff00";
    }
    else if (uvValue <= 5 && uvValue > 2) {
        colorbgd = "#ffbb00";
    }
    else if (uvValue >= 6 && uvValue > 5) {
        colorbgd = "#FF0000";
    }
    return colorbgd;
}
    // Displaying the date
    var currentDay = moment().format("dddd, MMMM Do");

    function functionDay() {
        $(".current-date").text(currentDay);
    };
    functionDay();
    
    // Making an API call for the 5 Days Forecast function using fetch

    $.ajax ({
    url : URLForecast,
    method : "GET"
    })
    .then(function (response) {
    
        var dayOne = moment(response.list[0].dt_txt).format("ddd, MMM D");

        // Adding day 1 data to page
        $(".day-one-temperature").text("Temp: " + response.list[0].main.temp + " F");
        $(".day-one-date").html("<h6>" + dayOne + "</h6>");
        $(".day-one-icon").html("<img src='https://openweathermap.org/img/w/" + response.list[0].weather[0].icon + ".png' alt='Icon depicting current weather.'>");
        $(".day-one-humidity").text("Humidity: " + response.list[0].main.humidity + "%");

        var dayTwo = moment(response.list[8].dt_txt).format("ddd, MMM D");
        // Adding day 2 data to page
        $(".day-two-temperature").text("Temp: " + response.list[8].main.temp + " F");
        $(".day-two-date").html("<h6>" + dayTwo + "</h6>");
        $(".day-two-icon").html("<img src='https://openweathermap.org/img/w/" + response.list[8].weather[0].icon + ".png' alt='Icon depicting current weather.'>");
        $(".day-two-humidity").text("Humidity: " + response.list[8].main.humidity + "%");

        var dayThree = moment(response.list[16].dt_txt).format("ddd, MMM D");
        // Adding day 3 data to page
        $(".day-three-temperature").text("Temp: " + response.list[16].main.temp + " F");
        $(".day-three-date").html("<h6>" + dayThree + "</h6>");
        $(".day-three-icon").html("<img src='https://openweathermap.org/img/w/" + response.list[16].weather[0].icon + ".png' alt='Icon depicting current weather.'>");
        $(".day-three-humidity").text("Humidity: " + response.list[16].main.humidity + "%");

        var dayFour = moment(response.list[24].dt_txt).format("ddd, MMM D");

        // Adding day 4 data to page
        $(".day-four-temperature").text("Temp: " + response.list[24].main.temp + " F");
        $(".day-four-date").html("<h6>" + dayFour + "</h6>");
        $(".day-four-icon").html("<img src='https://openweathermap.org/img/w/" + response.list[24].weather[0].icon + ".png' alt='Icon depicting current weather.'>");
        $(".day-four-humidity").text("Humidity: " + response.list[24].main.humidity + "%");

        var dayFive = moment(response.list[32].dt_txt).format("ddd, MMM D");

        // Adding day 5 data to page
        $(".day-five-temperature").text("Temp: " + response.list[32].main.temp + " F");
        $(".day-five-date").html("<h6>" + dayFive + "</h6>");
        $(".day-five-icon").html("<img src='https://openweathermap.org/img/w/" + response.list[32].weather[0].icon + ".png' alt='Icon depicting current weather.'>");
        $(".day-five-humidity").text("Humidity: " + response.list[32].main.humidity + "%");

    });

// Now we create an Event Listener for the search button
searchBtnEl.addEventListener('click', recordCityData);
    
 

    