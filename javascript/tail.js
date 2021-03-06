$(document).ready(function() {
	Tail = function(poly, color, speed, trace, traceColor, dir) {				// poly [[x1a,y1a, x1b,y1b], [x2a,y2a, x2b,y2b]]
		this.poly = poly;														// poly[0] == frame;  poly[0][0] == point;
		this.color = color;														// color of tail
		this.speed = speed/g_game.speed;										// frameslots per second
		this.current = 0;														// current frame (poly[this.current])
		this.dir = dir;

		this.fps = this.speed/g_game.frameRate;									// adds to fpsCurrent every update
		this.fpsCurrent = 0;													// change frameslot when >= 1

		if (arguments.length == 3) {
			this.trace = false;													// if it has an outline or not
			this.traceColor = "#000";											// the outline color if it has an outline
		} else {
			this.trace = trace;
			this.traceColor = traceColor;
		}
		
		this.index = g_game.objectAmount;
		g_game.objectAmount++;
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

		/*var poly = this.poly[this.current];
		var pos1 = disDir(poly[0],poly[1], 3, this.dir)
		var pos2 = disDir(poly[0],poly[1], 5000, this.dir)

		g_game.ctx.beginPath();
		g_game.ctx.moveTo(pos1.x-g_game.camera.x, pos1.y-g_game.camera.y);
		g_game.ctx.lineTo(pos2.x-g_game.camera.x, pos2.y-g_game.camera.y);
		g_game.ctx.lineWidth = 3;
		g_game.ctx.strokeStyle = "#b00";
		//g_game.ctx.stroke();
		g_game.ctx.closePath();

		g_game.ctx.beginPath();
		g_game.ctx.moveTo(poly[0]-g_game.camera.x, poly[1]-g_game.camera.y);

		for (var i=2; i<poly.length-1; i+=2) {
			g_game.ctx.lineTo(poly[i]-g_game.camera.x, poly[i+1]-g_game.camera.y);
		}


		if (this.trace) {
			g_game.ctx.lineWidth = 11;
			g_game.ctx.strokeStyle = this.traceColor;
			g_game.ctx.stroke();
		}
		g_game.ctx.closePath();*/
	};
})