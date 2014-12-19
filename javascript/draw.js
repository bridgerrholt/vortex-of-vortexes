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

		drawCircles(0, 0, 1003, 5, [[0, 0, 999, 0, 2, "#050", 10], [0, 0, 994, 0, 2, "#0a0", 2], [0, 0, 1003, 0, 2, "#020", 2]]);
		for (var i=0; i<g_game.tails.length; i++) {
			g_game.tails[i].draw();
		}

		/*g_game.ctx.beginPath();
		g_game.ctx.arc(-g_game.camera.x, -g_game.camera.y, 999, 0*Math.PI, 2*Math.PI);
		g_game.ctx.strokeStyle = "#060";
		g_game.ctx.lineWidth = 10;
		g_game.ctx.stroke();

		g_game.ctx.beginPath();
		g_game.ctx.arc(-g_game.camera.x, -g_game.camera.y, 994, 0*Math.PI, 2*Math.PI);
		g_game.ctx.strokeStyle = "#0b0";
		g_game.ctx.lineWidth = 2;
		g_game.ctx.stroke();

		g_game.ctx.beginPath();
		g_game.ctx.arc(-g_game.camera.x, -g_game.camera.y, 1003, 0*Math.PI, 2*Math.PI);
		g_game.ctx.strokeStyle = "#030";
		g_game.ctx.lineWidth = 2;
		g_game.ctx.stroke();*/


		for (var i=0; i<g_game.bullets.length; i++) {
			g_game.bullets[i].draw();
		}
		
		for (var i=0; i<g_game.levelSpheres.length; i++) {
			g_game.levelSpheres[i].draw();
		}
		
		for (var i=0; i<g_game.levelSphereSlots.length; i++) {
			g_game.levelSphereSlots[i].draw();
		}
		
		for (var i=0; i<g_game.levelSphereSlotSpikys.length; i++) {
			g_game.levelSphereSlotSpikys[i].draw();
		}

		for (var i=0; i<g_game.lines.length; i++) {
			g_game.ctx.beginPath();
			g_game.ctx.strokeStyle = "#fff";
			g_game.ctx.lineWidth = 2;
			g_game.ctx.moveTo(g_game.lines[i].x1-g_game.camera.x, g_game.lines[i].y1-g_game.camera.y);
			g_game.ctx.lineTo(g_game.lines[i].x2-g_game.camera.x, g_game.lines[i].y2-g_game.camera.y);
			g_game.ctx.stroke();
		}

		
		g_game.player.draw();

		drawText([
			"speed: " + String(Math.round(g_game.player.speed*100)/100),
			"fps: " + String(Math.round(g_game.fps*100)/100),
			"reload: " + String(g_game.player.shootRecharge),
			"hp: " + String(g_game.player.hp) + " / " + String(g_game.player.hpMax) + " " + String(g_game.player.hpPercentage) + "%",
			"dir: " + String(g_game.player.dir)],
			"#fff", 16, "Times", 3, -1);

		g_game.ctx.restore();
	};
})