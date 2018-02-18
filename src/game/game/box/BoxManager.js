/**
 * Allowing management of all Boxes in the game
 */
define([
],
function (
) {
	var BoxManager = function () {
		this.list = [];
	}


	BoxManager.prototype.update = function () {
		for (var i = 0; i < this.list.length; i++) {
			this.list[i].update();
		};
	}


	/**
	 * Returns a Box's class based on its class
	 */
	BoxManager.prototype.getByXY = function (x, y) {
		for (var i = 0; i < this.list.length; i++) {
			if (this.list[i].position.x == x &&
				this.list[i].position.y == y) {
				return this.list[i];
			}
		};
		return false;
	}


	BoxManager.prototype.destroyAll = function () {
		for (var i = 0; i < this.list.length; i++) {
			this.list[i].destroy();
		};
		this.list = [];
	}


	return new BoxManager();
});