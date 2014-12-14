$(document).ready(function() {
	Vector = function(x, y) {
		this.x = x;
		this.y = y;
	};

	Vector.prototype.addVector = function(vector) {
		this.x += vector.x;
		this.y += vector.y;
	};

	Vector.prototype.getAddVector = function(vector) {
		return new Vector(this.x+vector.x, this.y+vector.y);
	};

	Vector.prototype.minusVector = function(vector) {
		this.x -= vector.x;
		this.y -= vector.y;
	};

	Vector.prototype.multiplyVector = function(vector) {
		this.x *= vector.x;
		this.y *= vector.y;
	};

	Vector.prototype.getDivideVector = function(vector) {
		return new Vector(this.x/vector.x, this.y/vector.y);
	};

	Vector.prototype.divideVector = function(vector) {
		this.x /= vector.x;
		this.y /= vector.y;
	};

	Vector.prototype.multiply = function(scaler) {
		this.x *= scaler;
		this.y *= scaler;
	};

	Vector.prototype.divide = function(scaler) {
		this.x /= scaler;
		this.y /= scaler;
	};

	Vector.prototype.getDivide = function(scaler) {
		return new Vector(this.x/scaler, this.y/scaler);
	};

	Vector.prototype.dotProd = function(vector) {
		return this.x*vector.x + this.y*vector.y
	};

	Vector.prototype.dot = function(scaler) {
		return this.x*scaler + this.y*scaler
	};
	
	Vector.prototype.length = function() {
		return Math.sqrt(this.x*this.x + this.y*this.y);
	};

	Vector.prototype.lengthSquared = function() {
		return this.x*this.x + this.y*this.y;
	};
	
	Vector.prototype.setLength = function(len) {
		this.normalize();
		this.x *= len;
		this.y *= len;
	}
	
	Vector.prototype.getVectorDirection = function() {
		return new Vector(this.x/this.getMagnitude(), this.y/this.getMagnitude());
	};
	
	Vector.prototype.unit = function() {
		return this.getDivide(this.length());
	};
	
	Vector.prototype.normalize = function(vector) {
		this.divide(this.length());
	};
	
	Vector.prototype.turnLeft = function() {
		this.x = -this.y;
		this.y = this.x;
	};
	
	Vector.prototype.getTurnLeft = function() {
		return new Vector(-this.y, this.x);
	};
	
	Vector.prototype.turnRight = function() {
		this.x = this.y;
		this.y = -this.x;
	};
	
	Vector.prototype.getTurnRight = function() {
		return new Vector(this.y, -this.x);
	};

	Vector.prototype.rotate = function(rads) {
		this.x = this.x*Math.cos(rads)-y*Math.sin(rads);
		this.y = this.y*Math.sin(rads)+y*Math.cos(rads);
	};

	Vector.prototype.getAngle = function() {
		return Math.atan2(this.y, this.x);
	};

	Vector.prototype.projectionOn = function(vector) {
		return this.dotProd(vector.unit());
	};

	Vector.prototype.reset = function() {
		this.x = 0;
		this.y = 0;
	};
})