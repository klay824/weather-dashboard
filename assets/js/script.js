var apiKey = "78d3a1bd5e04e59d4e8c0c5c026799bd"
var currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather`;
var currentDate = moment().format("M/D/YY");

$("#search-button").click(function (event) {
    event.preventDefault();
    var citySearch = $("input[id='search-value']").val();

    // adds error text if user does not put in a city
    var errorText = $("<p class='text-danger ml-2' id='error'>Please enter a city!</p>");
    var noEntry = $(".aside")
    if (!citySearch) {
        noEntry.append(errorText);
        return;
    }

    // appends the user's city to the search history and turns the searched city into a button
    var userCity = $("<button class='prevCity col-md-5 m-1 btn btn-light'><li>");

    userCity.text(citySearch);

    var searchHistoryList = $(".history")
    searchHistoryList.append(userCity);

    // removes the error text
    $("#error").remove();

    // fetch request
    var requestUrl = `${currentWeatherUrl}?q=${citySearch}&appid=${apiKey}&units=imperial`;
    function currentWeatherApi() {
        fetch(requestUrl)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                console.log(data);
                console.log(data.main.temp + " °F");
                console.log(data.main.humidity + "%");
                console.log(data.wind.speed + " MPH");

                $(".city").remove();
                var icon = (data.weather[0].icon);
                var iconUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
                var iconImg = "<img src ="+iconUrl+">";
                var cityName = '<h1 class="city">' + (data.name) + ' (' + currentDate + ')' + iconImg + '</h1>';
                
                var forecastToday = $("#today").addClass("today");
                forecastToday.append(cityName);

                var temp = '<h5 class="m-1 pb-5 city">' + 'Temperature: ' + (data.main.temp) + '°F' + '</h5>';
                var humidity = '<h5 class="m-1 pb-5 city">' + 'Humidity: ' + (data.main.humidity) + '%' + '</h5>';
                var windSpeed = '<h5 class="m-1 pb-5 city">' + 'Wind Speed: ' + (data.wind.speed) + ' MPH' + '</h5>';
                
                forecastToday.append(temp);
                forecastToday.append(humidity);
                forecastToday.append(windSpeed);                       
            })            
    }
    currentWeatherApi();    
})