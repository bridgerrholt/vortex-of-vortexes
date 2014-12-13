$(document).ready(function() {
	drawObjectSpec = function(object, dir) {
		x = object.x-g_game.camera.x;
		y = object.y-g_game.camera.y;
		if (x >= -64 && y >= -64 && x < g_game.canvasW+64 && y < g_game.canvasH+64) {
			g_game.ctx.save();

			//x = x+object.xOffset;
			//y = y+object.yOffset;

			g_game.ctx.translate(x, y);
			g_game.ctx.rotate(dir*(Math.PI/180));

			if (object.hpAble) {
				var cirDis = 0.08;
				var cir;

				/*if (object.hpPercentage > 100) {
					var cir = (100-object.hpPercentage)*(2-cirDis)/100

					//ctx.arc(100,75,50,0*Math.PI,MODIFY_ME*Math.PI);
					// 2 = Full Circle
					g_game.ctx.beginPath();
					g_game.ctx.arc(0, 0, object.r-19, cirDis*Math.PI, cir*Math.PI , false);
					g_game.ctx.strokeStyle = "#fff";
					g_game.ctx.lineWidth = 4;
					g_game.ctx.stroke();
				}*/
				

				cir = (100-object.hpPercentage)*(2-cirDis)/100

				g_game.ctx.beginPath();
				g_game.ctx.arc(0, 0, object.r-19, (cirDis-cir)*Math.PI, -cirDis*Math.PI, false);
				g_game.ctx.strokeStyle = "#0f0";
				g_game.ctx.lineWidth = 4;
				g_game.ctx.stroke();
			}
			


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