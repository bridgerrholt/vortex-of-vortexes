$(document).ready(function() {
	reset = function() {
		var level = 0;

		g_game.player = new Player(0, 0, 60, 270, level, 1,0);

		if (level === 0) {
			g_game.levelSpheres[g_game.levelSpheres.length] = new LevelSphere(-50, 0, 10, 400, 0, 1, 1, g_game.player.x, g_game.player.y, 3, 1,2)
		}

		if (level <= 1) {
			g_game.levelSphereSlots[g_game.levelSphereSlots.length] = new LevelSphereSlot(-32, 200, 64, 64, 2,8);
		}

		g_game.camera = {
			x: g_game.player.x-Math.floor(g_game.canvasW/2),
			y: g_game.player.y-Math.floor(g_game.canvasH/2)
		};
	};
});