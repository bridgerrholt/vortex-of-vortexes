$(document).ready(function() {
	tick = function() {
		g_game.player.update();

		draw();

		g_game.mouseButtons.lp = false;
		g_game.mouseButtons.lr = false;
	};
});