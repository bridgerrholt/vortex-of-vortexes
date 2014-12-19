$(document).ready(function() {
	getLineCircleIntersect = function(x1,y1, x2,y2, cx,cy, r) {
		var baX = x2 - x1;
		var baY = y2 - y1;
		var caX = cx - x1;
		var caY = cy - y1;

		var a = baX*baX + baY*baY;
		var bBy2 = baX*caX + baY*caY;
		var c = caX*caX + caY*caY - r*r;

		var pBy2 = bBy2/a;
		var q = c/a;

		var disc = pBy2*pBy2 - q;
		if (disc < 0) {
			return {
				x: undefined,
				y: undefined
			};
		}
		// if disc == 0 ... dealt with later

		var tmpSqrt = Math.sqrt(disc);
		var abScalingFactor1 = -pBy2 + tmpSqrt;
		var abScalingFactor2 = -pBy2 - tmpSqrt;

		var p1x = x1 - baX*abScalingFactor1;
		var p1y = y1 - baY*abScalingFactor1;

		if (disc == 0) { // abScalingFactor1 == abScalingFactor2
			return {
				x: p1x,
				y: p1y
			};
		}

		var p2x = x1 - baX*abScalingFactor2;
		var p2y = y1 - baY*abScalingFactor2

		// RETURNS CLOSEST TO FIRST POINT

		if (pointDir(x1,y1, p1x,p1y) >= pointDir(x1,y1, p2x,p2y)) {
			return {
				x: p1x,
				y: p1y
			};
		} else {
			return {
				x: p2x,
				y: p2y
			};
		}
    }
})