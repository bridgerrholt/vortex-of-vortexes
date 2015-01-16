$(document).ready(function() {
	Bullet = function(x, y, r, dir, speed, parent, sheet, rect) {
		this.x = x;									// x position
		this.y = y;									// y position
		this.rx = this.x-g_game.camera.x;			// x position on screen (real x)
		this.ry = this.y-g_game.camera.y;			// y position on screen (real y)
		this.r = r;									// radius
		this.dir = dir;								// direction
		this.speed = speed*g_game.speed;			// the current speed
		this.parent = parent;						// the index of the one shooting it

		this.active = true;							// if it is active (moving) or not
		this.released = false;						// if it has made it out of the parent or not

		this.vib = 1;								// current vibrance (shaking)
		this.vibMax = 8*g_game.speed;				// vibrance max
		this.vibInc = 0.4;							// increase of vib per tick

		this.xOffset = 5;							// x distance from corner to x area of rotation
		this.yOffset = 5;							// y distance from corner to y area of rotation

		this.spriteCurrent = [sheet, rect];			// id to current sheet and rect [sheet, rect]
		this.index = g_game.objectAmount;
		g_game.objectAmount++;
	};

	Bullet.prototype.update = function(id) {
		this.motion();

		this.rx = this.x-g_game.camera.x;
		this.ry = this.y-g_game.camera.y;

		this.collision(id);
	};

	Bullet.prototype.motion = function() {
		var pos = disDir(this.x, this.y, this.speed, this.dir);
		if (this.released) {
			this.x = pos.x+Math.floor(((Math.random()*this.vib)-this.vib/2)*100)/100;
			this.y = pos.y+Math.floor(((Math.random()*this.vib)-this.vib/2)*100)/100;

			this.vib += this.vibInc;
			if (this.vib >= this.vibMax) {
				this.vib = this.vibMax;
			}
		} else {
			this.x = pos.x;
			this.y = pos.y;
		}
	};

	Bullet.prototype.collision = function(id) {
		collision = false;
		collided = false;

		if (this.released) {
			if (!(this.rx >= -500 && this.rx < g_game.canvasW+500 && this.ry >= -500 && this.ry < g_game.canvasH+500)) {
				g_game.bullets.splice(id, 1);
			}
		} else {
			if (pointDis(this.x, this.y, g_game.player.x, g_game.player.y) > g_game.player.r+this.r) {
				this.released = true;
			}
		}

		for (var i=0; i<g_game.levelSphereSlots.length; i++) {
			collision = this.collideBox(g_game.levelSphereSlots[i]);
			if (collision) {
				g_game.levelSphereSlots[i].destroy(i);
				collided = true;
			}
		}

		for (var i=0; i<g_game.levelSphereSlotSpikys.length; i++) {
			if (!g_game.levelSphereSlotSpikys[i].dead) {
				collision = this.collideCircle(g_game.levelSphereSlotSpikys[i]);
				if (collision) {
					g_game.levelSphereSlotSpikys[i].destroy(i);
					collided = true;
				}
			}
		}

		if (collided) {
			g_game.bullets.splice(id, 1);
		}
	};

	Bullet.prototype.collideBox = function(obj) {
		if (this.x > obj.x-this.r && this.x < obj.x+obj.w+this.r &&
			this.y > obj.y-this.r && this.y < obj.y+obj.h+this.r) {
			console.log("HIT");
			return true;
		}
		return false;
	};

	Bullet.prototype.collideCircle = function(obj) {
		if (pointDis(this.x, this.y, obj.x, obj.y) < this.r+obj.r) {
			console.log("HIT");
			return true;
		}
		return false;
	};

	Bullet.prototype.draw = function() {
		drawObject(this);
	};
})
