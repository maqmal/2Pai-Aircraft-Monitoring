const appKey = '9697e661a188cb4621c5a52a23ca3907';

let searchButton = document.getElementById("search-btn");
let searchInput = document.getElementById("search-txt");
let cityName = document.getElementById("city-name");
let icon = document.getElementById("icon");
let temperature = document.getElementById("temp");
let desc = document.getElementById("desc-div");

var x = document.getElementById("cuaca");

navigator.geolocation.getCurrentPosition(showPosition);

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}

function showPosition(position) {
  // (position.coords.latitude) (position.coords.longitude) -6.921507 107.617751
  var latt =-6.921507;
  var long =107.617751;
  console.log('Your latitude is :' + latt + ' and longitude is ' + long);
  findWeatherDetails();

  function findWeatherDetails() {
    let searchLink = "https://api.openweathermap.org/data/2.5/weather?lat=" + latt + "&lon=" + long + "&appid=" + appKey;
    httpRequestAsync(searchLink, theResponse);
  }

  function theResponse(response) {
    let jsonObject = JSON.parse(response);
    cityName.innerHTML = jsonObject.name;
    icon.src = "http://openweathermap.org/img/w/" + jsonObject.weather[0].icon + ".png";
    temperature.innerHTML = "Feels like " + parseInt(jsonObject.main.temp - 273) + "°";
    desc.innerHTML = jsonObject.weather[0].main + "-" + jsonObject.weather[0].description;

    function degToCard(deg) {
      if (deg > 11.25 && deg < 33.75) {
        return "NNE";
      } else if (deg > 33.75 && deg < 56.25) {
        return "ENE";
      } else if (deg > 56.25 && deg < 78.75) {
        return "E";
      } else if (deg > 78.75 && deg < 101.25) {
        return "ESE";
      } else if (deg > 101.25 && deg < 123.75) {
        return "ESE";
      } else if (deg > 123.75 && deg < 146.25) {
        return "SE";
      } else if (deg > 146.25 && deg < 168.75) {
        return "SSE";
      } else if (deg > 168.75 && deg < 191.25) {
        return "S";
      } else if (deg > 191.25 && deg < 213.75) {
        return "SSW";
      } else if (deg > 213.75 && deg < 236.25) {
        return "SW";
      } else if (deg > 236.25 && deg < 258.75) {
        return "WSW";
      } else if (deg > 258.75 && deg < 281.25) {
        return "W";
      } else if (deg > 281.25 && deg < 303.75) {
        return "WNW";
      } else if (deg > 303.75 && deg < 326.25) {
        return "NW";
      } else if (deg > 326.25 && deg < 348.75) {
        return "NNW";
      } else {
        return "N";
      }
    }
    var compas = degToCard(jsonObject.wind.deg);
    x.innerHTML = "Wind : " + jsonObject.wind.speed + " m/s" + " - " + compas + " " + parseInt(jsonObject.wind.deg) + "°" +
      "<br>" + "Cloudiness : " + jsonObject.clouds.all + "%";
    console.log('Weather description : ' + jsonObject.weather[0].main + "-" + jsonObject.weather[0].description);
    console.log("Wind : " + jsonObject.wind.speed + " m/s" + " - " + compas + " " + jsonObject.wind.deg + "°" + "Cloudiness : " + jsonObject.clouds.all + "%");
  }

  function httpRequestAsync(url, callback) {
    var httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = () => {
      if (httpRequest.readyState == 4 && httpRequest.status == 200)
        callback(httpRequest.responseText);
    }
    httpRequest.open("GET", url, true); // true for asynchronous 
    httpRequest.send();
  }
}