/**
* Managing the gamePad, modifying the attributes of the Controller class
*/
define([
	"src/utils/debug/Debug",
	"src/game/controller/Controller"
],
function (
	Debug,
	Controller
) {
	var GamePad = function () {
		this.AXES_MIN_VALUE = 0.55; // Minimum value for an axe to be detected
		this.enable = false;
		this.gamePadAvailable = false;
		this.currentGamePad = null;
	}


	/**
	 * Initialize the pad, if it's detected, activate it
	 */
	GamePad.prototype.init = function () {
		Debug.success("GamePad initialised.")
		if (navigator.getGamepads()[0] != undefined) {
			Debug.success("GamePad connected.");
			this.gamePadAvailable = true;
			this.enable = true;
			this.currentGamePad = navigator.getGamepads()[0];
		}
		window.addEventListener("gamepadconnected", onGamePadConnect)
		window.addEventListener("gamepaddisconnected", onGamePadDisconnect)
	}


	/**
	 * Allows updating of variable states in Controller.js depending on pressed buttons
	 */
	GamePad.prototype.update = function () {
		if (this.enable) {
			var stick = {
				left : {
					x : navigator.getGamepads()[0].axes[0],
					y : navigator.getGamepads()[0].axes[1]
				},
				right : {
					x : navigator.getGamepads()[0].axes[2],
					y : navigator.getGamepads()[0].axes[3]
				}
			}
			if (stick.left.x < -this.AXES_MIN_VALUE) Controller.left = stick.left.x
			else Controller.left = 0;
			if (stick.left.x > this.AXES_MIN_VALUE) Controller.right = stick.left.x
			else Controller.right = 0;
			if (stick.left.y < -this.AXES_MIN_VALUE) Controller.up = stick.left.y
			else Controller.up = 0;
			if (stick.left.y > this.AXES_MIN_VALUE) Controller.down = stick.left.y
			else Controller.down = 0;
		}
	}


	/**
	 * Activate the GamePad (return false if GamePad is not found)
	 */
	GamePad.prototype.enable = function () {
		if (navigator.getGamepads()[0] != undefined) this.enabled = true;
		else return false;
		return true;
	}


	/**
	 * Disactivate the GamePad
	 */
	GamePad.prototype.disable = function () {
		this.enabled = false;
	}


	/**
	 * Event called upon the first touch of the pad
	 */
	function onGamePadConnect() {
		Debug.success("GamePad connected.");
		this.gamePadAvailable = true;
		this.enable = true;
		this.currentGamePad = navigator.getGamepads()[0];
	}


	/**
	 * Event called upon disconnection of the pad
	 */
	function onGamePadDisconnect() {
		Debug.warn("GamePad disconnected.")
		this.gamePadAvailable = false;
		this.enable = false;
		this.currentGamePad = null;
	}


	return new GamePad();
}); 