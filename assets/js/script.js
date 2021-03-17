$(document).ready(function() { 
    
    // document variables
    var apiKey = "78d3a1bd5e04e59d4e8c0c5c026799bd"
    var currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather`;
    var forecastUrl = `https://api.openweathermap.org/data/2.5/forecast`;
    var currentDate = moment().format("M/D/YY");
    var searchBtn = $("#search-form");
    var historyContainer = $("#search-history");

    // search button event
    searchBtn.submit(function (event) {
        event.preventDefault();

        // adding cities to an ul
        var searchValues = $(this).serializeArray();
        var city = searchValues[0].value;
        var searchHistoryDiv = $("<div class='search-history m-2 bg-light col-md-3 rounded'>");
        searchHistoryDiv.text(city);
        historyContainer.append(searchHistoryDiv);

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
                    
                    // getting the weather icon for 1 day out weather
                    var icon1 = (data.list[0].weather[0].icon);
                    var icon1Url = "http://openweathermap.org/img/wn/" + icon1 + ".png";
                    var icon1Img = "<img src =" + icon1Url + ">";
                    
                    // getting HTML ready for weather icon
                    var iconTomorrow = '<h3 class="text-center">' +icon1Img + '</h3>';
                    
                    // setting the variable for the div the weather data will append to for tomorrow's forecast
                    var day1Display = $("#day-one-forecast");
                   
                    // appending the icon to the div
                    day1Display.append(iconTomorrow);
                   
                    // getting HTML ready for the temp and the humidity
                    var temp1 = '<p class="text-center">' + 'Temp: ' + (data.list[0].main.temp) + '°F' + '</p>';
                    var humidity1 = '<p class="text-center">' + 'Humidity: ' + data.list[0].main.humidity + '%' + '</p>';
                    
                    //  appending the temp and humidity
                    day1Display.append(temp1);
                    day1Display.append(humidity1);

                    // getting the weather icon for 2 days out weather
                    var icon2 = (data.list[1].weather[0].icon);
                    var icon2Url = "http://openweathermap.org/img/wn/" + icon2 + ".png";
                    var icon2Img = "<img src =" + icon2Url + ">";

                    // getting HTML ready for weather icon
                    var iconTwoDays = '<h3 class="text-center">' +icon2Img + '</h3>';
                    
                    // setting the variable for the div the weather data will append to for tomorrow's forecast
                    var day2Display = $("#day-two-forecast");
                   
                    // appending the icon to the div
                    day2Display.append(iconTwoDays);
                })
        }
        forecastApi();
    })

    function searchForWeather(city) {
        
    }
})