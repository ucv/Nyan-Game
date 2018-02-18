/**
 * Class GameScreen
 */
define([
	"src/utils/assetsmanager/SpriteManager",
	"src/utils/assetsmanager/SoundManager",
	"src/utils/localization/txt"
],
function (
	SpriteManager,
	SoundManager,
	txt
) {
	var GameScreen = function () {

	}


	GameScreen.prototype.init = function (UIManager) {
		//Container
		$("#screenContainer").append("<div id='GameScreen'></div>");

		//Background
		$("#GameScreen").css("background-image", "url(" + SpriteManager.get("GameScreenBackground").src + ")")
					  	.css("width", 1136)
					 	.css("height", 640)
					  	.css("background-size","100% 100%");

		/**
		 * hudSpecial
		 * - Title
		 * - Logos
		 */
		$("#GameScreen").append("<div id='hudSpecialText'>" + txt.get("LABEL_HUD_CAPACITE_TITLE") + "</div>");

		//unconsumedSpecial = Number of special (#TODO: change based on level)
		var unconsumedSpecial = 3;

		$("#GameScreen").append("<div id='hudSpecialContainer'></div>")

		for (var i = 0; i < unconsumedSpecial; i++) {
			$("#hudSpecialContainer").append("<div class='hudSpecialLogo' id='specialLogo" + i + "'></div>");
			var hudSpecialOffset = 50 + 60 * i;
			$("#specialLogo" + i).css("left", hudSpecialOffset)
								 .css("background-image", "url(" + SpriteManager.get("hudSpecialLogo").src + ")");
		};


		/**
		 * hudTime
		 * #TODO: match the current second in the div with the id "hudTimeText"
		 */
		$("#GameScreen").append("<div id='hudTimeText'>20s</div>");

		/**
		 * hudActions
		 * #TODO: match Actions with the real action id number = "hudActionNumberText"
		 */
		$("#GameScreen").append("<div id='hudActionContainer'></div>")
		$("#hudActionContainer").append("<div id='hudActionTitleText'>" + txt.get("LABEL_HUD_ACTION_TITLE") + "</div>");
		$("#hudActionContainer").append("<div id='hudActionNumberText'>12</div>");
	}
	return new GameScreen();
});