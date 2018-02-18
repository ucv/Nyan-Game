/**
 * Manage sprites
 */
define([
],
function (
) {
	var SpriteManager = function () {
		this.list = [];
	}


	/**
	 * Store new image
	 */
	SpriteManager.prototype.push = function (name, img) {
		this.list.push({
			name: name,
			img: img
		});
	}


	/**
	 * Grab image object from its name
	 */
	SpriteManager.prototype.get = function (name) {
		for (var i = 0; i < this.list.length; i++) {
			if (this.list[i].name == name) {
				return this.list[i].img;
			}
		}
	}


	return new SpriteManager();
});