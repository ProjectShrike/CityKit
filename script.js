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
			'top' : '5%'
		}, 1000);
		$("#butt1").fadeOut("fast");
		$("#map-canvas").delay(1200).animate({
			'top' : '25%'
		});
		$("#settings_butt").animate({
			'top' : '0px'
		});
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
	});
/*
	$("#sports").click(function() {
		//if ($("#"))
		if (sports_toggle == false) {
			$("#sports").css("background", "#CCC");
			sports_toggle = true;
		}
		else {
			$("#sports").css("background", "#FFF");
			sports_toggle = false;
		}
	});

	$("#concerts").click(function() {
		//if ($("#"))
		if (concerts_toggle == false) {
			$("#concerts").css("background", "#CCC");
			concerts_toggle = true;
		}
		else {
			$("#concerts").css("background", "#FFF");
			concerts_toggle = false;
		}
	});

	$("#stores").click(function() {
		//if ($("#"))
		if (stores_toggle == false) {
			$("#stores").css("background", "#CCC");
			stores_toggle = true;
		}
		else {
			$("#stores").css("background", "#FFF");
			stores_toggle = false;
		}
	});

	$("#food").click(function() {
		//if ($("#"))
		if (food_toggle == false) {
			$("#food").css("background", "#CCC");
			food_toggle = true;
		}
		else {
			$("#food").css("background", "#FFF");
			food_toggle = false;
		}
	});

	$("#events").click(function() {
		//if ($("#"))
		if (events_toggle == false) {
			$("#events").css("background", "#CCC");
			events_toggle = true;
		}
		else {
			$("#events").css("background", "#FFF");
			events_toggle = false;
		}
	});*/
});
