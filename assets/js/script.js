$(document).ready(function () {

    // document variables
    var apiKey = "78d3a1bd5e04e59d4e8c0c5c026799bd"
    var currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather`;
    var forecastUrl = `https://api.openweathermap.org/data/2.5/forecast`;
    var currentDate = moment().format("M/D/YY");
    var searchBtn = $("#search-form");
    var historyContainer = $("#search-history");
    var searchHistory = [];

    // search button event
    searchBtn.submit(function (event) {
        event.preventDefault();

        // adding cities to a div
        var searchValues = $(this).serializeArray();
        var city = searchValues[0].value;
        var searchHistoryDiv = $("<button type='button' class='btn search-history mt-2 mr-2 mb-2 p-2 text-center bg-light col-sm-1 col-md-4 col-lg-7 rounded'>");


        // adding click power to dynamically generated buttons
        searchHistoryDiv.click(function (event) {
            event.preventDefault();
            var value = $(this).text(); /* button clicks */
            currentWeatherApi(value); /* adding the values from the two forecast api functions */
            forecastApi(value);
        });


        // pushing city value to searchHistory array, then saving to local storage
        searchHistory.push(city);

        localStorage.setItem('searchHistory', JSON.stringify(searchHistory));

        searchHistoryDiv.text(city);
        historyContainer.append(searchHistoryDiv);
        currentWeatherApi(city);
        forecastApi(city);
    });

    // today's weather fetch request
    function currentWeatherApi(city) {
        var requestUrl = `${currentWeatherUrl}?q=${city}&appid=${apiKey}&units=imperial`;
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


    // 5-day forecast fetch

    function forecastApi(city) {
        var rqstUrl = `${forecastUrl}?q=${city}&appid=${apiKey}&units=imperial`;
        fetch(rqstUrl)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                $(".remove").remove();
                // looping through the 40 results since it gives weather for every three hours for 5 days and we only need 5 days at the same time
                for (var i = 0; i < data.list.length; i++) {
                    var isThreeOClock = data.list[i].dt_txt.search('15:00:00'); /* searching for only 3pm */

                    var forecastContainer = $("#forecast");
                    if (isThreeOClock > -1) {
                        var forecast = data.list[i]
                        var day = moment(forecast.dt_txt).format("M/D/YY");
                        var icon = (forecast.weather[0].icon);
                        var iconUrl = "http://openweathermap.org/img/wn/" + icon + ".png";
                        var iconImg = "<img src =" + iconUrl + ">";

                        var temp = forecast.main.temp;
                        var humidity = forecast.main.humidity;

                        var rowDiv = $("<div class='col-sm-3 col-md-4 col-lg-2 forecastBox mt-1 mr-3 mb-1 justify-content-center remove'>")
                        var dayDiv = $("<div class='day-name text-center remove pt-2'>");
                        var iconDiv = $("<div class='icon-name text-center remove'>" + iconImg + "</div");
                        var tempDiv = $("<div class='temp-name text-center remove'>");
                        var humidityDiv = $("<div class='humidity-name text-center remove pb-2'>");


                        dayDiv.text(day);
                        tempDiv.text("Temp: " + temp + " °F");
                        humidityDiv.text("Humidity: " + humidity + "%");

                        // appending to the row div, then appending to the container
                        rowDiv.append(dayDiv);
                        rowDiv.append(iconDiv);
                        rowDiv.append(tempDiv);
                        rowDiv.append(humidityDiv);
                        forecastContainer.append(rowDiv);
                    }
                }
            });
    }



    function retrieveHistory() {
        if (localStorage.getItem("searchHistory")) {
            searchHistory = JSON.parse(localStorage.getItem("searchHistory"));

            for (var i = 0; i < searchHistory.length; i++) {
                var searchHistoryDiv = $("<button type='button' class='btn search-history mt-2 mr-2 mb-2 p-2 text-center bg-light col-sm-1 col-md-4 col-lg-7 rounded'>");
                // adding click power to dynamically generated buttons
                searchHistoryDiv.click(function (event) {
                    event.preventDefault();
                    currentWeatherApi(value); /* adding the values from the two forecast api functions */
                    forecastApi(value);
                });
                searchHistoryDiv.text(searchHistory[i]);
                historyContainer.append(searchHistoryDiv);
            }
        }
    }
    retrieveHistory();
});