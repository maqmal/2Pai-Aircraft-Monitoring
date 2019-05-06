const appKey = '9697e661a188cb4621c5a52a23ca3907';

let searchButton = document.getElementById("search-btn");
let searchInput = document.getElementById("search-txt");
let cityName = document.getElementById("city-name");
let icon = document.getElementById("icon");
let temperature = document.getElementById("temp");
let humidity = document.getElementById("humidity-div");

var x = document.getElementById("cuaca");
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else { 
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}
function showPosition(position) {
  x.innerHTML = "Latitude: " + position.coords.latitude + 
  "<br>Longitude: " + position.coords.longitude;

    var latt = parseInt(position.coords.latitude);
    var long = parseInt(position.coords.longitude);

          findWeatherDetails();
      
      function findWeatherDetails() {
          let searchLink = "https://api.openweathermap.org/data/2.5/weather?lat=" +latt+ "&lon="+long+ "&appid="+appKey;
         httpRequestAsync(searchLink, theResponse);
       }
      
      function theResponse(response) {
        let jsonObject = JSON.parse(response);
        cityName.innerHTML = jsonObject.name;
        icon.src = "http://openweathermap.org/img/w/" + jsonObject.weather[0].icon + ".png";
        temperature.innerHTML = parseInt(jsonObject.main.temp - 273) + "°";
        humidity.innerHTML = jsonObject.main.humidity + "%";
      }
      
      function httpRequestAsync(url, callback)
      {
          var httpRequest = new XMLHttpRequest();
          httpRequest.onreadystatechange = () => { 
              if (httpRequest.readyState == 4 && httpRequest.status == 200)
                  callback(httpRequest.responseText);
          }
          httpRequest.open("GET", url, true); // true for asynchronous 
          httpRequest.send();
      }
}



