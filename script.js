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
		$("#slogan").css("font-size", $("#slogan").height());
	});
});
