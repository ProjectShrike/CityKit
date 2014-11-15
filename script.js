$(document).ready(function() {
	var window_width = $(window).width()/2 - 300 + 'px';
	$("#main-search").delay(500).animate({
		'width' : '560px',
		'left' : window_width,
		'padding' : '20px',
		'padding-top' : '20px'
	}, 500);
});