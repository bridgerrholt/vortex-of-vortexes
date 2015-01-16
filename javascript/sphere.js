$(document).ready(function() {
	Sphere = function(x, y, r, id, dir, speedMax, type, vision, sheet, rect) {
		this.x = x;											// x position
		this.y = y;											// y position
		this.rx = this.x-g_game.camera.x;					// x position on screen (real x)
		this.ry = this.y-g_game.camera.y;					// y position on screen (real y)
		this.r = r;											// radius
		this.dir = dir;										// direction
		this.id = id;

		this.speed = 0;										// the current speed
		this.speedMax = speedMax*g_game.speed;						// the maximum speed
		this.friction = 30/g_game.speed;					// the amount of ticks taken to slow down completely
		this.acc = 60/g_game.speed;							// the amount of ticks taken to speed up completely

		this.vision = vision;								// distance object needs to be away before movement starts

		this.active = true;									// if it is active (moving) or not

		this.xOffset = 15;									// x distance from corner to x area of rotation
		this.yOffset = 15;									// y distance from corner to y area of rotation

		this.moving = false;

		this.xOther = 0;
		this.yOther = 0;
		this.rOther = 0;

		this.type = 0;										// 0. white basic  1. red health  2. yellow agility  ...

		this.spriteCurrent = [sheet, rect];					// id to current sheet and rect [sheet, rect]
		this.index = g_game.objectAmount;
		g_game.objectAmount++;
	};

	Sphere.prototype.update = function() {
		this.getAction();

		this.motion();

		this.rx = this.x-g_game.camera.x;
		this.ry = this.y-g_game.camera.y;
	};

	Sphere.prototype.getAction = function() {
		if (this.id === 0) {
			this.xOther = g_game.player.x;
			this.yOther = g_game.player.y;
			this.rOther = g_game.player.r;
		} else {
			this.xOther = g_game.player.spheres[this.id-1].x;
			this.yOther = g_game.player.spheres[this.id-1].y;
			this.rOther = g_game.player.spheres[this.id-1].r;
		}

		if (pointDis(this.x, this.y, this.xOther, this.yOther) >= this.r+this.rOther+this.vision) {
			this.moving = true;
		} else {
			this.moving = false;
		}
	}

	Sphere.prototype.motion = function() {
		if (this.moving) {
			if (this.speed < this.speedMax) {
				this.speed += this.speedMax/this.acc;
				if (this.speed > this.speedMax) {
					this.speed = this.speedMax;
				}
			} else {
				this.speed = this.speedMax;
			}
		} else {
			if (this.speed > 0) {
				this.speed -= this.speedMax/this.friction;
				if (this.speed < 0) {
					this.speed = 0;
				}
			}
		}

		this.dir = pointDir(this.x, this.y, this.xOther, this.yOther);
		this.collision(disDir(this.x, this.y, this.speed, this.dir));
	};

	Sphere.prototype.collision = function(pos) {
		if (pointDis(this.x, this.y, g_game.player.x, g_game.player.y) < this.r+g_game.player.r) {
			pos = disDir(g_game.player.x, g_game.player.y, this.r+g_game.player.r, pointDir(g_game.player.x, g_game.player.y, this.x, this.y));
			this.speed = 0;
		}

		this.x = pos.x;
		this.y = pos.y;
	};

	Sphere.prototype.draw = function() {
		drawObject(this);
		/*g_game.ctx.fillStyle = "#f00";
		g_game.ctx.fillRect(this.tx-g_game.camera.x-4, this.ty-g_game.camera.y-4, 9, 9);*/
	};
})
