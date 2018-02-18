/**
 * Game screen
 */
define([
	"src/utils/assetsmanager/SpriteManager",
	"src/utils/assetsmanager/SoundManager",
	"src/utils/localization/txt",
	"src/game/game/MapManager"
],
function (
	SpriteManager,
	SoundManager,
	txt,
	MapManager
) {
	var GameStage = function () {

	}


	GameStage.prototype.init = function (UIManager) {
		$("#screenContainer").append("<div id='GameStage'></div>");
		$("#screenContainer").css("position","absolute");


		//Background
		$("#GameStage").css("background-image", "url(" + SpriteManager.get("GameStageBackground").src + ")")
					   .css("width", 1136)
					   .css("height", 640)
					   .css("background-size","100% 100%")
					   .css("position","absolute");

		/**
		 * hudSpecial
		 * - Title
		 * - Logos
		 */
		$("#GameStage").append("<div id='hudSpecialText'>" + txt.get("LABEL_HUD_CAPACITE_TITLE") + "</div>");

		var unconsumedSpecial = 3;

		$("#GameStage").append("<div id='hudSpecialContainer'></div>")

		var alineaDeBase = 50;
		var ecart = 60;

		for (var i = 0; i < unconsumedSpecial; i++) {
			$("#hudSpecialContainer").append("<div class='hudSpecialLogo' id='specialLogo" + i + "'></div>");
			var hudSpecialOffset = alineaDeBase + ecart * i;
			$("#specialLogo" + i).css("left", hudSpecialOffset)
								 .css("background-image", "url(" + SpriteManager.get("hudSpecialLogo").src + ")");
		};


		/**
		 * hudTime
		 */
		$("#GameStage").append("<div id='hudTimeText'>0s</div>");

		/**
		 * hudActions
		 */
		$("#GameStage").append("<div id='hudActionContainer'></div>")
		$("#hudActionContainer").append("<div id='hudActionTitleText'>" + txt.get("LABEL_HUD_ACTION_TITLE") + "</div>");
		$("#hudActionContainer").append("<div id='hudActionNumberText'>0</div>");

		/**
		 * hudPar
		 */
		$("#GameStage").append("<div id='hudParContainer'></div>")
		$("#hudActionContainer").append("<div id='hudParTitleText'>" + txt.get("LABEL_HUD_PAR_TITLE") + "</div>");
		$("#hudActionContainer").append("<div id='hudParNumberText'>" + MapManager.levelPar + "</div>");



		/**
		 * Right section
		 */
		var buttonList = ["MenuBtn", "OptionsBtn", "HelpBtn", "ResetBtn", "UndoBtn", "RedoBtn"];
		var buttonNameList = ["LABEL_MENU_MENUBTN", "LABEL_MENU_OPTIONSBTN", "LABEL_MENU_HELPBTN", "LABEL_MENU_RESETBTN", "LABEL_MENU_UNDOBTN", "LABEL_MENU_REDOBTN"];

		$("#GameStage").append("<div id='menuContainer'></div>");

		for (var i = 0; i < buttonList.length; i++) {
			// Append
			$("#menuContainer").append("<div id='" + buttonList[i] + "' class='buttonMenu'></div>");
			$("#menuContainer #" + buttonList[i]).hide();
			setTimeout((function (id) {
				return function () {
					$("#menuContainer #" + buttonList[id]).show("scale");
					setTimeout(function () {
						if (typeof $("#Options").html() == "undefined") SoundManager.play("buttonBlopEffect");
					}, 300);
				}
			})(i), i * 100)

			$("#menuContainer #" + buttonList[i]).css("background-image", "url(" + SpriteManager.get(buttonList[i] + "Static").src + ")");
			$("#menuContainer #" + buttonList[i]).css("background-repeat", "no-repeat");

			// Hover
			$("#menuContainer #" + buttonList[i]).hover((function(id) {
				return function () {
					console.log(buttonList[id] + "Hover");
					$( this ).css("background-image", "url(" + SpriteManager.get(buttonList[id] + "Hover").src + ")");
					SoundManager.play("buttonHover");
				}
			})(i), (function(id) {
				return function () {
					$( this ).css("background-image", "url(" + SpriteManager.get(buttonList[id] + "Static").src + ")");
				}
			}(i)));

			// Active
			$("#menuContainer #" + buttonList[i]).mousedown((function(id) {
				return function () {
					$("#menuContainer #" + buttonList[id]).css("background-image", "url(" + SpriteManager.get(buttonList[id] + "Active").src + ")");
					$("#menuContainer #" + buttonList[id]).css("padding-top", 3);
				}
			})(i));

			$("#menuContainer #" + buttonList[i]).mouseup((function(id) {
				return function () {
					$("#menuContainer #" + buttonList[id]).css("background-image", "url(" + SpriteManager.get(buttonList[id] + "Static").src + ")");
					$("#menuContainer #" + buttonList[id]).css("padding-top", 0);
					if (buttonList[id] == "MenuBtn") {
						UIManager.closeScreen("GameStage", false);
						MapManager.removeMap();
					}
					console.log(buttonList[id]);
					if (buttonList[id] == "UndoBtn") {
						MapManager.undo();
					}
					if (buttonList[id] == "RedoBtn") {
						MapManager.redo();
					}
					if (buttonList[id] == "ResetBtn") {
						MapManager.removeMap('level' + MapManager.levelNum);
					}
					switch(buttonList[id]){
						case "MenuBtn":
						case "OptionsBtn":
						case "HelpBtn":
							UIManager.addScreen(buttonList[id].substr(0, buttonList[id].length - 3), true);
							SoundManager.play("meow14");
							break;
					}

				}
			})(i));
		};
	}


	return new GameStage();
});