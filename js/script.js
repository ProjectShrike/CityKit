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

$(document).ready(function() {
	var sett_butt_show = false;
	var sports_toggle = false;
	var concerts_toggle = false;
	var stores_toggle = false;
	var food_toggle = false;
	var events_toggle = false;

	$("#title").css("font-size", $("#title").height());
	var window_width = ($(window).width()/2 - $(window).width()*0.16) + 'px';
	$("#main-search").delay(500).animate({
		'width' : '30%',
		'left' : window_width,
		'padding' : '20px'
	}, 500);

	$("#butt1").click(function() {
		$("#title").animate({
			'top' : '5%',
		}, 1000);
		$("#butt1").fadeOut("fast");
		$("#map-canvas").delay(1200).animate({
			'top' : '25%'
		});
		$("#settings_butt").animate({
			'top' : '0px'
		});
		$("#slogan").fadeOut();
	});

	$("#settings_butt").click(function(){

		$("#settings_butt").animate({
			'right' : '240px'
		});

		if (sett_butt_show == false) {
			$("#settings").fadeIn();
			$("#settings_butt").html("Hide Settings");
			sett_butt_show = true;
		}
		else {
			$("#settings").fadeOut();
			$("#settings_butt").html("Show Settings");
			sett_butt_show = false;
		}
	});

	$(window).resize(function() {
		$("#title").css("font-size", $("#title").height());
		$("#slogan").css("font-size", $("#slogan").height());
	});
});
