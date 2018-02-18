/**
 * popUp for a correct password
 */
define([
	"src/utils/assetsmanager/SpriteManager",
	"src/utils/assetsmanager/SoundManager",
	"src/utils/localization/txt",
	"src/game/server/Account"
],
function (
	SpriteManager,
	SoundManager,
	txt,
	Account
) {
	var GoodPassword = function () {

	}


	/**
	 * Show content in gameContainer
	 */
	GoodPassword.prototype.init = function (UIManager) {
		$("#screenContainer").append("<div id='GoodPassword' class='popUp'></div>");
		$("#blackScreen").show();

		$("#GoodPassword").css("background-image", "url(" + SpriteManager.get("popUp").src + ")")
									  .css("width", "500")
									  .css("height", "300")
									  .css( "left", "300")
									  .css( "top", "190");

		$("#GoodPassword").append("<div class='buttonClose'>" + txt.get("LABEL_POPUP_CLOSEBTN") + "</div>");
		$("#GoodPassword .buttonClose").css("background-image", "url(" + SpriteManager.get("buttonLoginStatic").src + ")")
										.css("background-repeat", "no-repeat")
										.css("width", "160")
									  	.css("height", "60")
									  	.css("background-size", "100% 100%")
										.css("left", "170")
										.css("top", "210")
										.css("font-size", "0.8em")
										.css("padding-top", "3");

		// Hover
		$( "#GoodPassword .buttonClose").hover(function() {
			$( this ).css("background-image", "url(" + SpriteManager.get("buttonLoginSurvol").src + ")");
			$("#GoodPassword .buttonClose").css("background-repeat", "no-repeat");
			SoundManager.play("buttonHover");
		}, function() {
			$( this ).css("background-image", "url(" + SpriteManager.get("buttonLoginStatic").src + ")");
		});

		// Active
		$( "#GoodPassword .buttonClose").mousedown(function() {
			$("#GoodPassword .buttonClose").css("background-image", "url(" + SpriteManager.get("buttonLoginPress").src + ")")
											.css("padding-top", "12");
		});

		$("#GoodPassword .buttonClose").mouseup(function() {
			$("#GoodPassword .buttonClose").css("background-image", "url(" + SpriteManager.get("buttonLoginStatic").src + ")")
											.css("padding-top", "3");
			$("#blackScreen").hide();
			SoundManager.play("meow14");
			UIManager.closeScreen("GoodPassword", true);
			UIManager.closeScreen("Login", true);
			UIManager.addScreen("Menu", true);
		});

		$("#GoodPassword").append("<div class='GoodPasswordText GoodPasswordTitle'>" + txt.get("LABEL_POPUP_GOODPASSWORD_TITLE").replace("%name%", Account.name) + "</div>");
		$("#GoodPassword").append("<div class='GoodPasswordText GoodPasswordDesc'>" + txt.get("LABEL_POPUP_GOODPASSWORD_DESC") + "</div>");

		$("#GoodPasswordText .Title").css("font-size", "0.4em")
	}
	return new GoodPassword();
});