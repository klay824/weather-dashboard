$("#search-button").click(function(event) {
    event.preventDefault();
    var citySearch = $("input[id='search-value']").val();

    if (!citySearch) {
        console.log("Please enter a city!");
        return;
    }

    var userCity = $("<button class='prevCity col-md-5 m-1 btn btn-light'><li>");

    userCity.text(citySearch);

    var searchHistoryList = $(".history")
    searchHistoryList.append(userCity);
})