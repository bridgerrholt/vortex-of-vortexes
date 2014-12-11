$(document).ready(function() {
	getInput = function() {
		$(document).on('contextmenu', 'canvas', function(e) {
			return false;
		});

		document.addEventListener('mousemove', function(evt) {
			var rect = g_game.canvas.getBoundingClientRect();
			g_game.mouse.x = evt.clientX-rect.left,
			g_game.mouse.y = evt.clientY-rect.top
			var message = 'Mouse position: ' + g_game.mouse.x + ',' + g_game.mouse.y;
			//console.log(message);
		}, false);

		g_game.canvas.onmousedown = function(e) {
			var left, right;
			left = (navigator.appName == "Microsoft Internet Explorer") ? 1 : 0;
			right = 2;

			if (e.button === left) {
				if (g_game.mouseButtons.lp === false) {
					g_game.mouseButtons.lp = true;
				} else {
					g_game.mouseButtons.lp = false;
				}
				g_game.mouseButtons.ld = true;
			} else if (e.button === right) {
				if (g_game.mouseButtons.rp === false) {
					g_game.mouseButtons.rp = true;
				} else {
					g_game.mouseButtons.rp = false;
				}
				g_game.mouseButtons.rd = true;
			}
		};

		g_game.canvas.onmouseup = function(e) {
			var left, right;
			left = (navigator.appName == "Microsoft Internet Explorer") ? 1 : 0;
			right = 2;

			if (e.button === left) {
				g_game.mouseButtons.ld = false;
			} else if (e.button === right) {
				g_game.mouseButtons.rd = false;
			}
		};
		
		$(document).keydown(function(e) {
			if (g_game.keys[e.which] === false) {
				g_game.keysP[e.which] = true;
				g_game.keys[e.which] = true;
			}
		})
		
		$(document).keyup(function(e) {
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

		$(window).resize(function() {
			g_game.canvas.width = window.innerWidth;
			g_game.canvas.height = window.innerHeight;
			g_game.canvasW = $("#main-canvas").width();
			g_game.canvasH = $("#main-canvas").height();
		});
	};
})