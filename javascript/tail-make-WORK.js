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
			dr1: dat[0][3],																// dir1
			dr2: dat[0][4],
			drp: dat[0][5],																// dirPush
			f: dat[0][6],																// face (starting dir)
			l: dat[0][7],																// laps per cycle

			drc: dat[0][6],																// current dir
			drpc: dat[0][5],															// current dirPush
			xc: dat[0][0],																// current x
			yc: dat[0][1]																// current y
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
				xc: 0,
				yc: 0
			});
		}

		for (var i=0; i<dat.length-1; i++) {
			if (obj[i].dr2 < obj[i].dr1) {
				obj[i].r = (((360-obj[i].dr1)+obj[i].dr2)/frames)*obj[i].l;				// rate of dir change
			} else {
				obj[i].r = ((obj[i].dr2-obj[i].dr1)/frames)*obj[i].l;
			}
				console.log(obj[i].r);
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
				poly[i] = [ext[0][2],ext[0][3], obj[0].x,obj[0].y, ext[0][0], ext[0][1]];
			} else {
				poly[i] = [obj[0].x, obj[0].y];
			}

			for (var j=1; j<obj.length; j++) {
				pos3 = disDir(obj[j-1].xc, obj[j-1].yc, obj[j].ds, obj[j-1].drc);
				obj[j].xc = pos3.x;
				obj[j].yc = pos3.y;
				poly[i].push(obj[j].xc);
				poly[i].push(obj[j].yc);
			}

			for (var j=0; j<obj.length-1; j++) {
				directionInc(obj, j);
			}
			/*console.log("real");
			console.log(obj);*/
			
		}

		return poly;

	};

	directionInc = function(obj, i) {
		if (obj[i].drpc) {
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
		}

		while (obj[i].drc >= 360) {
			obj[i].drc -= 360;
		}

		while (obj[i].drc < 0) {
			obj[i].drc += 360;
		}

		/*console.log("fake");
		console.log(obj[i]);*/
	};
})