/*
 * Librairie qui gère le temps, fonction de deltaTime etc.
 * Attributs :
 * dt - Deltatime en seconde
 * dt2 - Deltatime en seconde, ne prend pas en compte la pause
 */
 define([
 	"src/utils/debug/Debug"
 ],
 function (
 	Debug
 ) {
 	var Time = function () {
 		DELTATIME_DIVISER = 1000;
 		MS_INTERVAL_FRAME = 16;
 		this.currentTime = null;
 		this.lastTime = null;
 		this._pause = 0;
 		this.timeScale = 1;
 		this.deltaTime = null;
 		this.dt = null;
 		this.dt2 = null;
 	}


 	/**
 	 * Initialise la class Time
 	 */
 	Time.prototype.init = function () {
 		Debug.success("Time initialised.");
 		this.currentTime = Date.now();
 		this.lastTime = Date.now();
 		this.deltatime = MS_INTERVAL_FRAME;
 	}


 	/**
 	 * Permet d'update le deltatime. A mettre en début de gameLoop
 	 */
 	Time.prototype.updatedt = function () {
 		this.currentTime = Date.now();
 		this.deltaTime = this.currentTime - this.lastTime;
 		this.lastTime = this.currentTime;
 		this.dt = this.deltaTime / DELTATIME_DIVISER;
 		this.dt2 = this.deltaTime / DELTATIME_DIVISER;
 		if (this.pause) this.dt = 0;
 	}


 	/**
 	 * Permet de changer la vitesse du temps.
 	 * 1 = temps normal
 	 * 0.5 = temps ralenti par deux
 	 * 2 = temps multiplié par deux
 	 */
 	Time.prototype.scale = function (num) {
 		this.timeScale = num;
 	}


 	/**
 	 * Met le jeu en pause
 	 */
 	Time.prototype.pause = function () {
 		this._pause = 1;
 	}


 	/**
 	 * Enlève la pause
 	 */
 	Time.prototype.resume = function () {
 		this._pause = 0;
 	}


 	/**
 	 * Permet de savoir si le jeu est en pause ou non
 	 */
 	Time.prototype.isPause = function () {
 		return _pause;
 	}


 	return new Time();
 });