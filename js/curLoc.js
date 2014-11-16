/**
 * Created by Sadman on 2014-11-15.
 */


// Note: This example requires that you consent to location sharing when
// prompted by your browser. If you see a blank space instead of the map, this
// is probably because you have denied permission for location sharing.

var map;
var radius = 2; //default radius for PoV around the map
var zoomVal = Math.log(6371/(radius*1.5))/Math.log(2); //converts the radius into the zoom value

function initialize() {
    var mapOptions = {
        zoom: zoomVal
    };
    map = new google.maps.Map(document.getElementById('map-canvas'),
        mapOptions);

    // Try HTML5 geolocation
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(location) {
            var currentPosition = new google.maps.LatLng(location.coords.latitude,
                location.coords.longitude);
            var posMarker = new google.maps.Marker ({
                position: currentPosition,
                map: map
            });
            /*
            var infowindow = new google.maps.InfoWindow({
                map: map,
                position: pos,
                content: 'You are currently here!'
            });*/

            map.setCenter(currentPosition);
        }, function() {
            handleNoGeolocation(true);
        });
    } else {
        // Browser doesn't support Geolocation
        handleNoGeolocation(false);
    }
}

function handleNoGeolocation(errorFlag) {
    if (errorFlag) {
        var content = 'Error: The Geolocation service failed.';
    } else {
        var content = 'Error: Your browser doesn\'t support geolocation.';
    }

    var options = {
        map: map,
        position: new google.maps.LatLng(60, 105),
        content: content
    };

    var infowindow = new google.maps.InfoWindow(options);
    map.setCenter(options.position);
}


google.maps.event.addDomListener(window, 'load', initialize);

