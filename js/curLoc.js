/*
Copyright (C) 2014-2015 Sadman Kazi, Wojciech Swiderski

This file is part of City Kit.

    City Kit is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    City Kit is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with City Kit.  If not, see <http://www.gnu.org/licenses/>.
*/

/**
 * Created by Sadman on 2014-11-15.
 */
    var geocoder = new google.maps.Geocoder();
    var map;
    var tags = new Array(12); //stores the tags to be displayed on screen
    var time = 24; //24 hours from now (for events happening nearby)
    var radius = 2; //default radius for PoV around the map in km
    var zoomVal = 13;
    var curLocation;
    var markers = [];
    var rootPath = "http://citykit.wojtechnology.com/";

function get_time() {
    time = parseInt(document.getElementById("time_select").value);
    toggleListener();
}

function setAllMap(map) {
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(map);
    }
}

    //gets called after each call event
    function toggleListener () {
        //clear the screen
        setAllMap (null);
        markers = [];
        console.log(tags);
        //if either food or stores are selected
        /* if (tags[3] == true || tags[4] == true) {
            //send in the radius

                var xmlhttp = new XMLHttpRequest();
                var url = rootPath + 'promotions';
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

                var exmlhttp = new XMLHttpRequest();
                var url = rootPath + 'events/' + time;
                var stringData = '';
                exmlhttp.onreadystatechange = function () {
                    if (exmlhttp.readyState == 4) {
                        //console.log(JSON.parse(xmlhttp.responseText));
                        handleEvents(JSON.parse(exmlhttp.responseText).array);
                    }

                }
                exmlhttp.open('GET', url, true);
                exmlhttp.send();
        }*/

        if (tags[5] == true/* || tags[6] == true || tags[7] == true || tags[8] == true || tags[9] == true || tags[10] == true || tags[11] == true*/) {
            //send in the time

            var sxmlhttp = new XMLHttpRequest();
            var url = rootPath + 'landmarks';
            var stringData = '';
            sxmlhttp.onreadystatechange = function () {
                if (sxmlhttp.readyState == 4) {
                    //console.log(JSON.parse(xmlhttp.responseText));
                    handleLandmarks(JSON.parse(sxmlhttp.responseText).array);
                }

            }
            sxmlhttp.open('GET', url, true);
            sxmlhttp.send();
        }
    }

    //event listeners for button toggles

var Options = ["events", "sports", "concerts", "stores", "food", "sports_fields", "museums", "comm_center", "pub_art", "dog_parks", "poi", "playgrounds"];
$("#events").click(function() {
    // when activated
    if ($("#events").css("background-color") == "rgb(204, 204, 204)") {
        $("#events").css("background-color", "rgb(255, 255, 255)");
        tags[0] = false;
    }
    else {
        $("#events").css("background-color", "rgb(204, 204, 204)");
        tags[0] = true;
    }
    toggleListener();
});

$("#sports").click(function() {
    // when activated
    if ($("#sports").css("background-color") == "rgb(204, 204, 204)") {
        $("#sports").css("background-color", "rgb(255, 255, 255)");
        tags[1] = false;
    }
    else {
        $("#sports").css("background-color", "rgb(204, 204, 204)");
        tags[1] = true;
    }
    toggleListener();
});

$("#concerts").click(function() {
    // when activated
    if ($("#concerts").css("background-color") == "rgb(204, 204, 204)") {
        $("#concerts").css("background-color", "rgb(255, 255, 255)");
        tags[2] = false;
    }
    else {
        $("#concerts").css("background-color", "rgb(204, 204, 204)");
        tags[2] = true;
    }
    toggleListener();
});

$("#stores").click(function() {
    // when activated
    if ($("#stores").css("background-color") == "rgb(204, 204, 204)") {
        $("#stores").css("background-color", "rgb(255, 255, 255)");
        tags[3] = false;
    }
    else {
        $("#stores").css("background-color", "rgb(204, 204, 204)");
        tags[3] = true;
    }
    toggleListener();
});

