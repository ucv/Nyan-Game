/**
 * Fait le lien entre tous les loaders pour récuperer le chargement total
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
	 * Met à jour la barre de chargement
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
	 * Permet de savoir l'état de progression total du chargement des assets (0 à 1)
	 */
	LoaderManager.prototype.getProgress = function () {
		return (SoundLoader.getProgress() + SpriteLoader.getProgress()) / 2;
	}


	return new LoaderManager();
});