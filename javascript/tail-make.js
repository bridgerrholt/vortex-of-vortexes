$(document).ready(function() {
	/* dat[]:
		[xStart, yStart, halfWidth, dir1 (always >= counter-clockwise than dir2), dir2, dirPush, face, laps], [dis, halfWidth, dir1, dir2, dirPush, face, laps], [dis, face]

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
			dr1: dat[0][3],												// dir1
			dr2: dat[0][4],
			drp: dat[0][5],												// dirPush
			f: dat[0][6],												// face (starting dir)
			l: dat[0][7],												// laps per cycle

			drc: dat[0][6],												// current dir
			drpc: dat[0][5],											// current dirPush
		});

		for (var i=1; i<dat.length-1; i++) {
			obj.push({
				ds: dat[i][0],
				w: dat[i][1],
				dr1: dat[i][2],
				dr2: dat[i][3],
				drp: dat[i][4],
				f: dat[i][5],
				l: dat[i][6],

				drc: dat[i][5],
				drpc: dat[i][4],
			});
		}

		for (var i=0; i<dat.length-1; i++) {
			if (obj[i].dr2 < obj[i].dr1) {
				obj[i].r = frames/((360-obj[i].dr1)+dr2);				// rate of dir change
			} else {
				obj[i].r = frames/(obj[i].dr2-obj[i].dr1);
			}
		}

		obj.push({
			ds: dat[dat.length-1][0],
			f: dat[dat.length-1][1]
		});

			// build poly[]
		for (var i=0; i<frames; i++) {
			if (ext[0].length === 4) {
				poly[i] = [ext[0][2],ext[0][3], obj[0].x,obj[0].y, ext[0][0], ext[0][1]];
			} else {
				pos1 = disDir(obj[0].x, obj[0].y, obj[0].w, obj[0].f-90);		// left side
				pos2 = disDir(obj[0].x, obj[0].y, obj[0].w, obj[0].f+90);		// right side
				poly[i] = [pos1.x, pos1.y, pos2.x, pos2.y];
			}

			for (var j=1; j<obj.length-1; j++) {
				pos1 = disDir(obj[j-1].xc, obj[j-1].yc, obj[j].ds, obj[j-1].drc);

				directionInc(obj, j);
			}

			directionInc(obj, 0);
		}

		return poly;

	};

	directionInc = function(obj, i) {
		if (obj[i].dpc) {
			obj[i].drc += obj[i].r;
			if (obj[i].dr2 < obj[i].dr1) {
				if (obj[i].drc > obj[i].dr2 && obj[i].drc < obj[i].dr1) {
					obj[i].drc = obj[i].dr2-(obj[i].drc-obj[i].dr2);
				}
			} else {
				if (obj[i].drc < obj[i].dr1) {
					obj[i].drc = obj[i].dr2-(obj[i].drc+(360-obj[i].dr2));
				} else if (obj[i].drc > obj[i].dr2) {
					obj[i].drc = obj[i].dr2-(obj[i].drc-obj[i].dr2);
				}
			}
		} else {
			obj[i].drc -= obj[i].r;
			if (obj[i].dr2 < obj[i].dr1) {
				if (obj[i].drc < obj[i].dr1) {
					obj[i].drc = obj[i].dr1+(obj[i].dr1-obj[i].drc);
				}
			} else {
				if (obj[i].drc > obj[i].dr2) {
					obj[i].drc = obj[i].dr1+(obj[i].dr1+(360-obj[i].drc));
				} else if (obj[i].drc < obj[i].dr1) {
					obj[i].drc = obj[i].dr1+(obj[i].dr1-obj[i].drc);
				}
			}
		}

		while (obj[i].drc >= 360) {
			obj[i].drc -= 360;
		}
		while (obj[i].drc < 0) {
			obj[i].drc += 360;
		}

		//return obj;
	};
})