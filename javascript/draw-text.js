$(document).ready(function() {
	/*
		[text, color, size, font]
		text = [
			["Hello!", "blue", 25, "Georgia"],
			[12345, "#ff0000", 12, "Times"]
		];
	*/
	drawText = function(text, color, size, font, x, y) {
		y += size;
		g_ctx.font = String(size) + "px " + font;
		g_ctx.fillStyle = color;
		
		for (var i=0; i<text.length; i++) {
			g_ctx.fillText(String(text[i]), x, y);
			y += size;
		}
	};
})