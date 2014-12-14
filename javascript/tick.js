$(document).ready(function() {
	tick = function() {
		g_game.thisTick = new Date;
		g_game.fps = 1000/(g_game.thisTick-g_game.lastTick);


		g_game.player.update();

		g_game.camera.x = g_game.player.x-Math.floor(g_game.canvasW/2);
		g_game.camera.y = g_game.player.y-Math.floor(g_game.canvasH/2);

		for (var i=0; i<g_game.bullets.length; i++) {
			g_game.bullets[i].update(i);
		}

		for (var i=0; i<g_game.levelSpheres.length; i++) {
			g_game.levelSpheres[i].update(i);
		}

		for (var i=0; i<g_game.levelSphereSlotSpikys.length; i++) {
			g_game.levelSphereSlotSpikys[i].update(i);
		}


		draw();


		g_game.mouseButtons.lp = false;
		g_game.mouseButtons.lr = false;
		for (var i=0; i<=222; i++) {
			g_game.keysP[i] = false;
		}


		g_game.lastTick = g_game.thisTick;

	};
});