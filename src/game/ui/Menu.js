/**
 * Ecran de Menu
 */
define([
	"jquery",
	"jquery-ui",
	"src/utils/assetsmanager/SpriteManager",
	"src/utils/assetsmanager/SoundManager",
	"src/utils/localization/txt",
	"src/game/server/Account"
],
function (
	$,
	ui,
	SpriteManager,
	SoundManager,
	txt,
	Account
) {
	var Menu = function () {

	}


	/**
	 * Show content in gameContainer
	 */
	Menu.prototype.init = function (UIManager) {
		$("#screenContainer").append("<div id='Menu'></div>");
		$("#Menu").append("<div class='menuBackground'></div>");

		$("#Menu").append("<div id='menuInfo' class='menuInfo'>" + txt.get("LABEL_MENU_INFOACCOUNT") + Account.name + "</div>");
		$("#menuInfo").hide();
		
		var buttonList = ["LevelSelectBtn", "HighScoreBtn", "OptionsBtn", "HelpBtn", "AboutBtn"];
		var buttonNameList = ["LABEL_MENU_PLAYBTN", "LABEL_MENU_HIGHSCOREBTN", "LABEL_MENU_OPTIONSBTN", "LABEL_MENU_HELPBTN", "LABEL_MENU_ABOUTBTN"];

		setTimeout(function () {
			$("#menuInfo").show("highlight");
		}, buttonList.length * 2 * 100)

		for (var i = 0; i < buttonList.length; i++) {
			// Append
			$("#Menu").append("<div id='" + buttonList[i] + "' class='buttonMenu'>" + txt.get(buttonNameList[i]) + "</div>");
			$("#Menu #" + buttonList[i]).hide();
			setTimeout((function (id) {
				return function () {
					$("#Menu #" + buttonList[id]).show("scale");
					setTimeout(function () {
						if (typeof $("#Options").html() == "undefined") SoundManager.play("buttonBlopEffect");
					}, 300);
				}
			})(i), i * 100)

			$("#Menu #" + buttonList[i]).css("background-image", "url(" + SpriteManager.get("buttonMenuStatic").src + ")");
			$("#Menu #" + buttonList[i]).css("background-repeat", "no-repeat");

			// Hover
			$("#Menu #" + buttonList[i]).hover((function(id) {
				return function () {
					$( this ).css("background-image", "url(" + SpriteManager.get("buttonMenuSurvol").src + ")");
					SoundManager.play("buttonHover");
					$("#Menu #" + buttonList[id]).effect("bounce", { distance: 3, times: 2 }, "fast");
				}
			})(i), function() {
				$( this ).css("background-image", "url(" + SpriteManager.get("buttonMenuStatic").src + ")");
			});

			// Active
			$("#Menu #" + buttonList[i]).mousedown((function(id) {
				return function () {
					$("#Menu #" + buttonList[id]).css("background-image", "url(" + SpriteManager.get("buttonMenuPress").src + ")");
					$("#Menu #" + buttonList[id]).css("padding-top", 12);
				}
			})(i));

			$("#Menu #" + buttonList[i]).mouseup((function(id) {
				return function () {
					$("#Menu #" + buttonList[id]).css("background-image", "url(" + SpriteManager.get("buttonMenuStatic").src + ")");
					$("#Menu #" + buttonList[id]).css("padding-top", 0);
					UIManager.addScreen(buttonList[id].substr(0, buttonList[id].length - 3), true);
					SoundManager.play("meow14");
				}
			})(i));
		};
	}


	return new Menu();
});