$(document).ready(function() {
	drawObject = function(object) {
		x = object.x-g_game.camera.x;
		y = object.y-g_game.camera.y;
		if (x >= -64 && y >= -64 && x < g_game.canvasW+64 && y < g_game.canvasH+64) {
			x = x-object.xOffset;
			y = y-object.yOffset;
			//console.log("DRAWING");
			g_game.ctx.drawImage(
				g_game.spritesheets[object.spriteCurrent[0]].img,
				g_game.spritesheets[object.spriteCurrent[0]].rects[object.spriteCurrent[1]].x,
				g_game.spritesheets[object.spriteCurrent[0]].rects[object.spriteCurrent[1]].y,
				g_game.spritesheets[object.spriteCurrent[0]].rects[object.spriteCurrent[1]].w,
				g_game.spritesheets[object.spriteCurrent[0]].rects[object.spriteCurrent[1]].h,
				x,
				y,
				g_game.spritesheets[object.spriteCurrent[0]].rects[object.spriteCurrent[1]].w,
				g_game.spritesheets[object.spriteCurrent[0]].rects[object.spriteCurrent[1]].h);
		}
	};
})