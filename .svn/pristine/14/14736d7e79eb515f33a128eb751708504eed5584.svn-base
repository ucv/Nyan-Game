/**
* Gestion du gamePad, modifie les attributs de la class Controller
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
		this.AXES_MIN_VALUE = 0.55; // Valeur minimum pour qu'un axe soit detecté
		this.enable = false;
		this.gamePadAvailable = false;
		this.currentGamePad = null;
	}


	/**
	 * Initialise le pad, si il est detecté, l'active.
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
	 * Permet de mettre à jours les états variable dans Controller.js en fonction des bouton appuyé
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
	 * Active le gamepad (retun false si gamePad non trouvé)
	 */
	GamePad.prototype.enable = function () {
		if (navigator.getGamepads()[0] != undefined) this.enabled = true;
		else return false;
		return true;
	}


	/**
	 * Desactive le gamepad.
	 */
	GamePad.prototype.disable = function () {
		this.enabled = false;
	}


	/**
	 * Event appellé au moment de la première pression sur le pad
	 */
	function onGamePadConnect() {
		Debug.success("GamePad connected.");
		this.gamePadAvailable = true;
		this.enable = true;
		this.currentGamePad = navigator.getGamepads()[0];
	}


	/**
	 * Event appellé au moment de la deconnexion du pad
	 */
	function onGamePadDisconnect() {
		Debug.warn("GamePad disconnected.")
		this.gamePadAvailable = false;
		this.enable = false;
		this.currentGamePad = null;
	}


	return new GamePad();
}); 