$(document).ready(function() {
	Player = function(x, y, r, dir, lvl, sheet, rect) {
		this.x = x;											// x position
		this.y = y;											// y position
		this.rx = this.x-g_game.camera.x;					// x position on screen (real x)
		this.ry = this.y-g_game.camera.y;					// y position on screen (real y)
		this.r = r;											// radius
		this.dir = dir;										// direction
		this.dis = 0;										// distance to mouse
		this.velo = new Vector(0, 0);						// velocity as vector

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


		this.hpAble = false;								// if health has been unlocked yet
		this.hp = 0;										// current health
		this.hpMax = 0;										// total health
		this.hpPercentage = 100;							// percent of health left
		this.hpCooldown = 0;								// ticks left before being damaged again
		this.hpCooldownRate = 0/g_game.speed;				// ticks before being damaged again

		this.xOffset = 56.5;								// x distance from corner to x area of rotation
		this.yOffset = 57.5;								// y distance from corner to y area of rotation

		this.action = 0;									// 0. idle  1. rotating  2. moving  3. moving and rotating
		this.shooting = false;								// if currently shooting or not

		this.circleNormal = 0;

		this.dead = false;

		this.spheres = [];

		this.levelAdjust();
		
		this.spriteCurrent = [sheet, rect];					// id to current sheet and rect [sheet, rect]
		this.index = g_game.objectAmount;
		g_game.objectAmount++;
	};

	Player.prototype.levelAdjust = function() {
		var stats = [];
		if (this.level === 0) {
			stats = [5, 60, 45, [1,0], false, 0, false, 0, 0];				// [speedMax, friction, acc, spriteCurrent[], shootAble, shootRechargeRate, hpAble, hpMax,
		} else if (this.level === 1) {									//  hpCooldownRate]
			stats = [5.5, 60, 45, [1,1], true, 15, false, 0, 0];
		} else if (this.level === 2) {
			stats = [5.5, 60, 45, [1,1], true, 15, true, 200, 10];
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
		this.hpCooldownRate = stats[8]/g_game.speed;
	};

	Player.prototype.levelUp = function(type, x, y) {
		this.level += 1;
		if (this.level === 1) {
			this.speedMax += 0.5; this.shootAble = true; this.shootRechargeRate += 15/g_game.speed; this.spriteCurrent[1] = 1;
		} else if (this.level === 2) {
			this.speedMax += 0.25; this.hpAble = true; this.hpMax += 200;
			this.hp = this.hpMax;
			this.hpPercentage = this.hp*100/this.hpMax;
			this.hpCooldownRate += 10/g_game.speed;
		} else if (this.level === 3) {
			this.speedMax += 0.1;
			this.hpMax += 50;
			this.hp = this.hpMax;
			this.hpPercentage = this.hp*100/this.hpMax;
			this.addSphere(type, x, y);
		}
	}

	Player.prototype.addSphere = function(type, x, y) {
		if (this.spheres.length === 0) {
			this.spheres.push(new Sphere(x, y, 15, 0, this.dir, this.speedMax, type, 20, 1,2));
		}
	};

	Player.prototype.damage = function(amount) {
		var dead = false;

		if (this.hpAble) {
			if (this.hpCooldown <= 0) {
				this.hp -= amount;
				this.hpPercentage = this.hp*100/this.hpMax;
				if (this.hp <= 0) {
					this.hp = 0;
					dead = true;
				}
				this.hpCooldown = this.hpCooldownRate;
			}
		} else {
			dead = true;
		}

		if (dead === true) {
			this.dead = true;
			this.die();
		}
	};

	Player.prototype.die = function(amount) {
		this.speed = 0;
		this.hp = this.hpMax;
		this.hpPercentage = this.hp*100/this.hpMax;
		this.x = 0;
		this.y = 0;
	};

	Player.prototype.update = function() {
		/*this.hp -= 1;
		if (this.hp <= 0) {
			this.hp = this.hpMax;
		}
		this.hpPercentage = this.hp*100/this.hpMax;*/

		if (this.hpCooldown > 0) {
			this.hpCooldown -= 1;
		}

		this.rx = this.x-g_game.camera.x;
		this.ry = this.y-g_game.camera.y;
		this.dis = pointDis(this.rx, this.ry, g_game.mouse.x, g_game.mouse.y);

		this.getAction();

		if (this.action !== 0 && this.action != 2) {
			this.setRotation();
		}

		this.motion();
		this.shoot();

		for (var i=0; i<this.spheres.length; i++) {
			this.spheres[i].update();
		}

		this.dead = false;
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
		this.velo.x = pos.x-this.x; this.velo.y = pos.y-this.y;

		for (var i=0; i<g_game.levelSphereSlots.length; i++) {
			pos = this.collideBox(pos, g_game.levelSphereSlots[i]);
		}

		/*for (var i=0; i<g_game.lines.length; i++) {
			pos = this.collideLine(pos, g_game.lines[i]);
		}*/

		for (var i=0; i<g_game.levelSphereSlotSpikys.length; i++) {
			if (!g_game.levelSphereSlotSpikys[i].dead) {
				pos = this.collideCircle(pos, g_game.levelSphereSlotSpikys[i]);
			}
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

		return pos;
	};

	Player.prototype.collideCircle = function(pos, obj) {
		if (pointDis(this.x, this.y, obj.x, obj.y) < this.r+obj.r) {
			pos = disDir(obj.x, obj.y, this.r+obj.r+1, pointDir(obj.x, obj.y, this.x, this.y));

			if (obj.damaging) {
				this.damage(obj.damage);
				if (this.dead) {
					pos.x = this.x;
					pos.y = this.y;
				}
			}
		}

		return pos;
	};

	Player.prototype.collideLine = function(pos, line) {
		var circle = new Vector(pos.x-line.x1, pos.y-line.y1);
		var circleNormal = circle.projectionOn(line.leftNormal);
		var circleLine = circle.projectionOn(line.v);					// calculating line's perpendicular distance to ball

		this.circleNormal = circleNormal;

		if (Math.abs(circleNormal) <= this.r) {
			console.log("Collision 1");
			if (line.v.dotProd(circle) > 0 && circleLine < line.v.length()) {
			//	console.log("Collision 2");
				var lineSeg = new Vector(line.v.x, line.v.y);
			//	console.log("Collision 3");
				lineSeg.setLength(circleLine);
			//	console.log(lineSeg);
			//	console.log("Collision 4");

				var leftNormSeg1 = new Vector(line.leftNormal.x, line.leftNormal.y);
			//	console.log("Collision 5");
				leftNormSeg1.setLength(this.r-1);
			//	console.log("Collision 6");
			//	console.log(leftNormSeg1);
				//vLeftNormSeg1.setMagnitude(circles[i].radius); //uncomment this to check out the error: jittering effect

				var reposition = lineSeg.getAddVector(leftNormSeg1);
			//	console.log(lineSeg);
			//	console.log(leftNormSeg1);
			//	console.log("reposition");
			//	console.log(reposition);
			//	console.log(reposition.x);
			//	console.log("Collision 7");
				pos.x = line.x1+reposition.x;
			//	console.log("Collision 8");
				pos.y = line.y1+reposition.y;
			//	console.log("Collision 9");
			//	console.log(pos);

				var leftNormSeg2 = new Vector(line.leftNormal.x, line.leftNormal.y);
			//	console.log("Collision 10");
				var leftNormSeg2Mag = Math.abs(this.velo.projectionOn(line.leftNormal))
			//	console.log("Collision 11");

				leftNormSeg2.setLength(leftNormSeg2Mag);
			//	console.log("Collision 12");
				var veloAlongLine = this.velo.getAddVector(leftNormSeg2);
			//	console.log("Collision 13");
			//	console.log(pos);

				pos.x += veloAlongLine.x;
			//	console.log("Collision 14");
				pos.y += veloAlongLine.y;
			//	console.log("Collision 15");
			}
		}
		//console.log(pos);
		return pos;
	};

	Player.prototype.shoot = function() {
		if (this.shootRecharge <= 0) {
			if (this.shooting) {
				var pos = disDir(this.x, this.y, this.r-40, this.dir);
				g_game.bullets[g_game.bullets.length] = new Bullet(pos.x, pos.y, 5, this.dir, 15, this.index, 0, 1);
				console.log(g_game.bullets[g_game.bullets.length-1]);

				this.shootRecharge = this.shootRechargeRate;
			}
		} else {
			this.shootRecharge--;
		}
	};


	Player.prototype.draw = function() {
		for (var i=0; i<this.spheres.length; i++) {
			this.spheres[i].draw();
		}

		drawObjectSpec(this, this.dir);
	};
})
