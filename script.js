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
			'top' : '0px'
		}, 1000);
		$("#butt1").fadeOut("fast");
		var map_height = String(($(window).height() - 650) / 2) + 'px';
		$("#map_load").fadeIn();
		$("#load_bar").animate({
			'width' : '100%'
		}, 2000);
		$("#map_load").delay(2000).animate({
			'height' : '0px'
		}).fadeOut();
		$("#map-canvas").delay(1200).fadeIn();
	});

	$(window).resize(function() {
		$("#title").css("font-size", $("#title").height());
	});
});
