$(document).ready(function () {

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
        var searchHistoryDiv = $("<div class='search-history m-2 p-2 text-center bg-light col-md-3 rounded'>");
        searchHistoryDiv.text(city);
        historyContainer.append(searchHistoryDiv);
        localStorage.setItem("search", city);

        // searchForWeather(city);

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
                    var iconImg = "<img src =" + iconUrl + ">";

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

        var rqstUrl = `${forecastUrl}?q=${city}&appid=${apiKey}&units=imperial`;
        function forecastApi() {
            fetch(rqstUrl)
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    console.log(data);
                    for (var i = 0; i < data.list.length; i++) {
                        var isThreeOClock = data.list[i].dt_txt.search('15:00:00');
                        // console.log(isThreeOClock);
                        var forecastContainer = $("#forecast");
                        if (isThreeOClock > -1) {
                            var forecast = data.list[i]
                            var day = moment(forecast.dt_txt).format("M/D/YY");
                            var icon = (forecast.weather[0].icon);
                            var iconUrl = "http://openweathermap.org/img/wn/" + icon + ".png";
                            var iconImg = "<img src =" + iconUrl + ">";
                            
                            var temp = forecast.main.temp;
                            var humidity = forecast.main.humidity;
                            
                            var rowDiv = $("<div class='col-1 forecastBox mt-1 mr-3 mb-1 justify-content-center'>")
                            var dayDiv = $("<div class='day-name text-center'>");
                            var tempDiv = $("<div class='temp-name text-center'>");
                            var humidityDiv = $("<div class='humidity-name text-center'>");
                            var iconDiv = $("<div class='icon-name text-center'>" + iconImg + "</div");
                            
                            dayDiv.text(day);
                            tempDiv.text("Temp: " + temp + "°F");
                            humidityDiv.text("Humidity: " + humidity + "%");

                            rowDiv.append(dayDiv);
                            rowDiv.append(iconDiv);
                            rowDiv.append(tempDiv);
                            rowDiv.append(humidityDiv);
                            forecastContainer.append(rowDiv);
                        }
                    }
                });
        }
        forecastApi();
    })

    // function searchForWeather(city) {

    // }
})