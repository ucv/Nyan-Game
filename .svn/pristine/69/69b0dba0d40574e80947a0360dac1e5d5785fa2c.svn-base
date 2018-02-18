/*
 * Gère le compteur de fps
 */
define([
	"stats",
	"src/utils/Config"
],
function (
	StatsLib,
	Config
) {
	var Stats = function () {
		
	}


	Stats.prototype.init = function () {
		if (Config.fps) {
			this.statsFps = new StatsLib();
			this.statsFps.setMode(0);

			// css
			this.statsFps.domElement.style.position = 'absolute';
			this.statsFps.domElement.style.left = '0px';
			this.statsFps.domElement.style.top = '0px';
			document.body.appendChild(this.statsFps.domElement);
		}

		if (Config.ms) {
			this.statsMs = new StatsLib();
			this.statsMs.setMode(1);

			// css
			this.statsMs.domElement.style.position = 'absolute';
			this.statsMs.domElement.style.left = '80px';
			this.statsMs.domElement.style.top = '0px';
			document.body.appendChild(this.statsMs.domElement);
		}
	}


	Stats.prototype.begin = function () {
		if (Config.fps) this.statsFps.begin();
		if (Config.ms) this.statsMs.begin();
	}


	Stats.prototype.end = function () {
		if (Config.fps) this.statsFps.end();
		if (Config.ms) this.statsMs.begin();
	}


	return new Stats();
});