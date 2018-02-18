/*
 * Vector2 class with usual functions
 */
define([
],
function (
) {
	var Vector2 = function (x, y) {
		if (typeof y === "undefined") {
			this.x = x.x;
			this.y = x.y;
		} else if (typeof x !== "undefined") {
			this.x = x;
			this.y = y;
		} else {
			this.x = 0;
			this.y = 0;
		}
	};

	
	Vector2.prototype.add = function (v2) {
		return new Vector2(
			this.x + v2.x,
			this.y + v2.y
		);
	};


	Vector2.prototype.sub = function (v2) {
		return new Vector2(
			this.x - v2.x,
			this.y - v2.y
		);
	};


	Vector2.prototype.scale = function (scl) {
		return new Vector2(
			this.x * scl,
			this.y * scl
		);
	};


	Vector2.prototype.distance = function (v2) {
		var v3 = new Vector2(v2.x - this.x, v2.y - this.y);
		return v3.length();
	};


	Vector2.prototype.length = function () {
		return Math.sqrt(this.x * this.x + this.y * this.y);
	};


	Vector2.prototype.normalize = function () {
		var l = this.length();
		this.x /= l;
		this.y /= l;
	};


	Vector2.prototype.normalized = function () {
		var l = this.length();
		return new Vector2(
			this.x / l,
			this.y / l
		);
	};


	return Vector2;
});