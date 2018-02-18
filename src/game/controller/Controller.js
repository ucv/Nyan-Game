/**
 * Contains the state of all keys (pressed or not)
 */
define([
	"src/utils/debug/Debug"
],
function (
	Debug
) {
	var Controller = function () {
		// Current state of keys
		this.left = 0;
		this.right = 0;
		this.up = 0;
		this.down = 0;
	}


	/**
	 * Initialize the controller
	 */
	Controller.prototype.init = function () {
		Debug.success("Controller initialized.");
	}


	return new Controller();
})