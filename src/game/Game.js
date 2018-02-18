/*
 * Initialize the game, launch the loaders and kick off the gameLoop
 * To do:
 * -SceneManager
 * -hitbox display + pivot point
 * -Handle languages
 * -function aabb, hitestobject
 */
define([
	"jquery",
	"jquery-ui",
	"src/utils/localization/txt",
	"src/utils/debug/Debug",
	"src/game/game/GameManager",
	"src/utils/loader/SpriteLoader",
	"src/utils/loader/SoundLoader",
	"src/utils/loader/PreLoad",
	"src/utils/Config"
],
function (
	$,
	ui,
	txt,
	Debug,
	GameManager,
	SpriteLoader,
	SoundLoader,
	PreLoad,
	Config
) {
	var Game = function () {

	}


	/*
	 * Initialize the game, launch the loaders and kick off the gameLoop
	 */
	Game.prototype.init = function () {
		Debug.success("Game initialised.");

		// Set the language from localstorage
		var settings = JSON.parse(localStorage.getItem("settings"));
		if (settings == null) settings = {};
		if (typeof settings.language != "undefined") Config.language = settings.language;

		$(document).tooltip(); // Activate tooltips
		
		PreLoad.init(function () {
			SpriteLoader.init();
			SoundLoader.init();
			GameManager.init();
		});
	}


	return new Game();
});