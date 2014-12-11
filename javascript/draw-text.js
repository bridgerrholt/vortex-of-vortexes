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
		g_game.ctx.font = String(size) + "px " + font;
		g_game.ctx.fillStyle = color;
		
		for (var i=0; i<text.length; i++) {
			g_game.ctx.fillText(String(text[i]), x, y);
			y += size;
		}
	};
})