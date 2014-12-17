$(document).ready(function() {
	reset = function() {
		var level = 0;

		g_game.player = new Player(0, 0, 60, 270, level, 1,0);

		if (level === 0) {
			g_game.levelSpheres.push(new LevelSphere(-50, 0, 15, 400, 0, 1, 1, g_game.player.x, g_game.player.y, 3, 1,2));
		}

		if (level <= 1) {
			g_game.levelSphereSlots.push(new LevelSphereSlot(-27, 200, 55, 55, 3,0));
		}

		g_game.levelSphereSlotSpikys.push(new LevelSphereSlotSpiky(-500, 0, 75, 75, 1000, 180, 0.5, 0, 0, 0, 0, 0, 0, 50, 3, 1));
		console.log(g_game.levelSphereSlotSpikys[0]);

		/*var x1 = -200; var y1 = -200; var x2 = -100; var y2 = 0;
		g_game.lines = [new Line(x1, y1, x2, y2, g_game.player.r)];
		x1 = -100; y1 = 0; x2 = 100; y2 = -5;
		g_game.lines.push(new Line(x1, y1, x2, y2, g_game.player.r));
		x1 = 100; y1 = -5; x2 = 105; y2 = 200;
		g_game.lines.push(new Line(x1, y1, x2, y2, g_game.player.r));*/

		var poly = [
			[-50,-50, -40,-50, -40,-40, -50,-40],
			[-51,-50, -40,-50, -40,-40, -51,-40],
			[-52,-50, -40,-50, -40,-40, -52,-40],
			[-53,-50, -40,-50, -40,-40, -53,-40],
			[-52,-50, -40,-50, -40,-40, -52,-40],
			[-51,-50, -40,-50, -40,-40, -51,-40]
		]
		g_game.tails.push(new Tail(poly, "#ff0", 5));

		poly = tailMake([
			[-200,200, 15, 160, 200, true, 180, 1],
			[100, 12, 150, 210, false, 180, 2],
			[120, 190]],
			60, [[],[]]);

		g_game.tails.push(new Tail(poly, "#ff0", 1, true, "#f00"));
		console.log(g_game.tails);

		g_game.camera = {
			x: g_game.player.x-Math.floor(g_game.canvasW/2),
			y: g_game.player.y-Math.floor(g_game.canvasH/2)
		};
	};
});