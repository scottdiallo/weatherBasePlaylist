$('document').ready(function(){
    navigator.geolocation.getCurrentPosition(function(position) {
      console.log(position.coords.latitude, position.coords.longitude);

    });

function getWeather(){
    var weatherBasePlaylist = {
        url:'http://api.worldweatheronline.com/free/v1/',
        data: {
        dataType: 'jsonP',
        key:'e25318fc540a46ee818201515162104',
    }
};
}
    $.ajax(weatherBasePlaylist);
});
