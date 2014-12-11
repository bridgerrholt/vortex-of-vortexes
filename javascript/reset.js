$(document).ready(function() {
	reset = function() {
		g_game.player = new Player(0, 0, 60, 270, 1, 1, 0);

		g_game.camera = {
			x: g_game.player.x-Math.floor(g_game.canvasW/2),
			y: g_game.player.y-Math.floor(g_game.canvasH/2)
		};
	};
});