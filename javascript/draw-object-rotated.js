$(document).ready(function() {
	drawObjectRotated = function(object, dir) {
		x = object.x-g_game.camera.x;
		y = object.y-g_game.camera.y;
		if (x >= -64 && y >= -64 && x < g_game.canvasW+64 && y < g_game.canvasH+64) {
			g_game.ctx.save();

			g_game.ctx.translate(x, y);
			g_game.ctx.rotate(dir*(Math.PI/180));

			x = x-object.xOffset;
			y = y-object.yOffset;
			//console.log("DRAWING");
			g_game.ctx.drawImage(
				g_game.spritesheets[object.spriteCurrent[0]].img,
				g_game.spritesheets[object.spriteCurrent[0]].rects[object.spriteCurrent[1]].x,
				g_game.spritesheets[object.spriteCurrent[0]].rects[object.spriteCurrent[1]].y,
				g_game.spritesheets[object.spriteCurrent[0]].rects[object.spriteCurrent[1]].w,
				g_game.spritesheets[object.spriteCurrent[0]].rects[object.spriteCurrent[1]].h,
				-object.xOffset,
				-object.yOffset,
				g_game.spritesheets[object.spriteCurrent[0]].rects[object.spriteCurrent[1]].w,
				g_game.spritesheets[object.spriteCurrent[0]].rects[object.spriteCurrent[1]].h);

			g_game.ctx.restore();
		}
	};
})