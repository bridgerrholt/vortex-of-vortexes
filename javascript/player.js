$(document).ready(function() {
	Player = function(x, y, r, dir, lvl, sheet, rect) {
		this.x = x;											// x position
		this.y = y;											// y position
		this.rx = this.x-g_game.camera.x;					// x position on screen (real x)
		this.ry = this.y-g_game.camera.y;					// y position on screen (real y)
		this.r = r;											// radius
		this.dir = dir;										// direction
		this.dis = 0;										// distance to mouse

		this.level = lvl;									// player's level (creates based off this)

		this.shootAble = false;								// if player can shoot
		this.shootDisabled = false;							// if shooting is disabled (for temporary disabling)
		this.shootRecharge = 0;								// the current countdown to next shot
		this.shootRechargeRate = 0/g_game.speed;			// the amount of ticks it takes between every shot

		this.moveLock = false;								// if moving is locked or not

		this.speed = 0;										// the current speed
		this.speedMax = 5*g_game.speed;						// the maximum speed
		this.friction = 60/g_game.speed;					// the amount of ticks taken to slow down completely
		this.acc = 45/g_game.speed;							// the amount of ticks taken to speed up completely

		this.spriteCurrent = [sheet, rect];					// id to current sheet and rect [sheet, rect]

		this.hpAble = false;								// if health has been unlocked yet
		this.hp = 0;										// current health
		this.hpMax = 0;										// total health
		this.hpPercentage = 100;							// percent of health left

		this.xOffset = 56.5;								// x distance from corner to x area of rotation
		this.yOffset = 57.5;								// y distance from corner to y area of rotation

		this.action = 0;									// 0. idle  1. rotating  2. moving  3. moving and rotating
		this.shooting = false;								// if currently shooting or not

		this.lSide = false;
		this.uSide = false;
		this.rSide = false;
		this.dSide = false;

		this.levelAdjust();
	};

	Player.prototype.levelAdjust = function() {
		var stats = [];
		if (this.level === 0) {
			stats = [5, 60, 45, [1,0], false, 0, false, 0];				// [speedMax, friction, acc, spriteCurrent[], shootAble, shootRechargeRate, hpAble, hpMax]
		} else if (this.level === 1) {
			stats = [5.5, 60, 45, [1,1], true, 15, false, 0];
		} else if (this.level === 2) {
			stats = [5.5, 60, 45, [1,1], true, 15, true, 200];
		}

		this.speedMax = stats[0]*g_game.speed;
		this.friction = stats[1]/g_game.speed;
		this.acc = stats[2]/g_game.speed;
		this.spriteCurrent = stats[3];
		this.shootAble = stats[4];
		this.shootRechargeRate = stats[5]/g_game.speed;
		this.hpAble = stats[6];
		this.hpMax = stats[7];
		this.hp = this.hpMax;
	};

	Player.prototype.levelUp = function() {
		this.level += 1;
		if (this.level === 1) {
			this.speedMax += 0.5; this.shootAble = true; this.shootRechargeRate += 15/g_game.speed; this.spriteCurrent[1] = 1;
		} else if (this.level === 2) {
			this.speedMax += 0.25; this.hpAble = true; this.hpMax += 200;
			this.hp = this.hpMax;
			this.hpPercentage = this.hp*100/this.hpMax;
		}
	}

	Player.prototype.update = function() {
		/*this.hp -= 1;
		if (this.hp <= 0) {
			this.hp = this.hpMax;
		}*/

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


		if ((g_game.mouseButtons.ld || g_game.keys[32]) && this.shootAble && !this.shootDisabled) {
			this.shooting = true;
		} else {
			this.shooting = false;
		}


		this.action = 0;
		if (g_game.keys[16] || this.moveLock) { // shift					// if holding motion button or move locked
			if (this.dis >= this.r+10) {									//   if mouse is out of circle
				this.action = 3;											//     move and rotate
			} else {														//   else mouse is in circle
				if (this.dis >= 5) {										//     if mouse is not in center of circle
					this.action = 1;										//       just rotate
				} else {													//     else mouse is in center of circle
					this.action = 0;										//       don't move or rotate
				}
			}
		} else if (g_game.mouseButtons.rd) {								// else if holding rotate button
			if (this.dis >= 5) {											//   if mouse is not in center of circle
				this.action = 1;											//     just rotate
			} else {														//   else mouse is in center of circle
				this.action = 0;											//     don't move or rotate
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

		//var pos = disDir(this.x, this.y, this.speed, this.dir);
		this.collision(disDir(this.x, this.y, this.speed, this.dir));
		//this.x = pos.x;
		//this.y = pos.y;
	};

	Player.prototype.collision = function(pos) {
		for (var i=0; i<g_game.levelSphereSlots.length; i++) {
			pos = this.collideBox(pos, g_game.levelSphereSlots[i])
		}

		this.x = pos.x;
		this.y = pos.y;
	};

	Player.prototype.collideBox = function(pos, obj) {
		var lSide = obj.x-this.r;
		var uSide = obj.y-this.r;
		var rSide = obj.x+obj.w+this.r;
		var dSide = obj.y+obj.h+this.r;

		if (pos.x > lSide && pos.x < rSide  &&  this.y > uSide && this.y < dSide) {
			if (pos.x > this.x) {
				pos.x = lSide;
			} else if (pos.x < this.x) {
				pos.x = rSide;
			}
		}

		if (pos.y > uSide && pos.y < dSide  &&  this.x > lSide && this.x < rSide) {
			if (pos.y > this.y) {
				pos.y = uSide;
			} else if (pos.y < this.y) {
				pos.y = dSide;
			}
		}

		/*if self.x < bo.x+63+63-TEST and self.x > bo.x-63+TEST and self.l_y < bo.y+63+63-TEST and self.l_y > bo.y-63+TEST:
			if self.x < self.l_x:
				self.x = bo.x+63+63-TEST
			elif self.x > self.l_x:
				self.x = bo.x-63+TEST
		if self.l_x < bo.x+63+63-TEST and self.l_x > bo.x-63+TEST and self.y < bo.y+63+63-TEST and self.y > bo.y-63+TEST:
			if self.y < self.l_y:
				self.y = bo.y+63+63-TEST
			elif self.y > self.l_y:
				self.y = bo.y-63+TEST*/

		/*if (pos.x > obj.x-this.r && pos.x < obj.x+obj.w+this.r &&
			pos.y > obj.y-this.r && pos.y < obj.y+obj.h+this.r) {
			if (pos.x )
		}*/

		/*var lSide = (pos.x+this.r >= obj.x && pos.x+this.r <= obj.x+obj.w);
		var uSide = (pos.y+this.r >= obj.y && pos.y+this.r <= obj.y+obj.h);
		var rSide = (pos.x-this.r <= obj.x+obj.w && pos.x-this.r >= obj.x);
		var dSide = (pos.y-this.r <= obj.y+obj.h && pos.y-this.r >= obj.y);

		if ((lSide || rSide) && (uSide || dSide)) {					// collision!
			if (lSide && pos.x > this.x) {
				pos.x = obj.x-this.r;
			} else if (rSide && pos.x < this.x) {
				pos.x = obj.x+obj.w+this.r;
			}

			if (uSide && pos.y > this.y) {
				pos.y = obj.y-this.r;
			} else if (dSide && pos.y < this.y) {
				pos.y = obj.y+obj.h+this.r;
			}
		}

		this.x = pos.x;
		this.y = pos.y;
		this.lSide = lSide;
		this.uSide = uSide;
		this.rSide = rSide;
		this.dSide = dSide;*/

		return pos;
	};

	Player.prototype.shoot = function() {
		if (this.shootRecharge <= 0) {
			if (this.shooting) {
				var pos = disDir(this.x, this.y, this.r-40, this.dir);
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
