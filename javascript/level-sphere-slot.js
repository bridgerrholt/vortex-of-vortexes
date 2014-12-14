$(document).ready(function() {
	LevelSphereSlot = function(x, y, w, h, sheet, rect) {
		this.x = x;									// x position
		this.y = y;									// y position
		this.rx = this.x-g_game.camera.x;			// x position on screen (real x)
		this.ry = this.y-g_game.camera.y;			// y position on screen (real y)

		this.xOffset = 0;
		this.yOffset = 0;

		this.w = w;
		this.h = h;

		this.xSpawn = Math.floor(w/2);
		this.ySpawn = Math.floor(h/2);

		this.active = true;							// if it is active (moving) or not

		this.spriteCurrent = [sheet, rect];			// id to current sheet and rect [sheet, rect]
	};

	LevelSphereSlot.prototype.update = function(id) {
		this.rx = this.x-g_game.camera.x;
		this.ry = this.y-g_game.camera.y;
	};

	LevelSphereSlot.prototype.destroy = function(id) {
		g_game.levelSpheres.push(new LevelSphere(this.x+this.xSpawn, this.y+this.ySpawn, 15, 0, 0, 0, 0, 0, 0, 0, 1, 2));

		g_game.levelSphereSlots.splice(id, 1);
	};

	LevelSphereSlot.prototype.draw = function() {
		drawObject(this);
		drawSprite(this.x+this.xSpawn-15, this.y+this.ySpawn-15, 1, 2);
	};
})
