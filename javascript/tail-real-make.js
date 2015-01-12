$(document).ready(function() {
	/* ext[]:
		[extraX1,extraY1, extraX2,extraY2] (put on the start of the product)

	   dat[]:
		[x, y, dirReal, width, dirPush], [dis, dir, width, +rotateFieldStart, -rotateFieldEnd, offset, delayPoint]
	*/

	tailRealMake = function(ext, dat, frames) {
		var obj = [];
		var poly = [];
		var polyBack = [];
		var pos1, pos2, pos3, pos4, pos5, pos6, pos7, pos8, pos9;
		var x1, y1, x2, y2;
		var cx, cy, r;

		var framesQuart = Math.floor(frames/4);

			// turn dat[] into objects
		obj.push({
			x: dat[0][0],
			y: dat[0][1],
			dr: dat[0][2],
			w: dat[0][3],
			drp: dat[0][4],																// directionPush (if increasing or decreasing direction)

			xc: dat[0][0],
			yc: dat[0][1],
			drr: dat[0][2],
			drrc: dat[0][2]
		});

		for (var i=1; i<dat.length; i++) {
			obj.push({
				ds: dat[i][0],
				dr: dat[i][1],
				w: dat[i][2],
				/*rf1: dat[i][3],
				rf2: dat[i][4],*/
				dlp: dat[i][3],															// delayPoint (when rate slows)

				drr: obj[i-1].drr+dat[i][1]
			});

			obj[i].off = dat.length-i;
			obj[i].drpc = obj[0].drp;
			while(obj[i].off >= framesQuart || obj[i].off < -framesQuart) {
				if (obj[i].off >= framesQuart) {
					obj[i].off = framesQuart-1-(obj[i].off-framesQuart);
					obj[i].drpc = false;
				} else {
					obj[i].off = -framesQuart-1+(-framesQuart-obj[i].off);
					obj[i].drpc = true;
				}
			}

			obj[i].drrc = obj[i].drr;

			pos1 = disDir(obj[i-1].x,obj[i-1].y, obj[i].ds, obj[i].drrc);
			x1 = pos1.x;
			y1 = pos1.y;
			obj[i].x = x1;
			obj[i].y = y1;

			cx = obj[i-1].x;
			cy = obj[i-1].y;
			r = pointDis(cx,cy, x1,y1);
			//console.log(r);
			obj[i].cx = cx;
			obj[i].cy = cy;
			obj[i].rad = r;

			/*pos1 = disDir(obj[i].x,obj[i].y, obj[i].rf1, obj[i].drrc-90);				// left side
			//pos2 = disDir(pos1.x,pos1.y, 20, obj[i].drrc+180);							// line to circle
			pos2 = disDir(pos1.x,pos1.y, 20,
				pointDir(pos1.x,pos1.y, cx,cy));							// line to circle
			pos3 = getLineCircleIntersect(pos1.x,pos1.y, pos2.x,pos2.y, cx,cy, r);

			pos1 = disDir(obj[i].x,obj[i].y, obj[i].rf2, obj[i].drrc+90);				// right side
			//pos2 = disDir(pos1.x,pos1.y, 20, obj[i].drrc+180);							// line to circle
			pos2 = disDir(pos1.x,pos1.y, 20,
				pointDir(pos1.x,pos1.y, cx,cy));							// line to circle
			pos4 = getLineCircleIntersect(pos1.x,pos1.y, pos2.x,pos2.y, cx,cy, r);

			obj[i].rf1r = pointDir(cx,cy, pos3.x,pos3.y);								// rotateFieldRealStart
			obj[i].rf2r = pointDir(cx,cy, pos4.x,pos4.y);								// rotateFieldRealEnd*/

			obj[i].rf1r = obj[i].drrc-dat[i][4];
			obj[i].rf2r = obj[i].drrc+dat[i][4];

			obj[i].rf = Math.abs(obj[i].rf2r-obj[i].rf1r);								// angle between rotateFieldStart and rotateFieldEnd
			obj[i].rfm = obj[i].rf/2;													// rotateFieldMiddle (half of the angle between rf1 & rf2)
			obj[i].r = obj[i].rf/(frames*2.5);												// rate of directional change
			obj[i].drc = obj[i].rfm+obj[i].off*obj[i].r;								// current dir

			pos1 = disDir(cx,cy, r, obj[i].drrc);
			obj[i].xc = pos1.x;
			obj[i].yc = pos1.y;
		}

			// build poly[]
		for (var i=0; i<frames; i++) {
			//console.log(obj);
			poly.push([]);
			polyBack.push([]);

			for (var j=0; j<ext.length; j++) {
				poly[i].push(roundFloat(ext[j], 2));
			}

			if (ext.length === 0) {
				pos1 = disDir(obj[0].x, obj[0].y, obj[0].w, obj[0].dr-90);					// left side
				pos2 = disDir(obj[0].x, obj[0].y, obj[0].w, obj[0].dr+90);					// right side
				polyBack[i].splice(0, 0, roundFloat(pos1.x, 2));
				polyBack[i].splice(1, 0, roundFloat(pos1.y, 2));
				poly[i].push(roundFloat(pos2.x, 2));
				poly[i].push(roundFloat(pos2.y, 2));
			}

			for (var j=1; j<obj.length; j++) {
				obj[j].drrc = obj[j].drr+(obj[j].drc-obj[j].rfm);
				if (j === 2) {
					console.log(String(j) + "  " + String(obj[j].off) + "  " + String(obj[j].drrc));
				}
				pos3 = disDir(obj[j-1].xc, obj[j-1].yc, obj[j].ds, obj[j].drrc);			// CHANGE BACK TO .x & .y
				obj[j].xc = pos3.x;
				obj[j].yc = pos3.y;

				if (j != obj.length-1) {
					pos1 = disDir(pos3.x, pos3.y, obj[j].w, obj[j].drrc-90);				// left side
					pos2 = disDir(pos3.x, pos3.y, obj[j].w, obj[j].drrc+90);				// right side
					polyBack[i].splice(0, 0, roundFloat(pos1.x, 2));
					polyBack[i].splice(1, 0, roundFloat(pos1.y, 2));
					//if (ext.length !== 0 && j != 1) {
						poly[i].push(roundFloat(pos2.x, 2));
						poly[i].push(roundFloat(pos2.y, 2));
					//}

				} else {
					poly[i].push(roundFloat(obj[j].xc, 2));
					poly[i].push(roundFloat(obj[j].yc, 2));
				}


				//console.log(obj[j].drrc);
			}

			for (var j=1; j<obj.length; j++) {
				directionInc(obj, j, framesQuart);
			}
			
		}

		for (var i=0; i<poly.length; i++) {
			for (var j=0; j<polyBack[i].length; j++) {
				poly[i].push(polyBack[i][j]);
			}
		}

		console.log("polyBack");
		console.log(polyBack);
		return poly;

	};

	var directionInc = function(obj, i, framesQuart) {
		if (obj[i].drpc) {
			obj[i].off += 1;
		} else {
			obj[i].off -= 1;
		}

		while(obj[i].off >= framesQuart || obj[i].off < -framesQuart) {
			if (obj[i].off >= framesQuart) {
				obj[i].off = framesQuart-1-(obj[i].off-framesQuart);
				obj[i].drpc = false;
			} else {
				obj[i].off = -framesQuart-1+(-framesQuart-obj[i].off);
				obj[i].drpc = true;
			}
		}

		var off;

		if (obj[i].off >= obj[i].dlp) {
			off = obj[i].dlp;
		} else if (obj[i].off <= -obj[i].dlp+1) {
			off = -obj[i].dlp+1;
		} else {
			off = obj[i].off;
		}
		obj[i].drc = obj[i].rfm+off*obj[i].r;								// current dir
	};
})