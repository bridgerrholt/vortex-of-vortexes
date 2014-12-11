$(document).ready(function() {
	Bullet = function(x, y, r, dir, speed, sheet, rect) {
		this.x = x;									// x position
		this.y = y;									// y position
		this.rx = this.x-g_game.camera.x;			// x position on screen (real x)
		this.ry = this.y-g_game.camera.y;			// y position on screen (real y)
		this.r = r;									// radius
		this.dir = dir;								// direction
		this.speed = speed;							// the current speed
		this.active = true;							// if it is active (moving) or not

		this.xOffset = 5;						// x distance from corner to x area of rotation
		this.yOffset = 5;						// y distance from corner to y area of rotation

		this.spriteCurrent = [sheet, rect];			// id to current sheet and rect [sheet, rect]
	};

	Bullet.prototype.update = function(id) {
		this.motion();

		this.rx = this.x-g_game.camera.x;
		this.ry = this.y-g_game.camera.y;

		this.collision(id);
	};

	Bullet.prototype.motion = function() {
		var pos = disDir(this.x, this.y, this.speed, this.dir);
		this.x = pos.x+Math.floor((Math.random()*9)-4);
		this.y = pos.y+Math.floor((Math.random()*9)-4);
	};

	Bullet.prototype.collision = function(id) {
		if (!(this.rx >= -100 && this.rx < g_game.canvasW+100 && this.ry >= -100 && this.ry < g_game.canvasH+100)) {
			g_game.bullets.splice(id, 1);
		}
	};

	Bullet.prototype.draw = function() {
		drawObject(this);
	};
})
