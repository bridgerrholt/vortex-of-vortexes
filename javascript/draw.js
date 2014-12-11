$(document).ready(function() {
	draw = function() {
		g_game.ctx.fillStyle = "#000";
		g_game.ctx.fillRect(0, 0, g_game.canvasW, g_game.canvasH);

		g_game.ctx.fillStyle = "#fff";
		g_game.ctx.fillRect(100-g_game.camera.x, 100-g_game.camera.y, 64, 64);


		/*g_game.ctx.fillStyle = "#f00";
		g_game.ctx.fillRect(g_game.player.rx-g_game.player.xOffset, g_game.player.ry-g_game.player.yOffset, 113, 115);*/

		g_game.ctx.save();
		g_game.ctx.translate(0.5, 0.5);

		g_game.player.draw();

		for (var i=0; i<g_game.bullets.length; i++) {
			g_game.bullets[i].draw();
		}

		drawText([
			"speed: " + String(Math.round(g_game.player.speed*100)/100),
			"fps: " + String(Math.round(g_game.fps*100)/100),
			g_game.bullets.length],
			"#fff", 16, "Times", 3, -1);

		g_game.ctx.restore();
	};
})