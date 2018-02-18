/**
 * Connect all the loaders to get total loading
 */
define([
	"src/utils/debug/Debug",
	"src/utils/loader/SoundLoader",
	"src/utils/loader/SpriteLoader",
	"src/game/ui/UIManager"
],
function (
	Debug,
	SoundLoader,
	SpriteLoader,
	UIManager
) {
	var LoaderManager = function () {
		
	}


	/**
	 * Update loading bar
	 */
	LoaderManager.prototype.update = function () {
		if (UIManager.currentScreen.indexOf("LoadScreen") != -1) {
			$('.loadingBar').css("width", this.getProgress() * 900);
			$('.loadingCat').css("left", 45 + this.getProgress() * (945 - 45));
			if (this.getProgress() == 1) {
				UIManager.closeScreen("LoadScreen", true);
				UIManager.addScreen("Login", true);
				Debug.success("Chargement des assets terminé.")
			}
		}
	}


	/*
	 * Lets you know total asset loading progression state (0 to 1)
	 */
	LoaderManager.prototype.getProgress = function () {
		return (SoundLoader.getProgress() + SpriteLoader.getProgress()) / 2;
	}


	return new LoaderManager();
});