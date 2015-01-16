$(document).ready(function() {
	drawObject = function(object) {
		x = object.x-g_game.camera.x;
		y = object.y-g_game.camera.y;
		w = g_game.spritesheets[object.spriteCurrent[0]].rects[object.spriteCurrent[1]].w;
		h = g_game.spritesheets[object.spriteCurrent[0]].rects[object.spriteCurrent[1]].h;

			//console.log(object.x + ',' + object.y);
			//console.log(x >= -w && y >= -h && x < g_game.canvasW+w && y < g_game.canvasH+h);

		if (x >= -w && y >= -h && x < g_game.canvasW+w && y < g_game.canvasH+h) {
			x = x-object.xOffset;
			y = y-object.yOffset;
			//console.log("DRAWING");
			g_game.ctx.drawImage(
				g_game.spritesheets[object.spriteCurrent[0]].img,
				g_game.spritesheets[object.spriteCurrent[0]].rects[object.spriteCurrent[1]].x,
				g_game.spritesheets[object.spriteCurrent[0]].rects[object.spriteCurrent[1]].y,
				w,
				h,
				x,
				y,
				w,
				h);
		}
	};
})