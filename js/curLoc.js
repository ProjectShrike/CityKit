/**
 * Created by Sadman on 2014-11-15.
 */
    var geocoder = new google.maps.Geocoder();
    var map;
    var tags = new Array(5); //stores the tags to be displayed on screen
    var time = 24; //24 hours from now (for events happening nearby)
    var radius = 2; //default radius for PoV around the map in km
    var zoomVal = 13;

    //gets called after each call event
    function toggleListener () {
        //clear the screen
        setAllMap (null);
        var marker = new google.maps.Marker({
            map:map,
            position: pos,
            animation: google.maps.Animation.BOUNCE
        });
        //if either food or stores are selected
        if (tags[3] == true || tags[4] == true) {
            //send in the radius

                var xmlhttp = new XMLHttpRequest();
                var url = 'http://citykit.ca/promotions';
                var stringData = '';
                xmlhttp.onreadystatechange = function () {
                    if (xmlhttp.readyState == 4) {
                        handlePromos(JSON.parse(xmlhttp.responseText).array);
                        //console.log(JSON.parse(xmlhttp.responseText));
                    }

                }
                xmlhttp.open('GET', url, true);
                xmlhttp.send();
            }
        //for events
            if (tags[0] == true || tags[1] == true || tags[2] == true) {
                //send in the time

                var xmlhttp = new XMLHttpRequest();
                var url = 'http://citykit.ca/events';
                var stringData = '';
                xmlhttp.onreadystatechange = function () {
                    if (xmlhttp.readyState == 4) {
                        handleEvents(JSON.parse(xmlhttp.responseText).array);
                        //console.log(JSON.parse(xmlhttp.responseText));
                    }

                }
                xmlhttp.open('GET', url, true);
                xmlhttp.send();
        }
    }

    //event listeners for button toggles
    $("#sports").click(function() {
        //if ($("#"))
        if (tags[1] == false) {
            $("#sports").css("background", "#CCC");
            tags[1] = true;
        }
        else {
            $("#sports").css("background", "#FFF");
            tags[1] = false;
        }
        toggleListener();
    });

    $("#concerts").click(function() {
        //if ($("#"))
        if (tags[2] == false) {
            $("#concerts").css("background", "#CCC");
            tags[2] = true;
        }
        else {
            $("#concerts").css("background", "#FFF");
            tags[2] = false;
        }
        toggleListener();
    });

    $("#stores").click(function() {
        //if ($("#"))
        if (tags[3] == false) {
            $("#stores").css("background", "#CCC");
            tags[3] = true;
        }
        else {
            $("#stores").css("background", "#FFF");
            tags[3] = false;
            removeMarker(3);
        }
        toggleListener();
    });

    $("#food").click(function() {
        //if ($("#"))
        if (tags[4] == false) {
            $("#food").css("background", "#CCC");
            tags[4] = true;
        }
        else {
            $("#food").css("background", "#FFF");
            tags[4] = false;
            removeMarker(4);
        }
        toggleListener();
    });

    $("#events").click(function() {
        //if ($("#"))
        if (tags[0] == false) {
            $("#events").css("background", "#CCC");
            tags[0] = true;
        }
        else {
            $("#events").css("background", "#FFF");
            tags[0] = false;
            removeMarker(0);
        }
        toggleListener();
    });

function removeMarkers (index) {

}
// Note: This example requires that you consent to location sharing when
// prompted by your browser. If you see a blank space instead of the map, this
// is probably because you have denied permission for location sharing.

//gets an array of events shows them on the map using markers
function handleEvents (objects) {
    var eventMarker = new Array (objects.length);
    var info = new Array (objects.length);
    for (var i = 0; i < objects.length; i++) {
        eventGeoListener(eventMarker, info, objects, i);
    }
}

function eventGeoListener(eventMarker, info, objects, i){
    geocoder.geocode( { 'address': objects[i].location}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK && tags[objects[i].category]) {
            eventMarker[i] = new google.maps.Marker({
                map: map,
                position: results[0].geometry.location
                //title: objects[i].name,
                //animation: google.maps.Animation.DROP
                //icon = objects.image
            });
            var url = '';
            var phone = '';

            if (objects[i].path != '')
                url = '<a target="_blank" href ="' + objects[i].path+'" id="loc_link">Website</a>';
            if (objects[i].phone != '')
                phone = '<b>Phone: </b>'+objects[i].phone;

            var desc = '<div id="content" style="overflow: hidden !important">'+
                '<h4 id="firstHeading" class="firstHeading">'+ objects[i].name+ '</h4>'+
                '<b>Time: </b>'+
                objects[i].time+
                '<div id="contact">'+
                url+
                '<br>'+
                phone+
                '</div>'+
                '</div>';

            //adds the information provided by the business
            info[i] = new google.maps.InfoWindow({
                content: desc,
                maxWidth: 200
            });
            console.log(info[i]);

            //adds each of the markers to the screen
            google.maps.event.addListener(promo[i], 'click', function() {
                info[i].open(map,eventMarker[i]);
            });
        } else {
            alert('Geocode was not successful for the following reason: ' + status);
        }
    });
}

//gets the data from subscribed businesses
function handlePromos (objects) {
    var promo = new Array (objects.length);
    var info = new Array (objects.length);
    for (var i = 0; i < objects.length; i++) {
        geoListener(promo, info, objects, i);

    }
}

function geoListener(promo, info, objects, i){
    geocoder.geocode( { 'address': objects[i].location}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK && tags[objects[i].category] == true) {
            promo[i] = new google.maps.Marker({
                map: map,
                position: results[0].geometry.location
                //title: objects[i].name,
                //animation: google.maps.Animation.DROP
                //icon = objects.image
            });
            var url = '';
            var phone = '';

            if (objects[i].path != '')
                url = '<a target="_blank" href ="' + objects[i].path+'" id="loc_link">Get Coupon</a>';
            else url = objects[i].description;
            if (objects[i].phone != '')
            phone = '<b>Phone: </b>'+objects[i].phone;

            var desc = '<div id="content" style="overflow: hidden !important">'+
                '<h4 id="firstHeading" class="firstHeading">'+ objects[i].name+ '</h4>'+
                '<div id="contact">'+
                url+
                '<br>'+
                phone+
                '</div>'+
                '</div>';

            //adds the information provided by the business
            info[i] = new google.maps.InfoWindow({
                content: desc,
                maxWidth: 200
            });
            console.log(info[i]);

            //adds each of the markers to the screen
            google.maps.event.addListener(promo[i], 'click', function() {
                info[i].open(map,promo[i]);
            });
        } else {
            alert('Geocode was not successful for the following reason: ' + status);
        }
    });
}

function initialize() {
    //handles the different radius values
    if (radius < 1.5)
        zoomVal = 15;
    else if (radius < 4)
        zoomVal = 14;
    else
        zoomVal = 13;
    //toggles for placeholders on the map
    tags = [false, false, false, true, true];
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
    toggleListener();
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