$(document).ready(function() {
	draw = function() {
		g_game.ctx.fillStyle = "#000";
		g_game.ctx.fillRect(0, 0, g_game.canvasW, g_game.canvasH);


		var s = 64;
		for (var y=-1; y<Math.floor(g_game.canvasH/s)+2; y++) {
			for (var x=-1; x<Math.floor(g_game.canvasW/s)+2; x++) {
				//ctx.strokeStyle = "#222";
				//ctx.strokeRect(x*s-camera.x%s, y*s-camera.y%s, s, s);
				g_game.ctx.drawImage(g_game.backgrounds[0], Math.round(x*s-g_game.camera.x%s), Math.round(y*s-g_game.camera.y%s));
			}
		}

		/*g_game.ctx.fillStyle = "#fff";
		g_game.ctx.fillRect(-32-g_game.camera.x, 200-g_game.camera.y, 64, 64);*/


		/*g_game.ctx.fillStyle = "#f00";
		g_game.ctx.fillRect(g_game.player.rx-g_game.player.xOffset, g_game.player.ry-g_game.player.yOffset, 113, 115);*/

		g_game.ctx.save();
		g_game.ctx.translate(0.5, 0.5);

		g_game.player.draw();

		for (var i=0; i<g_game.bullets.length; i++) {
			g_game.bullets[i].draw();
		}
		
		for (var i=0; i<g_game.levelSpheres.length; i++) {
			g_game.levelSpheres[i].draw();
		}
		
		for (var i=0; i<g_game.levelSphereSlots.length; i++) {
			g_game.levelSphereSlots[i].draw();
		}

		drawText([
			"speed: " + String(Math.round(g_game.player.speed*100)/100),
			"fps: " + String(Math.round(g_game.fps*100)/100),
			"reload: " + String(g_game.player.shootRecharge)],
			"#fff", 16, "Times", 3, -1);

		g_game.ctx.restore();
	};
})