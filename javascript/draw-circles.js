$(document).ready(function() {
	drawCircles = function(x, y, r, ra, circles) {				// x, y, radius (for drawing distance), radius add, [x (excluding camera), y, radius, start (0 - 2), end, color, width]
		var radius = r+ra;
		if (x >= g_game.camera.x-radius && x <= g_game.camera.x+g_game.canvasW+radius &&
			y >= g_game.camera.y-radius && y <= g_game.camera.y+g_game.canvasH+radius) {
			for (var i=0; i<circles.length; i++) {
				g_game.ctx.beginPath();
				g_game.ctx.arc(circles[i][0]-g_game.camera.x, circles[i][1]-g_game.camera.y, circles[i][2], circles[i][3]*Math.PI, circles[i][4]*Math.PI);
				g_game.ctx.strokeStyle = circles[i][5];
				g_game.ctx.lineWidth = circles[i][6];
				g_game.ctx.stroke();
			}
		}
	};
})