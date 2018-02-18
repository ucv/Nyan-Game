/**
 * popUp for a wrong password or already existing account
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
	var WrongPassword = function () {

	}


	/**
	 * Show content in gameContainer
	 */
	WrongPassword.prototype.init = function (UIManager) {
		$("#screenContainer").append("<div id='WrongPassword' class='popUp'></div>");
		$("#blackScreen").show();

		$("#WrongPassword").css("background-image", "url(" + SpriteManager.get("popUp").src + ")")
									  .css("width", "500")
									  .css("height", "300")
									  .css( "left", "300")
									  .css( "top", "190");

		$("#WrongPassword").append("<div class='buttonClose'>" + txt.get("LABEL_POPUP_CLOSEBTN") + "</div>");
		$("#WrongPassword .buttonClose").css("background-image", "url(" + SpriteManager.get("buttonLoginStatic").src + ")")
										.css("background-repeat", "no-repeat")
										.css("width", "160")
									  	.css("height", "60")
									  	.css("background-size", "100% 100%")
										.css("left", "170")
										.css("top", "210")
										.css("font-size", "0.8em")
										.css("padding-top", "3");

		// Hover
		$( "#WrongPassword .buttonClose").hover(function() {
			$( this ).css("background-image", "url(" + SpriteManager.get("buttonLoginSurvol").src + ")");
			$("#WrongPassword .buttonClose").css("background-repeat", "no-repeat");
			SoundManager.play("buttonHover");
		}, function() {
			$( this ).css("background-image", "url(" + SpriteManager.get("buttonLoginStatic").src + ")");
		});

		// Active
		$( "#WrongPassword .buttonClose").mousedown(function() {
			$("#WrongPassword .buttonClose").css("background-image", "url(" + SpriteManager.get("buttonLoginPress").src + ")")
											.css("padding-top", "12");
		});

		$("#WrongPassword .buttonClose").mouseup(function() {
			$("#WrongPassword .buttonClose").css("background-image", "url(" + SpriteManager.get("buttonLoginStatic").src + ")")
											.css("padding-top", "3");
			$("#blackScreen").hide();
			SoundManager.play("meow14");
			UIManager.closeScreen("WrongPassword", true);
		});

		$("#WrongPassword").append("<div class='wrongPasswordText wrongPasswordTitle'>" + txt.get("LABEL_POPUP_WRONGPASSWORD_TITLE") + "</div>");
		$("#WrongPassword").append("<div class='wrongPasswordText wrongPasswordDesc'>" + txt.get("LABEL_POPUP_WRONGPASSWORD_DESC") + "</div>");

		$("#wrongPasswordText .Title").css("font-size", "0.4em")
	}

	
	return new WrongPassword();
});