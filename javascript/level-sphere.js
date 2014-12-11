$(document).ready(function() {
	LevelSphere = function(x, y, r, dir, speed, transSpeed, rotation, sheet, rect) {
		this.x = x;									// x position
		this.y = y;									// y position
		this.rx = this.x-g_game.camera.x;			// x position on screen (real x)
		this.ry = this.y-g_game.camera.y;			// y position on screen (real y)
		this.r = r;									// radius
		this.dir = dir;								// direction
		this.speed = speed;							// the current speed

		this.transSpeed = transSpeed;				// the speed to get towards rotating player
		this.transDir = 0;							// the direction to the player
		this.transX = g_game.player.x;				// x of orbit center position
		this.transY = g_game.player.y;				// y pf orbit center position

		this.active = true;							// if it is active (moving) or not
		this.rotation = rotation;					// degree change every tick
		this.rotationAmount = 0;					// amount rotated

		this.xOffset = 5;							// x distance from corner to x area of rotation
		this.yOffset = 5;							// y distance from corner to y area of rotation

		this.spriteCurrent = [sheet, rect];			// id to current sheet and rect [sheet, rect]
	};

	LevelSphere.prototype.update = function(id) {
		this.motion();

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

		this.dir += this.rotation;
		var pos = disDir(this.transX, this.transY, this.speed, this.dir);
		this.x = pos.x;
		this.y = pos.y;
	};

	LevelSphere.prototype.collision = function(id) {
	};

	LevelSphere.prototype.draw = function() {
		drawObject(this);
	};
})
