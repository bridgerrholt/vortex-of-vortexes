$(document).ready(function() {
	reset = function() {
		g_game.player = new Player(0, 0, 60, 270, 0, 1, 0);

		dis = 458.35460051723834;
		//g_game.levelSpheres[g_game.levelSpheres.length] = new LevelSphere(-dis/2, 0, 10, 270, 4, 1, 1, 2);
		g_game.levelSpheres[g_game.levelSpheres.length] = new LevelSphere(-dis/2, 0, 10, 270, 300, 3, 1, 1, 2);

		g_game.camera = {
			x: g_game.player.x-Math.floor(g_game.canvasW/2),
			y: g_game.player.y-Math.floor(g_game.canvasH/2)
		};
	};
});