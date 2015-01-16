$(document).ready(function() {
	drawSprite = function(x, y, sheet, rect) {
		x -= g_game.camera.x;
		y -= g_game.camera.y;

		w = g_game.spritesheets[sheet].rects[rect].w;
		h = g_game.spritesheets[sheet].rects[rect].h;

		if (x >= -w && y >= -h && x < g_game.canvasW+w && y < g_game.canvasH+h) {
			g_game.ctx.drawImage(
				g_game.spritesheets[sheet].img,
				g_game.spritesheets[sheet].rects[rect].x,
				g_game.spritesheets[sheet].rects[rect].y,
				w,
				h,
				x,
				y,
				g_game.spritesheets[sheet].rects[rect].w,
				g_game.spritesheets[sheet].rects[rect].h);
		}
	};
})