$("#food").click(function() {
    // when activated
    if ($("#food").css("background-color") == "rgb(204, 204, 204)") {
        $("#food").css("background-color", "rgb(255, 255, 255)");
        tags[4] = false;
    }
    else {
        $("#food").css("background-color", "rgb(204, 204, 204)");
        tags[4] = true;
    }
    toggleListener();
});

$("#sports_fields").click(function() {
    // when activated
    if ($("#sports_fields").css("background-color") == "rgb(204, 204, 204)") {
        $("#sports_fields").css("background-color", "rgb(255, 255, 255)");
        tags[11] = false;
    }
    else {
        $("#sports_fields").css("background-color", "rgb(204, 204, 204)");
        tags[11] = true;
    }
    toggleListener();
});

$("#museums").click(function() {
    // when activated
    if ($("#museums").css("background-color") == "rgb(204, 204, 204)") {
        $("#museums").css("background-color", "rgb(255, 255, 255)");
        tags[5] = false;
    }
    else {
        $("#museums").css("background-color", "rgb(204, 204, 204)");
        tags[5] = true;
    }
    toggleListener();
});
/*
$("#comm_center").click(function() {
    // when activated
    if ($("#comm_center").css("background-color") == "rgb(204, 204, 204)") {
        $("#comm_center").css("background-color", "rgb(255, 255, 255)");
        tags[6] = false;
    }
    else {
        $("#comm_center").css("background-color", "rgb(204, 204, 204)");
        tags[6] = true;
    }
    toggleListener();
});

$("#pub_art").click(function() {
    // when activated
    if ($("#pub_art").css("background-color") == "rgb(204, 204, 204)") {
        $("#pub_art").css("background-color", "rgb(255, 255, 255)");
        tags[7] = false;
    }
    else {
        $("#pub_art").css("background-color", "rgb(204, 204, 204)");
        tags[7] = true;
    }
    toggleListener();
});

$("#dog_parks").click(function() {
    // when activated
    if ($("#dog_parks").css("background-color") == "rgb(204, 204, 204)") {
        $("#dog_parks").css("background-color", "rgb(255, 255, 255)");
        tags[8] = false;
    }
    else {
        $("#dog_parks").css("background-color", "rgb(204, 204, 204)");
        tags[8] = true;
    }
    toggleListener();
});

$("#poi").click(function() {
    // when activated
    if ($("#poi").css("background-color") == "rgb(204, 204, 204)") {
        $("#poi").css("background-color", "rgb(255, 255, 255)");
        tags[9] = false;
    }
    else {
        $("#poi").css("background-color", "rgb(204, 204, 204)");
        tags[9] = true;
    }
    toggleListener();
});

$("#playgrounds").click(function() {
    // when activated
    if ($("#playgrounds").css("background-color") == "rgb(204, 204, 204)") {
        $("#playgrounds").css("background-color", "rgb(255, 255, 255)");
        tags[10] = false;
    }
    else {
        $("#playgrounds").css("background-color", "rgb(204, 204, 204)");
        tags[10] = true;
    }
    toggleListener();
});
*/

// Note: This example requires that you consent to location sharing when
// prompted by your browser. If you see a blank space instead of the map, this
// is probably because you have denied permission for location sharing.

//gets an array of events shows them on the map using markers
function handleEvents (objects) {
    var eventMarker = new Array (objects.length);
    var info = new Array (objects.length);
    for (var i = 0; i < objects.length; i++) {
        //console.log(objects[i]);
        eventGeoListener(eventMarker, info, objects, i);
    }
}

