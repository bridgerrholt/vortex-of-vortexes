$(document).ready(function() {
	drawSprite = function(x, y, sheet, rect) {
		x -= g_game.camera.x;
		y -= g_game.camera.y;

		w = g_game.spritesheets[sheet].rects[rect].w;
		wHalf = Math.floor(w/2)+3;
		h = g_game.spritesheets[sheet].rects[rect].h;
		hHalf = Math.floor(h/2)+3;

		if (x >= -wHalf && y >= -hHalf && x < g_game.canvasW+wHalf && y < g_game.canvasH+hHalf) {
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