$(document).ready(function() {
	/* dat[]:
		[xStart, yStart, halfWidth, dir, dirPush, face, faceReal, laps], [dis, halfWidth, dir, dirPush, face, laps], [dis, face]

	   ext[]:
		[xRealStart, yRealStart, xEnd, yEnd], [extraX, extraY (put on the the end of the product)]
	*/

	tailMake = function(dat, frames, ext) {
		var obj = [];
		var poly = [];
		var pos1, pos2, pos3;

			// turn dat[] into objects
		obj.push({
			x: dat[0][0],
			y: dat[0][1],
			w: dat[0][2],
			dr: dat[0][3],																// direction field
			drp: dat[0][4],																// dirPush (if increasing or decreasing direction)
			f: dat[0][5],																// face (added to middle of dir, as the starting dir)
			fr: dat[0][6],																// faceReal (where it's pointing)
			l: dat[0][7],																// laps per cycle

			drpc: dat[0][4],															// current dirPush
			drrc: dat[0][6],															// dirRealCurrent (current actual direction facing)
			xc: dat[0][0],																// current x
			yc: dat[0][1]																// current y
		});

		for (var i=1; i<dat.length-1; i++) {
			obj.push({
				ds: dat[i][0],
				w: dat[i][1],
				dr: dat[i][2],
				drp: dat[i][3],
				f: dat[i][4],
				l: dat[i][5],

				drpc: dat[i][3],
				drrc: 0,
				xc: 0,
				yc: 0
			});
		}

		for (var i=0; i<dat.length-1; i++) {
			obj[i].r = obj[i].dr/frames*obj[i].l;										// rate of dir change
			obj[i].drm = obj[i].dr/2;													// middle of dr
			obj[i].drc = obj[i].drm+obj[i].f;											// current dir
		}

		obj.push({
			ds: dat[dat.length-1][0],
			f: dat[dat.length-1][1]
		});

			// build poly[]
		for (var i=0; i<frames; i++) {
			/*if (ext[0].length === 4) {
				poly[i] = [ext[0][2],ext[0][3], obj[0].x,obj[0].y, ext[0][0], ext[0][1]];
			} else {
				pos1 = disDir(obj[0].x, obj[0].y, obj[0].w, obj[0].f-90);		// left side
				pos2 = disDir(obj[0].x, obj[0].y, obj[0].w, obj[0].f+90);		// right side
				poly[i] = [pos1.x, pos1.y, pos2.x, pos2.y];
			}

			for (var j=1; j<obj.length-1; j++) {
				pos3 = disDir(obj[j-1].xc, obj[j-1].yc, obj[j].ds, obj[j-1].drc);
				obj[j].xc = pos3.x;
				obj[j].yc = pos3.y;
				pos1 = disDir(pos3.x, pos3.y, obj[j].w, obj[j].drc-90);		// left side
				pos2 = disDir(pos3.x, pos3.y, obj[j].w, obj[j].drc+90);		// right side
				poly[i].push(pos2.x);
				poly[i].push(pos2.y);
				poly[i].push(pos1.x);
				poly[i].push(pos1.y);

				obj = directionInc(obj, j);
			}

			obj = directionInc(obj, 0);*/


			if (ext[0].length === 4) {
				poly[i] = [
					Math.round(ext[0][2]*100)/100,Math.round(ext[0][3]*100)/100,
					Math.round(obj[0].x*100)/100, Math.round(obj[0].y*100)/100,
					Math.round(ext[0][0]*100)/100,Math.round(ext[0][1]*100)/100];
			} else {
				poly[i] = [Math.round(obj[0].x*100)/100, Math.round(obj[0].y*100)/100];
			}

			var j = 0;
			obj[j].drrc = obj[j].fr+(obj[j].drc-obj[j].drm);
			console.log(obj[j].drrc);

			for (var j=1; j<obj.length-1; j++) {
				obj[j].drrc = obj[j-1].drrc+(obj[j].drc-obj[j].drm);
				pos3 = disDir(obj[j-1].xc, obj[j-1].yc, obj[j].ds, obj[j-1].drrc);
				obj[j].xc = pos3.x;
				obj[j].yc = pos3.y;
				poly[i].push(Math.round(obj[j].xc*100)/100);
				poly[i].push(Math.round(obj[j].yc*100)/100);
				console.log(obj[j].drrc);
			}

			var j = obj.length-1;
			pos3 = disDir(obj[j-1].xc, obj[j-1].yc, obj[j].ds, obj[j-1].drrc);
			obj[j].xc = pos3.x;
			obj[j].yc = pos3.y;
			poly[i].push(Math.round(obj[j].xc*100)/100);
			poly[i].push(Math.round(obj[j].yc*100)/100);

			for (var j=0; j<obj.length-1; j++) {
				directionInc(obj, j);
			}
			/*console.log("real");
			console.log(obj);*/
			
		}

		return poly;

	};

	directionInc = function(obj, i) {
		/*if (obj[i].drpc) {
			obj[i].drc += obj[i].r;
			if (obj[i].dr2 < obj[i].dr1) {
				if (obj[i].drc > obj[i].dr2 && obj[i].drc < obj[i].dr1) {
					obj[i].drc = obj[i].dr2-(obj[i].drc-obj[i].dr2);
					obj[i].drpc = false;
				}
			} else {
				if (obj[i].drc < obj[i].dr1) {
					obj[i].drc = obj[i].dr2-(obj[i].drc+(360-obj[i].dr2));
					obj[i].drpc = false;
				} else if (obj[i].drc > obj[i].dr2) {
					obj[i].drc = obj[i].dr2-(obj[i].drc-obj[i].dr2);
					obj[i].drpc = false;
				}
			}
		} else {
			obj[i].drc -= obj[i].r;
			if (obj[i].dr2 < obj[i].dr1) {
				if (obj[i].drc < obj[i].dr1) {
					obj[i].drc = obj[i].dr1+(obj[i].dr1-obj[i].drc);
					obj[i].drpc = true;
				}
			} else {
				if (obj[i].drc > obj[i].dr2) {
					obj[i].drc = obj[i].dr1+(obj[i].dr1+(360-obj[i].drc));
					obj[i].drpc = true;
				} else if (obj[i].drc < obj[i].dr1) {
					obj[i].drc = obj[i].dr1+(obj[i].dr1-obj[i].drc);
					obj[i].drpc = true;
				}
			}
		}*/

		if (obj[i].drpc) {
			obj[i].drc += obj[i].r;
			if (obj[i].drc > obj[i].dr) {
				obj[i].drc = obj[i].dr-(obj[i].drc-obj[i].dr);
				obj[i].drpc = false;
			}
		} else {
			obj[i].drc -= obj[i].r;
			if (obj[i].drc < 0) {
				obj[i].drc = -obj[i].drc;
				obj[i].drpc = true;
			}
		}

		console.log(obj);

		/*while (obj[i].drc >= 360) {
			obj[i].drc -= 360;
		}

		while (obj[i].drc < 0) {
			obj[i].drc += 360;
		}*/

		/*console.log("fake");
		console.log(obj[i]);*/
	};
})