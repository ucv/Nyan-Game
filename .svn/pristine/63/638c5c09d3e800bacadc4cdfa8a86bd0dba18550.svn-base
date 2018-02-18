/**
 * popUp "les champs login & mot de passe sont obligatoires"
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
	var NeedPasswordAndLogin = function () {

	}


	/**
	 * Affiche le contenu dans gameContainer
	 */
	NeedPasswordAndLogin.prototype.init = function (UIManager) {
		$("#screenContainer").append("<div id='NeedPasswordAndLogin' class='popUp'></div>");
		$("#blackScreen").show();

		$("#NeedPasswordAndLogin").css("background-image", "url(" + SpriteManager.get("popUp").src + ")")
									  .css("width", "500")
									  .css("height", "300")
									  .css( "left", "300")
									  .css( "top", "190");

		$("#NeedPasswordAndLogin").append("<div class='buttonClose'>" + txt.get("LABEL_POPUP_CLOSEBTN") + "</div>");
		$("#NeedPasswordAndLogin .buttonClose").css("background-image", "url(" + SpriteManager.get("buttonLoginStatic").src + ")")
										.css("background-repeat", "no-repeat")
										.css("width", "160")
									  	.css("height", "60")
									  	.css("background-size", "100% 100%")
										.css("left", "170")
										.css("top", "210")
										.css("font-size", "0.8em")
										.css("padding-top", "3");

		// Hover
		$( "#NeedPasswordAndLogin .buttonClose").hover(function() {
			$( this ).css("background-image", "url(" + SpriteManager.get("buttonLoginSurvol").src + ")");
			$("#NeedPasswordAndLogin .buttonClose").css("background-repeat", "no-repeat");
			SoundManager.play("buttonHover");
		}, function() {
			$( this ).css("background-image", "url(" + SpriteManager.get("buttonLoginStatic").src + ")");
		});

		// Active
		$( "#NeedPasswordAndLogin .buttonClose").mousedown(function() {
			$("#NeedPasswordAndLogin .buttonClose").css("background-image", "url(" + SpriteManager.get("buttonLoginPress").src + ")")
											.css("padding-top", "12");
		});

		$("#NeedPasswordAndLogin .buttonClose").mouseup(function() {
			$("#NeedPasswordAndLogin .buttonClose").css("background-image", "url(" + SpriteManager.get("buttonLoginStatic").src + ")")
											.css("padding-top", "3");
			$("#blackScreen").hide();
			SoundManager.play("meow14");
			UIManager.closeScreen("NeedPasswordAndLogin", true);
		});

		$("#NeedPasswordAndLogin").append("<div class='NeedPasswordAndLoginText NeedPasswordAndLoginTitle'>" + txt.get("LABEL_POPUP_NEEDPASSWORDANDLOGIN_TITLE") + "</div>");
		$("#NeedPasswordAndLogin").append("<div class='NeedPasswordAndLoginText NeedPasswordAndLoginDesc'>" + txt.get("LABEL_POPUP_NEEDPASSWORDANDLOGIN_DESC") + "</div>");

		$("#NeedPasswordAndLoginText .Title").css("font-size", "0.4em")
	}
	return new NeedPasswordAndLogin();
});