function eventGeoListener(eventMarker, info, objects, i){
    geocoder.geocode( { 'address': objects[i].location}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK && tags[objects[i].category]) {
            var image = {
                url: '../images/MapMarkers/'+objects[i].category+'.png',
                // This marker is 20 pixels wide by 32 pixels tall.
                size: new google.maps.Size(33, 44),
                // The origin for this image is 0,0.
                origin: new google.maps.Point(0,0),
                // The anchor for this image is the base of the flagpole at 0,32.
                anchor: new google.maps.Point(0, 32)
            };
            eventMarker[i] = new google.maps.Marker({
                map: map,
                position: results[0].geometry.location,
                animation: google.maps.Animation.DROP,
                icon: image

            });
            markers.push(eventMarker[i]);
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
            //onsole.log(info[i]);

            //adds each of the markers to the screen
            google.maps.event.addListener(eventMarker[i], 'click', function() {
                info[i].open(map,eventMarker[i]);
            });
        } else {
            alert('Geocode was not successful for the following reason: ' + status);
        }
    });
}

//gets an array of landmarks shows them on the map using markers
function handleLandmarks (objects) {
    var landMarker = new Array (objects.length);
    var info = new Array (objects.length);
    for (var i = 0; i < objects.length; i++) {
        //console.log(objects[i]);
        eventLandListener(landMarker, info, objects, i);
    }
}

function eventLandListener(landMarker, info, objects, i){
    geocoder.geocode( { 'address': objects[i].xCoordinate + ',' + objects[i].yCoordinate }, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK && tags[5]) {
            var image = {
                url: '../images/MapMarkers/5.png',
                // This marker is 20 pixels wide by 32 pixels tall.
                size: new google.maps.Size(33, 44),
                // The origin for this image is 0,0.
                origin: new google.maps.Point(0,0),
                // The anchor for this image is the base of the flagpole at 0,32.
                anchor: new google.maps.Point(0, 32)
            };
            landMarker[i] = new google.maps.Marker({
                map: map,
                position: results[0].geometry.location,
                animation: google.maps.Animation.DROP,
                icon: image

            });
            markers.push(landMarker[i]);

            var desc = '<div id="content" style="overflow: hidden !important">'+
                '<h4 id="firstHeading" class="firstHeading">'+ objects[i].landmark+ '</h4>'+
                '</div>';

            //adds the information provided by the business
            info[i] = new google.maps.InfoWindow({
                content: desc,
                maxWidth: 200
            });
            //onsole.log(info[i]);

            //adds each of the markers to the screen
            google.maps.event.addListener(landMarker[i], 'click', function() {
                info[i].open(map,landMarker[i]);
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
            var image = {
                url: '../images/MapMarkers/'+objects[i].category+'.png',
                // This marker is 20 pixels wide by 32 pixels tall.
                size: new google.maps.Size(33, 44),
                // The origin for this image is 0,0.
                origin: new google.maps.Point(0,0),
                // The anchor for this image is the base of the flagpole at 0,32.
                anchor: new google.maps.Point(0, 32)
            };
            promo[i] = new google.maps.Marker({
                map: map,
                position: results[0].geometry.location,
                animation: google.maps.Animation.DROP,
                icon: image

            });
            markers.push(promo[i]);
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
            //console.log(info[i]);

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
    tags = [true, true, true, true, true, true, true, true, true, true, true, true];
    var mapOptions = {
        zoom: zoomVal
    };
    map = new google.maps.Map(document.getElementById('map-canvas'),
        mapOptions);

    // Try HTML5 geolocation
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {

            curLocation = new google.maps.LatLng(position.coords.latitude,
                position.coords.longitude);

            var marker = new google.maps.Marker({
                map:map,
                position: curLocation,
                animation: google.maps.Animation.BOUNCE
            });
            map.setCenter(curLocation);
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
    curLocation = new google.maps.LatLng(60, 105);
    var options = {
        map: map,
        position: curLocation,
        content: content
    };

    var infowindow = new google.maps.InfoWindow(options);
    map.setCenter(options.position);
}

google.maps.event.addDomListener(window, 'load', initialize);
