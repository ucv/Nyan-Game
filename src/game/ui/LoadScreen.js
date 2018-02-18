/**
 * Game loading screen
 */
define([
	"src/utils/assetsmanager/SpriteManager",
	"src/utils/assetsmanager/SoundManager",
	"src/utils/localization/txt",
	"src/utils/loader/PreLoad"
],
function (
	SpriteManager,
	SoundManager,
	txt,
	PreLoad
) {
	var LoadScreen = function () {

	}


	/**
	 * Show content in gameContainer
	 */
	LoadScreen.prototype.init = function (UIManager) {
		$("#screenContainer").append("<div id='LoadScreen'></div>");

		var imageList = ["loadingBackground", "loadingBar", "loadingCat"];

		for (var i = 0; i < imageList.length; i++) {
			$("#LoadScreen").append("<div class=" + imageList[i] + "></div>");
			$("#LoadScreen ." + imageList[i]).css("background-image", "url(" + PreLoad.list[i].src + ")");
		}

		// $("#LoadScreen").append("<div class='loadingText'><blink>" + txt.get("LABEL_LOADINGSCREEN_LOADING") + "</blink></div>");
		$("#LoadScreen").append("<div class='loadingText'><blink>" + "Loading the game" + "</blink></div>");
	}


	return new LoadScreen();
});