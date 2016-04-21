var _PremiumApiBaseURL = 'http://api.worldweatheronline.com/premium/v1/';
/*
    Please change the PremiumAPIKey to your own.
    These keys have been provided for testing only.
    If you don't have one, then register now: http://developer.worldweatheronline.com/member/register
*/
var _PremiumApiKey = '53e52111be3c4f67879214703162104';

// -------------------------------------------



function JSONP_SearchLocation(input) {
    var url = _PremiumApiBaseURL + "search.ashx?q=" + input.query + "&format=" + input.format + "&timezone=" + input.timezone + "&popular=" + input.popular + "&num_of_results=" + input.num_of_results + "&key=" + _PremiumApiKey;

    jsonP(url, input.callback);
}


// -------------------------------------------

// Helper Method
