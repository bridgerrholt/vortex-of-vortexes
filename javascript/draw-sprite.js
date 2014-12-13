$(document).ready(function() {
	drawSprite = function(x, y, sheet, rect) {
		x -= g_game.camera.x;
		y -= g_game.camera.y;
		if (x >= -64 && y >= -64 && x < g_game.canvasW+64 && y < g_game.canvasH+64) {
			g_game.ctx.drawImage(
				g_game.spritesheets[sheet].img,
				g_game.spritesheets[sheet].rects[rect].x,
				g_game.spritesheets[sheet].rects[rect].y,
				g_game.spritesheets[sheet].rects[rect].w,
				g_game.spritesheets[sheet].rects[rect].h,
				x,
				y,
				g_game.spritesheets[sheet].rects[rect].w,
				g_game.spritesheets[sheet].rects[rect].h);
		}
	};
})