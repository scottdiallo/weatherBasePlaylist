$(function() {
    // Globar variable declarations
    var long;
    var lat;
    var _PremiumApiKey = '53e52111be3c4f67879214703162104';
    var _PremiumApiBaseURL = 'http://api.worldweatheronline.com/premium/v1/';

    navigator.geolocation.getCurrentPosition(function(position) {
        long = position.coords.longitude;
        lat = position.coords.latitude;
    });


    //------------ SEARCH LOCATION ----------------

    function SearchLocation() {
        var searchLocationInput = {
            query: lat + ',' + long,
            format: 'JSON',
            timezone: 'yes',
            callback: 'SearchLocationCallback'
        };

        JSONP_SearchLocation(searchLocationInput);
    }

    function JSONP_SearchLocation(input) {
        var url = _PremiumApiBaseURL + "search.ashx?q=" + input.query + "&format=" + input.format + "&timezone=" + input.timezone + "&key=" + _PremiumApiKey;

        jsonP(url, input.callback);
    }

    function SearchLocationCallback(searchLocation) {

        output = "<br/> Area Name: " + locationSearch.search_API.result[0].areaName[0].value;
        output += "<br/> Country: " + locationSearch.search_API.result[0].country[0].value;
        output += "<br/> Latitude: " + locationSearch.search_API.result[0].latitude;
        output += "<br/> Longitude: " + locationSearch.search_API.result[0].longitude;
        resultContainer.empty();
        resultContainer.html(output);
    }

    //------------ LOCAL WEATHER ----------------

    function GetLocalWeather() {

        var localWeatherInput = {
            query: lat + ',' + long,
            format: 'JSON',
            num_of_days: '2',
            callback: 'LocalWeatherCallback'
        };
        JSONP_LocalWeather(localWeatherInput);

    }

    function JSONP_LocalWeather(input) {
        var url = _PremiumApiBaseURL + 'weather.ashx?q=' + input.query + '&format=' + input.format +  '&num_of_days=' + input.num_of_days + '&key=' + _PremiumApiKey;

        jsonP(url, input.callback);
    }

    // ============== Calling the API =====================
    function jsonP(url, callback) {
        $.ajax({
            type: 'GET',
            url: url,
            async: false,
            contentType: "application/json",
            jsonpCallback: callback,
            dataType: 'jsonp',
            success: function(json) {
                console.dir(json);
            },
            error: function(e) {
                console.log(e.message);
            }
        });
    }

    $('#btnLocalWeatherPremium').on('click', function(e) {
        e.preventDefault();
        SearchLocation();
        GetLocalWeather();
    });
});
