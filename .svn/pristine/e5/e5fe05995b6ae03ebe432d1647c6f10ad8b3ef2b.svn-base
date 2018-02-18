/**
 * Fonction pour le deplacement du joueur
 */
define([
],
function (
) {
	var Move = function () {

	}


	/**
	 * Update la position de l'objet
	 * @this Objet dont la position doit être updaté
	 * @Config Ref vers Config
	 * @MapManager Ref vers MapManager
	 */
	Move.prototype.addPositionUpdate = function (Object, Config, MapManager) {

		/**
		 * Update la position du joueur graphiquement en foncton de sa position
		 */
		Object.prototype.positionUpdate = function () {
			// Change son image si il ce deplace ou non.
			if (Math.abs(this.translateOffset.x) + Math.abs(this.translateOffset.y) == 0) {
				$("#" + this.name).css("background-image", "url(" + this.idleSprite + ")");
			}

			// Update position par rapport au vecteur de position
			if (MapManager.currentMap.length > 0) {
				$("#" + this.name).fadeIn( Config.fadeInMin + Math.random() * (Config.fadeInMax - Config.fadeInMin) );
				$("#" + this.name).css("left", this.xOffset + this.translateOffset.x + Config.mapWidth * this.position.x)
								  .css("top", this.yOffset + this.translateOffset.y + Config.mapHeight * this.position.y);
			} else {
				$("#" + this.name).fadeOut( Config.fadeInMin + Math.random() * (Config.fadeInMax - Config.fadeInMin) );
			}
		}

		/**
		 * Permet de faire une translation d'une case à l'autre pour un deplacement fluide
		 */
		Object.prototype.fluidMovementUpdate = function () {
			// Update translation pour les mouvement fluide
			if (Math.abs(this.translateOffset.x) > Config.translationSpeed + 1) {
				this.translateOffset.x += Config.translationSpeed * this.translateOffset.x / Math.abs(this.translateOffset.x) * -1;
			} else {
				this.translateOffset.x = 0;
			}
			if (Math.abs(this.translateOffset.y) > Config.translationSpeed + 1) {
				this.translateOffset.y += Config.translationSpeed * this.translateOffset.y / Math.abs(this.translateOffset.y) * -1;
			} else {
				this.translateOffset.y = 0;
			}
		}
		
	}

	return new Move();
});