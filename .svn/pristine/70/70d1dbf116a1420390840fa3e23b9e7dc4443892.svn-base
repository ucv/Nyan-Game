/**
 * Gère le resize etc
 */
define([
	"jquery",
	"src/utils/debug/Debug",
	"src/utils/Config"
],
function (
	$,
	Debug,
	Config
) {
	var GameContainer = function () {
		this.width = 0;
		this.height = 0;
	}


	/**
	 * Initialise le Canvas et met sa taille en fonction de la taille stocké dans le fichier config ou full screen
	 */
	GameContainer.prototype.init = function () {
		Debug.success("GameContainer inisitalised.");
		if (Config.fullScreen) {
			$('#gameContainer').css("width", window.innerWidth).css("height", window.innerHeight);
		} else {
			$('#gameContainer').css("width", Config.WINDOW_WIDTH).css("height", Config.WINDOW_HEIGHT);
		}
		this.width = $('#gameContainer').width();
		this.height = $('#gameContainer').height();
		$("#gameContainer").attr('unselectable', 'on')
						   .css('user-select', 'none')
						   .on('selectstart', false);
		$("#gameContainer").append("<div id='blackScreen' class='blackScreen'></div>");
		$("#blackScreen").hide();
		window.addEventListener("resize", this.resize.bind(this));
	}


	/**
	 * Resize automatiquement le GameContainer si le jeu est en full screen
	 */
	GameContainer.prototype.resize = function (e) {
		if (Config.fullScreen) {
			$('#gameContainer').css("width", window.innerWidth).css("height", window.innerHeight);
			this.width = $('#gameContainer').width();
			this.height = $('#gameContainer').height();
		}
	}


	return new GameContainer();
});