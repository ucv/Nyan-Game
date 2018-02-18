/*
 * Librairy that handles time, deltaTime etc.
 * Attributes:
 * dt - Deltatime in seconds
 * dt2 - Deltatime in seconds, doesn't count pauses
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
 	 * Initialize Time class
 	 */
 	Time.prototype.init = function () {
 		Debug.success("Time initialised.");
 		this.currentTime = Date.now();
 		this.lastTime = Date.now();
 		this.deltatime = MS_INTERVAL_FRAME;
 	}


 	/**
 	 * Update deltatime. Put at the beginning of gameloop
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
 	 * Change time speed
 	 * 1 = normal
 	 * 0.5 = half as fast
 	 * 2 = 2x faster
 	 */
 	Time.prototype.scale = function (num) {
 		this.timeScale = num;
 	}


 	/**
 	 * Pause the game
 	 */
 	Time.prototype.pause = function () {
 		this._pause = 1;
 	}


 	/**
 	 * Remove pause
 	 */
 	Time.prototype.resume = function () {
 		this._pause = 0;
 	}


 	/**
 	 * Lets you know if game is paused or not
 	 */
 	Time.prototype.isPause = function () {
 		return _pause;
 	}


 	return new Time();
 });