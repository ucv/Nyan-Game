/**
 * Managing the Keyboard, modifying attributes of the Controller class
 */
define([
	"src/utils/debug/Debug",
	"src/game/controller/Controller"
],
function (
	Debug,
	Controller
) {
	var Keyboard = function () {
		// Keycode constants
		this.LEFT_KEYCODE = 37;
		this.RIGHT_KEYCODE = 39;
		this.UP_KEYCODE = 38;
		this.DOWN_KEYCODE = 40;
	}


	/**
	 * Adding touch events
	 */
	Keyboard.prototype.init = function () {
		Debug.success("Keyboard initialised.")
		window.addEventListener("keydown", this.keyDown.bind(this), true);
		window.addEventListener("keyup", this.keyUp.bind(this), true);
	}


	/**
	 * Called when a key is pressed, which makes the respective key correspond to 1
	 */
	Keyboard.prototype.keyDown = function (e) {
		this.changeKeyState(e.keyCode, 1);
	}


	/**
	 * Called when a key is pressed, which makes the respective key correspond to 0
	 */
	Keyboard.prototype.keyUp = function (e) {
		this.changeKeyState(e.keyCode, 0);
	}


	/**
	 * Changes the status of a key (pressed or not)
	 */
	Keyboard.prototype.changeKeyState = function (keyCode, state) {
		switch(keyCode) {
			case this.LEFT_KEYCODE:
				Controller.left = state;
				break;
			case this.RIGHT_KEYCODE:
				Controller.right = state;
				break;
			case this.UP_KEYCODE:
				Controller.up = state;
				break;
			case this.DOWN_KEYCODE:
				Controller.down = state;
				break;
		}
	}


	return new Keyboard();
});