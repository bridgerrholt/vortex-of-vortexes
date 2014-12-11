$(document).ready(function() {
	init = function() {
		g_game.frameRate = 60;
		g_game.fps = 60;
		g_game.lastTick = new Date;
		g_game.thisTick = new Date;

		g_game.canvas = document.getElementById('main-canvas'),
		g_game.ctx = g_game.canvas.getContext('2d');
		g_game.canvas.width = window.innerWidth;
		g_game.canvas.height = window.innerHeight;
		g_game.canvasW = $("#main-canvas").width();
		g_game.canvasH = $("#main-canvas").height();

		g_game.play = true;


		g_game.mouse = {
			x: 0,
			y: 0
		};

		g_game.mouseButtons = {
			ld: false,				// left down
			lp: false,				// left pressed
			lr: false,				// left released
			
			rd: false,				// right down
			rp: false,				// right pressed
			rr: false				// right released
		};

		for (var i=0; i<=222; i++) {
			g_game.keys[i] = false;
		}

		for (var i=0; i<=222; i++) {
			g_game.keysP[i] = false;
		}


		getInput();

		loadMedia();

		reset();


		if(typeof g_game.gameLoop != "undefined") clearInterval(g_game.gameLoop);
		g_game.gameLoop = setInterval(tick, 1000/g_game.frameRate);
	};
});