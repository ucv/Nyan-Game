define([
	"src/utils/Config"
],
function (
	Config
) {
	/**
	 * Game configuration
	 */
	var Config = function () {
		/**
		 * Game information
		 */
		this.version = "1.0.0";
		this.local = true; // if the request happens locally or via web server
		this.language = "en";
		this.availableLanguage = [
			"de",
			"en",
			"es",
			"fr",
			"it",
			"pl"
		];

		// TODO: change me!
		var localhost = 'http://localhost:8888/sokoban/bin/localization/';
		var webhost = 'http://localhost:8888/sokoban/bin/localization/';
		this.xliffPath = this.local ? localhost : webhost; // Path towards xliff files

		/**
		 * Screen settings
		 */
		this.fullScreen = false;
		this.ratio = 16 / 9;
		this.WINDOW_WIDTH = 1136; // Si fullScreen = false
		this.WINDOW_HEIGHT = 640; // *
		this.SAFE_ZONE_WIDTH = 2048;
		this.SAFE_ZONE_HEIGHT = 1366;

		/*
		 * Debug settings
		 */
		this.debug = true; // Active/Desactive logs in the console
		this.guiDebug = true; // Active/Desactive the debugging gui
		this.fps = false; // Active/Desactive fps counter
		this.ms = false; // Active/Desactive ms per frame counter
		this.showHitbox = false; // Active/Desactive hitbox display
		this.showPivot = false; // Active/Desactive pivot point display


		/**
		 * Game
		 */

		// Total number of levels
		this.totalLevel = 15;

		// Map size
		this.mapSizeX = 11;
		this.mapSizeY = 11;
		this.mapWidth = 61;
		this.mapHeight = 61;

		// Map loading effect
		this.fadeInMin = 0;
		this.fadeInMax = 400;

		// UI Manager
		this.changeScreenFadeDelay = 500; // Transition time between two screens

		// Translation speed
		this.translationSpeed = 15;
	}


	return new Config();
});