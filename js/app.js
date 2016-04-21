$('document').ready(function(){
    // Globar variable declarations
    var long;
    var lat;
    navigator.geolocation.getCurrentPosition(function(position) {
      long = position.coords.longitude;
      lat = position.coords.latitude;
    });

    var _PremiumApiKey = '53e52111be3c4f67879214703162104';
    var _PremiumApiBaseURL = 'http://api.worldweatheronline.com/premium/v1/';

    $('#btnLocalWeatherPremium').on('click', function(e){
        SearchLocation(e);
        GetLocalWeather(e);
        e.preventDefault();
    });
    //------------ SEARCH LOCATION ----------------

    function SearchLocation(e) {

        var searchLocationInput = {
            query: lat +','+ long,
            format: 'JSON',
            timezone: 'yes',
            popular: '',
            num_of_results: '',
            callback: 'SearchLocationCallback'
        };

        JSONP_SearchLocation(searchLocationInput);
        e.preventDefault();

    }
    function JSONP_SearchLocation(input) {
        var url = _PremiumApiBaseURL + "search.ashx?q=" + input.query + "&format=" + input.format + "&timezone=" + input.timezone + "&popular=" + input.popular + "&num_of_results=" + input.num_of_results + "&key=" + _PremiumApiKey;

        jsonP(url, input.callback);
    }

    //------------ LOCAL WEATHER ----------------

    function GetLocalWeather(e) {

        var localWeatherInput = {
            query: lat + ',' + long,
            format: 'JSON',
            num_of_days: '2',
            date: '',
            fx: '',
            cc: '',
            tp: '',
            includelocation: '',
            show_comments: '',
            callback: 'LocalWeatherCallback'
        };

        JSONP_LocalWeather(localWeatherInput);
        e.preventDefault();
    }

    function JSONP_LocalWeather(input) {
        var url = _PremiumApiBaseURL + 'weather.ashx?q=' + input.query + '&format=' + input.format + '&extra=' + input.extra + '&num_of_days=' + input.num_of_days + '&date=' + input.date + '&fx=' + input.fx + '&tp=' + input.tp + '&cc=' + input.cc + '&includelocation=' + input.includelocation + '&show_comments=' + input.show_comments + '&key=' + _PremiumApiKey;

        jsonP(url, input.callback);
    }
// Calling the API
    function jsonP(url, callback) {
        $.ajax({
            type: 'GET',
            url: url,
            async: false,
            contentType: "application/json",
            jsonpCallback: callback,
            dataType: 'jsonp',
            success: function (json) {
                console.dir(json);
            },
            error: function (e) {
                console.log(e.message);
            }
        });
    }
    function SearchLocationCallback(searchLocation) {

        output = "<br/> Area Name: " + locationSearch.search_API.result[0].areaName[0].value;
        output += "<br/> Country: " + locationSearch.search_API.result[0].country[0].value;
        output += "<br/> Latitude: " + locationSearch.search_API.result[0].latitude;
        output += "<br/> Longitude: " + locationSearch.search_API.result[0].longitude;
        resultContainer.empty();
        resultContainer.html(output);

    }
        //    /* Update all the parameters for your API test*/
        //     var params = {
        //         key: '53e52111be3c4f67879214703162104',
           //
        //     };
        //     var result = $.ajax({
        //         /* update API end point */
        //         url: 'http://api.worldweatheronline.com/free/v1/',
        //         data: params,
        //         dataType: "jsonp",
        //         /*set the call type GET / POST*/
        //         type: "GET"
        //     })
        //     /* if the call is successful (status 200 OK) show results */
        //     .done(function (result) {
        //         /* if the results are meeningful, we can just console.log them */
        //         console.log(result);
        //         /* if the results are not meeningful, it might help to convert them to string first
        //         var displayStringifiedResults = JSON.stringify(result);
        //         console.log(displayStringifiedResults);*/
        //         /* if the results contain invalid json, it might help to sanitize them first
        //         var displaySanitizedResults = sanitizeJSON(result);
        //         console.log(displaySanitizedResults);*/
        //     })
        //     /* if the call is NOT successful show errors */
        //     .fail(function (jqXHR, error, errorThrown) {
        //         console.log(jqXHR);
        //         console.log(error);
        //         console.log(errorThrown);
        //     });

       });
