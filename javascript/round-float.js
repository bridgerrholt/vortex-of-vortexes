$(document).ready(function() {
	roundFloat = function(x, place) {
		var t = Math.pow(10, place);
		return Math.round(x*t)/t;
	};
})