$(document).ready(function() {
	LevelSphere = function(x, y, r, dis, dir, target, speed, tx, ty, tSpeed, sheet, rect) {
		this.x = x;									// x position
		this.y = y;									// y position
		this.rx = this.x-g_game.camera.x;			// x position on screen (real x)
		this.ry = this.y-g_game.camera.y;			// y position on screen (real y)
		this.r = r;									// radius
		this.dir = dir;								// direction
		this.dis = dis;								// distance from target
		this.xStart = x;							// x starting position
		this.yStart = y;							// y starting position

		this.target = target;						// 0. none  1. player
		this.speed = speed*g_game.speed;			// the amount of directional change per tick

		this.tSpeed = tSpeed*g_game.speed;			// the speed to get towards rotating player
		this.tDir = 0;								// the direction to the player
		this.tx = tx;								// center of orbit x
		this.ty = ty;								// center of orbit y

		this.active = true;							// if it is active (moving) or not

		this.xOffset = 15;							// x distance from corner to x area of rotation
		this.yOffset = 15;							// y distance from corner to y area of rotation

		this.type = 0;								// 0. white basic  1. red health  2. yellow agility  ...

		this.spriteCurrent = [sheet, rect];			// id to current sheet and rect [sheet, rect]
	};

	LevelSphere.prototype.update = function(id) {
		if (this.target != 0) {
			this.motion();
		}

		this.rx = this.x-g_game.camera.x;
		this.ry = this.y-g_game.camera.y;

		this.collision(id);
	};

	LevelSphere.prototype.motion = function() {
		/*if (this.rotationAmount === 180) {
			if (this.rotationAmount === 180) {
				console.log("REAL" + String(this.x));
			} else {
				console.log(x);
			}
		}*/

		/*var pos = disDir(this.x, this.y, this.speed, this.dir);
		this.x = pos.x;
		this.y = pos.y;


		this.transDir = pointDir(this.x, this.y, g_game.player.x, g_game.player.y);
		pos = disDir(this.x, this.y, this.transSpeed, this.transDir);
		this.x = pos.x;
		this.y = pos.y;

		this.dir += this.rotation;
		if (this.dir >= 360) {
			this.dir -= 360;
		}

		this.rotationAmount += this.rotation;*/

		var pos;

		if (pointDis(this.xStart, this.yStart, g_game.player.x, g_game.player.y) > g_game.nestSizes[0]*2.5) {
			console.log("greater");
			if (this.tx != this.xStart && this.ty != this.yStart) {
				if (pointDis(this.tx, this.ty, this.xStart, this.yStart) <= this.tSpeed) {
					this.tx = this.xStart;
					this.ty = this.yStart;
				} else {
					pos = disDir(this.tx, this.ty, this.tSpeed, pointDir(this.tx, this.ty, this.xStart, this.yStart));
					this.tx = pos.x;
					this.ty = pos.y;
				}
			}
		} else {
			if (pointDis(this.tx, this.ty, g_game.player.x, g_game.player.y) <= this.tSpeed) {
				this.tx = g_game.player.x;
				this.ty = g_game.player.y;
			} else {
				pos = disDir(this.tx, this.ty, this.tSpeed, pointDir(this.tx, this.ty, g_game.player.x, g_game.player.y));
				this.tx = pos.x;
				this.ty = pos.y;
			}
		}


		this.dir += this.speed;
		pos = disDir(this.tx, this.ty, this.dis, this.dir);
		this.x = pos.x;
		this.y = pos.y;
	};

	LevelSphere.prototype.collision = function(id) {
		if (pointDis(this.x, this.y, g_game.player.x, g_game.player.y) <= this.r+g_game.player.r) {
			/*g_game.player.level++;
			g_game.player.levelAdjust();*/
			g_game.player.levelUp(this.type, this.x, this.y);
			g_game.levelSpheres.splice(id, 1);
		}
	};

	LevelSphere.prototype.draw = function() {
		drawObject(this);
		/*g_game.ctx.fillStyle = "#f00";
		g_game.ctx.fillRect(this.tx-g_game.camera.x-4, this.ty-g_game.camera.y-4, 9, 9);*/
	};
})
