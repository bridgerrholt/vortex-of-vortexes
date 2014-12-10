$(document).ready(function() {
	Player = function(x, y, r) {
		this.x = x;				// x position
		this.y = y;				// y position
		this.r = r;				// radius
	};

	Player.prototype.update = function() {

	}

	Player.prototype.draw = function() {
		g_ctx.strokeStyle = "#000";
		g_ctx.strokeCircle(this.x, this.y, this.w, this.h);
	};
})

















