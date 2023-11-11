var APIKey = "ba677ba6b0fe99ce4868843dff5b5299";
var city;
var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid" + APIKey;


fetch(queryURL)