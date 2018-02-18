/**
 * Manager qui gère les sprites
 */
define([
],
function (
) {
	var SpriteManager = function () {
		this.list = [];
	}


	/**
	 * Stock une nouvelle image
	 */
	SpriteManager.prototype.push = function (name, img) {
		this.list.push({
			name: name,
			img: img
		});
	}


	/**
	 * Récupère l'objet d'une image grâce à son nom
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