$(document).ready(function() {
	Player = function(x, y, r, dir, lvl, sheet, rect) {
		this.x = x;									// x position
		this.y = y;									// y position
		this.rx = this.x-g_game.camera.x;			// x position on screen (real x)
		this.ry = this.y-g_game.camera.y;			// y position on screen (real y)
		this.r = r;									// radius
		this.dir = dir;								// direction
		this.dis = 0;								// distance to mouse

		this.level = lvl;							// player's level (creates based off this)

		this.shootAble = false;						// if player can shoot
		this.shootDisabled = false;					// if shooting is disabled (for temporary disabling)
		this.shootRecharge = 0;						// the current countdown to next shot
		this.shootRechargeRate = 60;				// the amount of ticks it takes between every shot

		this.moveLock = false;						// if moving is locked or not

		this.speed = 0;								// the current speed
		this.speedMax = 5;							// the maximum speed
		this.friction = 60;							// the amount of ticks taken to slow down completely
		this.acc = 45;								// the amount of ticks taken to speed up completely

		this.spriteCurrent = [sheet, rect];			// id to current sheet and rect [sheet, rect]

		this.xOffset = 56.5;						// x distance from corner to x area of rotation
		this.yOffset = 57.5;						// y distance from corner to y area of rotation

		this.action = 0;							// 0. idle  1. rotating  2. moving  3. moving and rotating
		this.shooting = false;						// if currently shooting or not

		this.levelAdjust();
	};

	Player.prototype.levelAdjust = function() {
		var stats = [];
		if (this.level === 0) {
			stats = [5, 60, 45, [1,0], false, 60];				// [speedMax, friction, acc, spriteCurrent[], shootAble, shootRechargeRate]
		} else if (this.level === 1) {
			stats = [5.5, 60, 45, [1,1], true, 15]
		}

		this.speedMax = stats[0];
		this.friction = stats[1];
		this.acc = stats[2];
		this.spriteCurrent = stats[3];
		this.shootAble = stats[4];
		this.shootRechargeRate = stats[5];
	};

	Player.prototype.update = function() {
		this.rx = this.x-g_game.camera.x;
		this.ry = this.y-g_game.camera.y;
		this.dis = pointDis(this.rx, this.ry, g_game.mouse.x, g_game.mouse.y);

		this.getAction();

		if (this.action !== 0 && this.action != 2) {
			this.setRotation();
		}

		this.motion();
		this.shoot();
	};

	Player.prototype.getAction = function() {
		if (g_game.keysP[81]) {
			this.moveLock = !this.moveLock;
		}


		if (g_game.mouseButtons.ld && this.shootAble && !this.shootDisabled) {
			this.shooting = true;
		} else {
			this.shooting = false;
		}


		this.action = 0;
		if (g_game.keys[16] || this.moveLock) { // shift			// if holding motion button or move locked
			if (this.dis >= this.r+14) {							//   if mouse is out of circle
				this.action = 3;									//     move and rotate
			} else {												//   else mouse is in circle
				if (this.dis >= 5) {								//     if mouse is not in center of circle
					this.action = 1;								//       just rotate
				} else {											//     else mouse is in center of circle
					this.action = 0;								//       don't move or rotate
				}
			}
		} else if (g_game.mouseButtons.rd) {						// else if holding rotate button
			if (this.dis >= 5) {									//   if mouse is not in center of circle
				this.action = 1;									//     just rotate
			} else {												//   else mouse is in center of circle
				this.action = 0;									//     don't move or rotate
			}
		}
	};

	Player.prototype.setRotation = function() {
		this.dir = pointDir(this.rx, this.ry, g_game.mouse.x, g_game.mouse.y);
		if (this.dir >= 360) {
			this.dir -= 360;
		}
	};

	Player.prototype.motion = function() {
		if (this.action === 2 || this.action === 3) {
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

		var pos = disDir(this.x, this.y, this.speed, this.dir);
		this.x = pos.x;
		this.y = pos.y;
	};

	Player.prototype.shoot = function() {
		if (this.shootRecharge === 0) {
			if (this.shooting) {
				var pos = disDir(this.x, this.y, this.r-10, this.dir);
				g_game.bullets[g_game.bullets.length] = new Bullet(pos.x, pos.y, 5, this.dir, 15, 0, 1);
				console.log(g_game.bullets[g_game.bullets.length-1]);

				this.shootRecharge = this.shootRechargeRate;
			}
		} else {
			this.shootRecharge--;
		}
	};


	Player.prototype.draw = function() {
		drawObjectSpec(this, this.dir);
	};
})
