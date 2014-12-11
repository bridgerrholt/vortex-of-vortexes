$(document).ready(function() {
	loadMedia = function() {
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
			[228, 0, 31, 31]]
		)

		console.log(g_game.spritesheets[1]);



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