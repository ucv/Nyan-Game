/*
 * Permet d'updater toutes les animations
 */
define([
],
function (
) {
	var AnimationManager = function () {
		this.list = []
	}


	AnimationManager.prototype.update = function () {
		for (var i = 0; i < this.list.length; i++) {
			this.list[i].update();
		};
	}


	return new AnimationManager();
});