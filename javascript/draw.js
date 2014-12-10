$(document).ready(function() {
	draw = function() {
		if (g_win) {
			g_ctx.fillStyle = "#d0ffd0";
		} else {
			g_ctx.fillStyle = "#f0f0f0";
		}

		g_ctx.fillRect(0, 0, g_canvasW, g_canvasH);
		g_ctx.strokeStyle = "#000";
		g_ctx.strokeRect(0, 0, g_canvasW, g_canvasH);

		var boxDraw = -1;

		for (var i=0; i<g_boxes.length; i++) {
			g_boxes[i].draw()


			if (g_mouse.x >= g_boxes[i].x && g_mouse.y >= g_boxes[i].y &&
				g_mouse.x < g_boxes[i].x+g_boxes[i].w && g_mouse.y < g_boxes[i].y+g_boxes[i].h) {
				boxDraw = i;
			}
		}

		var x = "";
		var y = "";
		var w = "";
		var h = "";
		var id = "";

		if (boxDraw !== -1) {
			x = String(g_boxes[boxDraw].x);
			y = String(g_boxes[boxDraw].y);
			w = String(g_boxes[boxDraw].w);
			h = String(g_boxes[boxDraw].h);
			id = String(g_boxes[boxDraw].id);
		}

		/*drawText(["Mouse X: " + String(g_mouse.x), "Mouse Y: " + String(g_mouse.y), "Mouse Pess: " + String(g_mouseButtons.lp),
			"Box X: " + x, "Box Y: " + y, "Box W: " + w, "Box H: " + h, "Box ID: " + id], "#000", 16, "Times", 2, 0);*/

		drawText([/*"Mouse X: " + String(g_mouse.x), "Mouse Y: " + String(g_mouse.y),*/
			"Count: " + String(g_boxCount), "Search: " + String(g_boxSearch)], "#000", 16, "Times", 2, 0);
	};
})