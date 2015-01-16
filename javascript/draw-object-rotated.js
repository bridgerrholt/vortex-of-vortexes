$(document).ready(function() {
	drawObjectRotated = function(object, dir) {
		x = object.x-g_game.camera.x;
		y = object.y-g_game.camera.y;
		w = g_game.spritesheets[object.spriteCurrent[0]].rects[object.spriteCurrent[1]].w;
		h = g_game.spritesheets[object.spriteCurrent[0]].rects[object.spriteCurrent[1]].h;
		if (x >= -w && y >= -h && x < g_game.canvasW+w && y < g_game.canvasH+h) {
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
				w,
				h,
				-object.xOffset,
				-object.yOffset,
				w,
				h);

			g_game.ctx.restore();
		}
	};
})