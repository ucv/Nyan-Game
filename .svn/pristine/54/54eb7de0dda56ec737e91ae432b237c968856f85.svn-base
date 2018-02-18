/**
 * Load tout les sons du jeu
 */
define([
	"underscore",
	"howler",
	"src/utils/debug/Debug",
	"src/utils/assetsmanager/SoundManager"
],
function (
	_,
	howler,
	Debug,
	SoundManager
) {
	var SoundLoader = function () {
		this.baseFolder = "assets/sound/";

		this.list = [
			{
				name: "nyan_8bit",
				path: this.baseFolder + "music/nyan_8bit.mp3",
				volume: 50,
				type: "music"
			},
			{
				name: "nyan_elevator",
				path: this.baseFolder + "music/nyan_elevator.mp3",
				volume: 50,
				type: "music"
			},
			{
				name: "nyan_multigenre",
				path: this.baseFolder + "music/nyan_multigenre.mp3",
				volume: 50,
				type: "music"
			},
			{
				name: "nyan_part_drumandbass",
				path: this.baseFolder + "music/nyan_part_drumandbass.mp3",
				volume: 50,
				type: "music"
			},
			{
				name: "nyan_part_dubstep",
				path: this.baseFolder + "music/nyan_part_dubstep.mp3",
				volume: 50,
				type: "music"
			},
			{
				name: "nyan_part_electro",
				path: this.baseFolder + "music/nyan_part_electro.mp3",
				volume: 50,
				type: "music"
			},
			{
				name: "nyan_part_rock",
				path: this.baseFolder + "music/nyan_part_rock.mp3",
				volume: 50,
				type: "music"
			},
			{
				name: "nyan_part_trance",
				path: this.baseFolder + "music/nyan_part_trance.mp3",
				volume: 50,
				type: "music"
			},
			{
				name: "buttonHover",
				path: this.baseFolder + "sfx/buttonHover.wav",
				volume: 20,
				type: "sfx"
			},
			{
				name: "buttonBlopEffect",
				path : this.baseFolder + "sfx/buttonBlopEffect.mp3",
				volume: 50,
				type: "sfx"
			},
			{
				name: "buttonPress",
				path: this.baseFolder + "sfx/buttonPress.mp3",
				volume: 50,
				type: "sfx"
			},
			{
				name: "buttonForbidden",
				path: this.baseFolder + "sfx/buttonForbidden.mp3",
				volume: 100,
				type: "sfx"
			},
			{
				name: "playerMove",
				path: this.baseFolder + "sfx/playerMove.mp3",
				volume: 100,
				type: "sfx"
			}
		];

		/**
		 * Push les 23 sons de miaulements
		 */
		for (var i = 0; i < 16; i++) {
			this.list.push({
				name: "meow" + i,
				path: this.baseFolder + "sfx/meow/meow" + i + ".mp3",
				volume: 50,
				type: "sfx"
			});
		}

		this.totalToLoad = this.list.length;
		this.currentLoaded = 0;
	}


	/**
	 * Charge tous les sons, puis les stock dans le soundManager une fois chargé
	 */
	SoundLoader.prototype.init = function () {
		Debug.success("SoundLoader initialised.");
		SoundManager.list = _.clone(this.list);
		for (var i = 0; i < this.list.length; i ++) {
			this.list[i].instance = new howler.Howl({
				urls: [this.list[i].path],
				onload: function () {
					this.currentLoaded++;
				}.bind(this)
			});
		}
	}


	/**
	 * Return la progression du chargement des sons (0 à 1)
	 */
	SoundLoader.prototype.getProgress = function () {
		return this.currentLoaded / this.totalToLoad;
	}


	return new SoundLoader();
});