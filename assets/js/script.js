$(document).ready(function() { 
    
    // document variables
    var apiKey = "78d3a1bd5e04e59d4e8c0c5c026799bd"
    var currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather`;
    var forecastUrl = `https://api.openweathermap.org/data/2.5/forecast`;
    var currentDate = moment().format("M/D/YY");
    var searchBtn = $("#search-form");
    var historyContainer = $("#search-history");

    searchBtn.submit(function (event) {
        event.preventDefault();

        var searchValues = $(this).serializeArray();
        var city = searchValues[0].value;
        var searchHistoryDiv = $("<div class='search-history m-2 bg-light col-md-3 rounded'>");
        searchHistoryDiv.text(city);
        historyContainer.append(searchHistoryDiv);

        console.log(searchValues, city);

        searchForWeather(city);

        // fetch request
        var requestUrl = `${currentWeatherUrl}?q=${city}&appid=${apiKey}&units=imperial`;
        function currentWeatherApi() {
            fetch(requestUrl)
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    $(".city").remove();
                    var icon = (data.weather[0].icon);
                    var iconUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
                    var iconImg = "<img src ="+iconUrl+">";
                
                    var cityName = '<h1 class="city m-1">' + (data.name) + ' (' + currentDate + ')' + iconImg + '</h1>';
                    
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
        
        var rqstUrl = `${forecastUrl}?q=${city}&cnt=5&appid=${apiKey}&units=imperial`;
        function forecastApi() {
            fetch(rqstUrl)
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    console.log(data);
                })
        }
        forecastApi();
    })

    function searchForWeather(city) {
        console.log(city);
    }
})