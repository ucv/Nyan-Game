/**
 * Function for a player's movement
 */
define([
],
function (
) {
	var Move = function () {

	}


	/**
	 * Update the object's position
	 * @this object for which the position should be updated
	 * @Config Ref to Config
	 * @MapManager Ref to MapManager
	 */
	Move.prototype.addPositionUpdate = function (Object, Config, MapManager) {

		/**
		 * Update the player's position graphically depending on its position
		 */
		Object.prototype.positionUpdate = function () {
			// Change its image if it moves or not
			if (Math.abs(this.translateOffset.x) + Math.abs(this.translateOffset.y) == 0) {
				$("#" + this.name).css("background-image", "url(" + this.idleSprite + ")");
			}

			// Update position based on position vector
			if (MapManager.currentMap.length > 0) {
				$("#" + this.name).fadeIn( Config.fadeInMin + Math.random() * (Config.fadeInMax - Config.fadeInMin) );
				$("#" + this.name).css("left", this.xOffset + this.translateOffset.x + Config.mapWidth * this.position.x)
								  .css("top", this.yOffset + this.translateOffset.y + Config.mapHeight * this.position.y);
			} else {
				$("#" + this.name).fadeOut( Config.fadeInMin + Math.random() * (Config.fadeInMax - Config.fadeInMin) );
			}
		}

		/**
		 * Allows translation from one box to another for fluid movement
		 */
		Object.prototype.fluidMovementUpdate = function () {
			// Update translation for fluid movement
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