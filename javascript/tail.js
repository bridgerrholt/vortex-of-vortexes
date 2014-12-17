$(document).ready(function() {
	Tail = function(poly, color, speed, trace, traceColor) {				// poly [[x1a,y1a, x1b,y1b], [x2a,y2a, x2b,y2b]]
		this.poly = poly;													// poly[0] == frame;  poly[0][0] == point;
		this.color = color;													// color of tail
		this.speed = speed/g_game.speed;									// frameslots per second
		this.current = 0;													// current frame (poly[this.current])

		this.fps = this.speed/g_game.frameRate;								// adds to fpsCurrent every update
		this.fpsCurrent = 0;												// change frameslot when >= 1

		if (arguments.length == 3) {
			this.trace = false;												// if it has an outline or not
			this.traceColor = "#000";										// the outline color if it has an outline
		} else {
			this.trace = trace;
			this.traceColor = traceColor;
		}
	};

	Tail.prototype.update = function() {
		this.fpsCurrent += this.fps;
		this.current += Math.floor(this.fpsCurrent);

		if (this.current >= this.poly.length) {
			this.current -= this.poly.length;
		}

		this.fpsCurrent -= Math.floor(this.fpsCurrent);
	};

	Tail.prototype.draw = function() {
		var poly = this.poly[this.current];
		g_game.ctx.fillStyle = this.color;

		g_game.ctx.beginPath();
		g_game.ctx.moveTo(poly[0]-g_game.camera.x, poly[1]-g_game.camera.y);

		for (var i=2; i<poly.length-1; i+=2) {
			g_game.ctx.lineTo(poly[i]-g_game.camera.x, poly[i+1]-g_game.camera.y);
		}

		g_game.ctx.closePath();
		g_game.ctx.fill();

		if (this.trace) {
			g_game.ctx.strokeStyle = this.traceColor;
			g_game.ctx.stroke();
		}
	};
})