$("#search-button").click(function(event) {
    event.preventDefault();
    var citySearch = $("input[id='search-value']").val();

    var errorText = $("<p class='text-danger ml-2'>Please enter a city!</p>");
    var noEntry = $(".aside")
    if (!citySearch) {
        noEntry.append(errorText);
        return;
    }

    var userCity = $("<button class='prevCity col-md-5 m-1 btn btn-light'><li>");

    userCity.text(citySearch);

    var searchHistoryList = $(".history")
    searchHistoryList.append(userCity);
})