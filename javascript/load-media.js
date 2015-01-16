$(document).ready(function() {
	loadMedia = function() {
		g_game.backgrounds[g_game.backgrounds.length] = new Image();
		g_game.backgrounds[g_game.backgrounds.length-1].src = "resources/images/background-001.png";
		console.log(g_game.backgrounds);

		var src = "resources/images/sprite-sheet-";

		g_game.spritesheets[g_game.spritesheets.length] = loadSprite (
			src + "000.png", [
			[0,0,9,9], [0,9,9,9], [9,0,41,41]]
		)
		console.log(g_game.spritesheets[0]);

		g_game.spritesheets[g_game.spritesheets.length] = loadSprite (
			src + "001.png", [
			[0, 0, 113, 115],
			[114, 0, 113, 115],
			[228, 0, 31, 31],
			[0, 116, 113, 115]]
		)
		console.log(g_game.spritesheets[1]);

		g_game.spritesheets[g_game.spritesheets.length] = loadSprite (
			src + "002.png", [
			[0,0,64,64],[64,0,64,64],[128,0,64,64],
			[0,64,64,64],[128,64,64,64],
			[0,128,64,64],[64,128,64,64],[128,128,64,64],
			[64,64,64,64],
			[192,0,64,64],[192,64,64,64],[192,128,64,64],[192,192,64,64]]
		)
		console.log(g_game.spritesheets[2]);

		g_game.spritesheets[g_game.spritesheets.length] = loadSprite (
			src + "003.png", [
			[0,0,55,55], [56,0,75,75], [132, 0, 65, 89], [0, 76, 95, 95]]
		)
		console.log(g_game.spritesheets[3]);



    /*game.cursor_rects = [Rect(0,0,9,9)]
    game.player_rects = [[Rect(0,0,113,115)],[Rect(113,0,113,115)],[Rect(226,0,31,31)]]
    game.bullet_rects = [[Rect(0,9,9,9)]]
    game.box_rects = [[Rect(0,0,64,64),Rect(64,0,64,64),Rect(128,0,64,64),
                       Rect(0,64,64,64),Rect(128,64,64,64),
                       Rect(0,128,64,64),Rect(64,128,64,64),Rect(128,128,64,64),
                       Rect(64,64,64,64),
                       Rect(192,0,64,64),Rect(192,64,64,64),Rect(192,128,64,64),Rect(192,192,64,64)]]
    game.teleport_dot_rects = [[Rect(9,0,41,41)]]*/

	};

	loadSprite = function(source, rects) {
		var recs = [];
		for (var i=0; i<rects.length; i++) {
			recs[recs.length] = {x: rects[i][0], y: rects[i][1], w: rects[i][2], h: rects[i][3]}
		}

		image = {
			img: new Image(),
			rects: recs
		};

		image.img.src = source;

		return image;
	};
})