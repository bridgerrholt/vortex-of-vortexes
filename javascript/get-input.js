$(document).ready(function() {
	getInput = function() {
		document.addEventListener('mousemove', function(evt) {
			var rect = g_game.canvas.getBoundingClientRect();
			g_game.mouse.x = evt.clientX-rect.left,
			g_game.mouse.y = evt.clientY-rect.top
			var message = 'Mouse position: ' + g_game.mouse.x + ',' + g_game.mouse.y;
			//console.log(message);
		}, false);

		g_canvas.onmousedown = function(e){
			if (g_game.mouseButtons.lp === false) {
				g_game.mouseButtons.lp = true;
			} else {
				g_game.mouseButtons.lp = false;
			}
			g_game.mouseButtons.l = true;
		};

		g_canvas.onmouseup = function(){
			g_game.mouseButtons.l = false;
		};
		
		$(document).keydown(function(e){
			g_game.keys[e.which] = true;
		})
		
		$(document).keyup(function(e){
			g_game.keys[e.which] = false;
			switch(e.which) {
			case 87: // W
				break;
			case 65: // A
				break;
			case 81: // Q
				break;
			default: break;
			}
		})
	};
})