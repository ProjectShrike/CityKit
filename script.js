$(document).ready(function() {

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
	});

	$("#settings_butt").click(function(){
		$("#settings_butt").animate({
			'right' : '240px'
		});
		$("#settings").fadeIn();
	});

	$(window).resize(function() {
		$("#title").css("font-size", $("#title").height());
	});

	$("#sports").click(function() {

	});
});
