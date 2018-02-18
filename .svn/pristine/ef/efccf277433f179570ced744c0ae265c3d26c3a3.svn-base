/**
 * Class About
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
	var About = function () {

	}


	/**
	 * Affiche le contenu dans popUp
	 */
	About.prototype.init = function (UIManager) {
		$("#screenContainer").append("<div id='About' class='popUp'></div>");
		$("#blackScreen").show();

		$("#screenContainer #About").css("background-image", "url(" + SpriteManager.get("popUp").src + ")")
									  .css("width", "850")
									  .css("height", 444.5)
									  .css( "left", "145" )
									  .css( "top", "160" );

		$("#About").append("<div class='buttonClose'>" + txt.get("LABEL_POPUP_CLOSEBTN") + "</div>");
		$("#About .buttonClose").css("background-image", "url(" + SpriteManager.get("buttonLoginStatic").src + ")")
								.css("left","320px");

		// Hover
		$( "#About .buttonClose").hover(function() {
			$( this ).css("background-image", "url(" + SpriteManager.get("buttonLoginSurvol").src + ")");
			$("#About .buttonClose").css("background-repeat", "no-repeat");
			SoundManager.play("buttonHover");
		}, function() {
			$( this ).css("background-image", "url(" + SpriteManager.get("buttonLoginStatic").src + ")");
		});

		// Active
		$( "#About .buttonClose").mousedown(function() {
			$("#About .buttonClose").css("background-image", "url(" + SpriteManager.get("buttonLoginPress").src + ")");
			$("#About .buttonClose").css("padding-top", 12);
		});

		$("#About .buttonClose").mouseup(function() {
			$("#About .buttonClose").css("background-image", "url(" + SpriteManager.get("buttonLoginStatic").src + ")");
			$("#About .buttonClose").css("padding-top", 8);
			$("#blackScreen").hide();
			SoundManager.play("meow14");
			UIManager.closeScreen("About", true);
		});

		$("#screenContainer #About").append("<div class='aboutText title'>" + txt.get("LABEL_POPUP_ABOUT_TITLE") + "</div>");
		$("#screenContainer #About").append("<div class='aboutText desc'>" + txt.get("LABEL_POPUP_ABOUT_DESC") + "</div>");
	}
	return new About();
});