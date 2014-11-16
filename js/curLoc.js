/**
 * Created by Sadman on 2014-11-15.
 */


// Note: This example requires that you consent to location sharing when
// prompted by your browser. If you see a blank space instead of the map, this
// is probably because you have denied permission for location sharing.

var map;
var radius = 2; //default radius for PoV around the map in km
var zoomVal = 13;

//gets an array of events in a specific radius and shows them on the map using markers
function handleLandmarks (results) {


}

//gets the data from subscribed businesses
function handlePromos (results) {
    var promo = new Array (results.length);
    var info = new Array (results.length);
    for (var i = 0; i < results.length; i++) {
        //adds each of the markers to the screen
        promo[i] = new google.maps.Marker({
            map:map,
            position: results.position,
            title: results.title,
            animation: google.maps.Animation.DROP
            //icon = results.image
        });

        //adds the information provided by the business
        info[i] = new google.maps.InfoWindow({
            content: results.desc,
            maxWidth: 300
        });

        google.maps.event.addListener(promo[i], 'click', function() {
            info[i].open(map,promo[i]);
        });

    }
}

function initialize() {
    //handles the different radius values
    if (radius < 1.5)
        zoomVal = 15;
    else if (radius < 4)
        zoomVal = 14;
    else
        zoomVal = 13;

    var mapOptions = {
        zoom: zoomVal
    };
    map = new google.maps.Map(document.getElementById('map-canvas'),
        mapOptions);

    // Try HTML5 geolocation
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {

            var pos = new google.maps.LatLng(position.coords.latitude,
                position.coords.longitude);

            var marker = new google.maps.Marker({
                map:map,
                position: pos,
                animation: google.maps.Animation.BOUNCE
            });
            /*
            var infowindow = new google.maps.InfoWindow({
                map: map,
                position: pos,
                content: 'Location found using HTML5.'
            });*/

            map.setCenter(pos);
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