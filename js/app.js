var userLocation;
var userWeather;
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
            query: long + ',' + lat,
            format: 'JSON',
            timezone: 'yes',
            popular: '',
            num_of_results: '',
            callback: 'SearchLocationCallback'
        };

        JSONP_SearchLocation(searchLocationInput);
    }

    function JSONP_SearchLocation(input) {
        var url = _PremiumApiBaseURL + "search.ashx?q=" + input.query + "&format=" + input.format + "&timezone=" + input.timezone + "&popular=" + input.popular + "&num_of_results=" + input.num_of_results + "&key=" + _PremiumApiKey;

        locationCall(url, input.callback);
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
            date: '',
            fx: '',
            cc: 'yes',
            includelocation: 'yes',
            show_comments: '',
            callback: 'LocalWeatherCallback'
        };
        JSONP_LocalWeather(localWeatherInput);

    }

    function JSONP_LocalWeather(input) {
         var url = _PremiumApiBaseURL + 'weather.ashx?q=' + input.query + '&format=' + input.format + '&extra=' + input.extra + '&num_of_days=' + input.num_of_days + '&date=' + input.date + '&fx=' + input.fx + '&tp=' + input.tp + '&cc=' + input.cc + '&includelocation=' + input.includelocation + '&show_comments=' + input.show_comments + '&key=' + _PremiumApiKey;
         weatherCall(url, input.callback);
    }

    function LocalWeatherCallback(weather) {
        console.log(weather.data);
        var tempContainer = $('.tempOutput');
        $('.F').text(weather.data.current_condition[0].temp_F);
    }

    // ============== Calling the API =====================
    function weatherCall(url, callback) {
        $.ajax({
            type: 'GET',
            url: url,
            async: false,
            contentType: "application/json",
            jsonpCallback: callback,
            dataType: 'jsonp',
            success: function(weather) {
                LocalWeatherCallback(weather);
            },
            error: function(e) {
                console.log(e.message);
            }
        });
    }

    function locationCall(url, callback) {
        $.ajax({
            type: 'GET',
            url: url,
            async: false,
            contentType: "application/json",
            jsonpCallback: callback,
            dataType: 'jsonp',
            success: function(location) {
                // console.log(location);
            },
            error: function(e) {
                console.log(e.message);
            }
        });
    }



    $('#btnLocalWeatherPremium').on('click', function(e) {
        e.preventDefault();
        // SearchLocation();
        GetLocalWeather();
    });
});
