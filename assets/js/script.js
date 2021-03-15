var apiKey = "78d3a1bd5e04e59d4e8c0c5c026799bd"
var currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather`;
var currentDate = moment().format("MMMM Do YYYY");

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
    function getApi() {
        fetch(requestUrl)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                console.log(data);
                console.log(data.name);
                console.log(data.weather[0].icon);
                var icon = (data.weather[0].icon);
                var iconUrl = "http://openweathermap.org/img/wn/" + icon + ".png";
                var cityName = (data.name) + "   " + currentDate + "   " + "<img src="+iconUrl+">";
                
                var currentWeather = $("<h1></h1>");
                currentWeather.text(cityName);

                var forecastToday = $("#today");
                forecastToday.append(cityName);
            })            
    }
    getApi();
    
})