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

		var poly = [];

		/*var poly = [
			[-50,-50, -40,-50, -40,-40, -50,-40],
			[-51,-50, -40,-50, -40,-40, -51,-40],
			[-52,-50, -40,-50, -40,-40, -52,-40],
			[-53,-50, -40,-50, -40,-40, -53,-40],
			[-52,-50, -40,-50, -40,-40, -52,-40],
			[-51,-50, -40,-50, -40,-40, -51,-40]
		]
		g_game.tails.push(new Tail(poly, "#ff0", 5));*/

		/*poly = tailMake([
			[-200,200, 15, 165, 195, true, 180, 2],
			[50, 12, 150, 210, false, 180, 2],
			[100, 12, 140, 220, true, 180, 2],
			[150, 12, 130, 230, false, 180, 2],
			[220, 190]],
			300, [[],[]]);*/

		/*poly = tailMake([
			[-200,200, 15, 165, 195, true, 180, 2],
			[50, 12, 160, 200, false, 180, 2],
			[50, 12, 150, 210, true, 180, 2],
			[50, 12, 150, 210, false, 180, 4],
			[50, 180]],
			150, [[],[]]);*/

		/*poly = tailMake([
			[-200,200, 20, 10, true, 0, 180, 4],
			[50, 12, 20, false, 0, 4],
			[60, 12, 30, true, 0, 4],
			[70, 12, 50, true, 0, 4],
			[50, 12, 80, false, 0, 4],
			[90, 180]],
			90, [[],[]]);

		g_game.tails.push(new Tail(poly, "#ff0", 20, true, "#f00"));*/

		var pos1 = disDir(0,0, 999, 135);
		/*poly = tailMake([
			[pos.x,pos.y, 5, 25, true, 0, 135, 4],
			[70, 5, 15, true, 0, 4],
			[70, 5, 5, true, 0, 4],
			[70, 5, 5, true, 0, 4],

			[70, 5, 15, false, 0, 4],
			[70, 5, 15, false, 0, 4],
			[70, 5, 15, false, 0, 4],
			[70, 5, 15, false, 0, 4],
			[73, 5, 20, false, 0, 4],
			[75, 5, 20, false, 0, 4],

			[60, 5, 15, true, 0, 4],
			[65, 5, 15, true, 0, 4],
			[70, 5, 15, true, 0, 4],
			[70, 5, 15, true, 0, 4],
			[75, 5, 15, true, 0, 4],
			[75, 5, 15, true, 0, 4],
			[75, 5, 18, true, 0, 4],

			[75, 5, 12, false, 0, 4],
			[75, 5, 15, false, 0, 4],
			[75, 5, 17, false, 0, 4],
			//[75, 4, 14, false, 0, 4],
			//[75, 3, 15, false, 0, 4],
			//[75, 2, 15, false, 0, 4],
			//[71, 2, 15, false, 0, 4],
			//[63, 1, 15, false, 0, 4],
			//[60, 1, 15, false, 0, 4],

			[70, 135]],
			90, [[],[]]);*/

		var spd = 20;
		var spds = [];
		for (var i=0; i<27; i++) {
			spds.push(spd);
			spd += 2;
		}

		var pos2 = disDir(0,0, 999, 133);
		var pos3 = disDir(0,0, 999, 134);
		var pos4 = disDir(0,0, 999, 136);
		var pos5 = disDir(0,0, 999, 137);
		var ext = [pos2.x,pos2.y, pos3.x,pos3.y, pos4.x,pos4.y, pos5.x,pos5.y];
		ext = [];
		var dir = 135;
		/*for (var i=0; i<8; i++) {
			dir -= 2
			pos2 = disDir(0,0, 999, dir)
			ext.push(pos2.x);
			ext.push(pos2.y);
		}
		dir = 135;
		for (var i=0; i<8; i++) {
			dir += 2
			pos2 = disDir(0,0, 999, dir)
			ext.push(pos2.x);
			ext.push(pos2.y);
		}*/

		dir = 135 - 8*2;
		for (var i=0; i<16; i++) {
			dir += 2
			pos2 = disDir(0,0, 999, dir)
			ext.push(pos2.x);
			ext.push(pos2.y);
		}

		console.log(ext);

		poly = tailRealMake(ext, [
			[pos1.x, pos1.y, 135, 50, true],
			[70, 0, 45, 8, 10],
			[70, 0, 40, 11, spds[0]],
			[70, 0, 35, 13, spds[1]],
			[70, 0, 30, 14, spds[2]],
			[70, 0, 26, 14, spds[3]],
			[70, 0, 25, 14, spds[4]],
			[70, 0, 24, 14, spds[5]],
			[70, 0, 23, 14, spds[6]],
			[70, 0, 22, 14, spds[7]],
			[70, 0, 21, 14, spds[8]],
			[70, 0, 20, 14, spds[9]],
			[70, 0, 19, 14, spds[10]],
			[70, 0, 18, 14, spds[11]],
			[70, 0, 17, 14, spds[12]],
			[70, 0, 16, 14, spds[13]],
			[70, 0, 15, 14, spds[14]],
			[70, 0, 14, 14, spds[15]],
			[70, 0, 13, 14, spds[16]],
			[70, 0, 12, 14, spds[17]],
			[70, 0, 11, 14, spds[18]],
			[70, 0, 10, 14, spds[19]],
			[70, 0, 9, 15, spds[20]],
			[70, 0, 8, 15, spds[21]],
			[70, 0, 7, 15, spds[22]],
			[70, 0, 6, 15, spds[23]],
			[70, 0, 5, 15, spds[24]],
			[70, 0, 4, 15, spds[25]]], 20);

		g_game.tails.push(new Tail(poly, "#0a0", 20, true, "#050", 135));

		console.log(poly);
		console.log(g_game.tails);

		g_game.camera = {
			x: g_game.player.x-Math.floor(g_game.canvasW/2),
			y: g_game.player.y-Math.floor(g_game.canvasH/2)
		};
	};
});