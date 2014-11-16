/**
 * Created by Sadman on 2014-11-15.
 */


// Note: This example requires that you consent to location sharing when
// prompted by your browser. If you see a blank space instead of the map, this
// is probably because you have denied permission for location sharing.
var geocoder = new google.maps.Geocoder();
var map;
var radius = 2; //default radius for PoV around the map in km
var zoomVal = 13;

//gets an array of events shows them on the map using markers
/*
function handleEvents (results) {
    var eventMarker = new Array(results.length);
    var info = new Array(results.length);
    for (var i = 0; i < results.length; i++) {
        //adds each of the markers to the screen
        eventMarker[i] = new google.maps.Marker({
            map: map,
            position: results.position,
            title: results.name,
            animation: google.maps.Animation.DROP
            //icon = results.image
        });

        var url = '';
        var phone = '';

        if (results[i].url != '')
            url = '<b>Website: </b>' + results[i].url;
        if (results[i].phone != '')
            phone = '<b>Phone: </b>' + results[i].phone;
        var desc = '<div id="content">' +
            '<h1 id="firstHeading" class="firstHeading">results[i].name</h1>' +
            '<div id="contact">' +
            '<b>Website: </b>' +
            results[i].url +
            '<br>' +
            phone +
            '</div>' +
            '<div id="bodyContent">' +
            '<p>' +
            results[i].message +
            '</p>' +
            '</div>' +
            '</div>';

        //adds the information provided by the business
        info[i] = new google.maps.InfoWindow({
            content: desc,
            maxWidth: 300
        });

        google.maps.event.addListener(promo[i], 'click', function () {
            info[i].open(map, eventMarker[i]);
        });


    }
}*/

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
        if (status == google.maps.GeocoderStatus.OK) {
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
            if (objects[i].phone != '')
            phone = '<b>Phone: </b>'+objects[i].phone;

            var desc = '<div id="content" style="overflow: hidden !important">'+
                '<h4 id="firstHeading" class="firstHeading">'+ objects[i].name+ '</h4>'+
                '<div id="contact">'+
                url+
                '<br>'+
                phone+
                '</div>'+
                /*
                '<div id="bodyContent">'+
                '<p>'+
                objects[i].description+
                '</p>'+
                '</div>'+*/
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

    var xmlhttp = new XMLHttpRequest();
    var url = 'http://citykit.ca/promotions';
    var stringData = '';
    xmlhttp.onreadystatechange = function(){
        if(xmlhttp.readyState == 4){
            handlePromos(JSON.parse(xmlhttp.responseText).array);
            //console.log(JSON.parse(xmlhttp.responseText));
        }

    }
    xmlhttp.open('GET', url, true);
    xmlhttp.send();
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