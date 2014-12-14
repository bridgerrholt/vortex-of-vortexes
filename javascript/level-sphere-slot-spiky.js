$(document).ready(function() {
	LevelSphereSlotSpiky = function(x, y, w, h, dis, dir, speed, target, xTarget, yTarget, tx, ty, tSpeed, damage, sheet, rect) {
		this.x = x;									// x position
		this.y = y;									// y position
		this.rx = this.x-g_game.camera.x;			// x position on screen (real x)
		this.ry = this.y-g_game.camera.y;			// y position on screen (real y)
		this.dir = dir;								// direction
		this.dis = dis;								// distance from target


		this.w = w;	//75
		this.h = h;

		this.speed = speed;
		this.rot = 0;

		this.target = target;
		this.tSpeed = tSpeed;
		this.tx = 0;
		this.ty = 0;
		this.xTarget = 0;
		this.yTarget = 0;

		if (target === 0) {
			this.tx = tx;
			this.ty = ty;
			this.xTarget = xTarget;
			this.yTarget = yTarget;
		}


		this.xSpawn = Math.floor(w/2);
		this.ySpawn = Math.floor(h/2);
		this.xOffset = this.xSpawn;
		this.yOffset = this.ySpawn;
		this.r = this.xSpawn;

		this.damaging = true;
		this.damage = damage;

		this.dead = false;

		this.active = true;							// if it is active (moving) or not

		this.spriteCurrent = [sheet, rect];			// id to current sheet and rect [sheet, rect]
	};

	LevelSphereSlotSpiky.prototype.update = function() {
		this.motion();

		this.rx = this.x-g_game.camera.x;
		this.ry = this.y-g_game.camera.y;
	};

	LevelSphereSlotSpiky.prototype.motion = function() {
		var pos;


		if (pointDis(this.tx, this.ty, this.xTarget, this.yTarget) <= this.tSpeed) {
			this.tx = this.xTarget;
			this.ty = this.yTarget;
		} else {
			pos = disDir(this.tx, this.ty, this.tSpeed, pointDir(this.tx, this.ty, this.xTarget, this.yTarget));
			console.log(pos);
			this.tx = pos.x;
			this.ty = pos.y;
		}

		this.dir += this.speed;
		this.rot += 1;

		pos = this.collision(disDir(this.tx, this.ty, this.dis, this.dir));

		this.x = pos.x;
		this.y = pos.y;
	};

	LevelSphereSlotSpiky.prototype.collision = function(pos) {
		return pos;
	};

	LevelSphereSlotSpiky.prototype.destroy = function(id) {
		if (!this.dead) {
			g_game.levelSpheres.push(new LevelSphere(this.x, this.y, 15, 0, 0, 0, 0, 0, 0, 0, 1, 2));

			this.dead = true;

			this.spriteCurrent[1] += 1;
			this.w = g_game.spritesheets[this.spriteCurrent[0]].rects[this.spriteCurrent[1]].w;
			this.h = g_game.spritesheets[this.spriteCurrent[0]].rects[this.spriteCurrent[1]].h;
			console.log(this.w);

			this.xSpawn = Math.floor(this.w/2);
			this.ySpawn = Math.floor(this.h/2);
			this.xOffset = this.xSpawn;
			this.yOffset = this.ySpawn;
		}
		//g_game.levelSphereSlots.splice(id, 1);
	};

	LevelSphereSlotSpiky.prototype.draw = function() {
		drawObjectRotated(this, this.rot);
		if (!this.dead) {
			drawSprite(this.x-15, this.y-15, 1, 2);
		}
	};
})
