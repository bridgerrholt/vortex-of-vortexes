$(document).ready(function() {
	Line = function(x1, y1, x2, y2, r) {
		this.x1 = x1;						// longer so player slides nicely
		this.y1 = y1;
		this.x2 = x2;
		this.y2 = y2;

		this.rx1 = x1;						// actual drawn
		this.ry1 = y1;
		this.rx2 = x2;
		this.ry2 = y2;

		this.radialAdjust(r);

	};

	Line.prototype.radialAdjust = function(r) {
		var pos;

		pos = disDir(this.rx1, this.ry1, r, pointDir(this.rx2, this.ry2, this.rx1, this.ry1));
		this.x1 = pos.x;
		this.y1 = pos.y;

		pos = disDir(this.rx2, this.ry2, r, pointDir(this.rx1, this.ry1, this.rx2, this.ry2));
		this.x2 = pos.x;
		this.y2 = pos.y;

		this.v = new Vector(this.x2-this.x1, this.y2-this.y1);
		this.leftNormal = this.v.getTurnLeft();
		this.rightNormal = this.v.getTurnRight();
	};
})