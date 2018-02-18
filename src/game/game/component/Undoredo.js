/**
 * Class that handles game undo/redo
 */
define([
	"src/utils/assetsmanager/SpriteManager"
],
function (
	SpriteManager
) {
	var Undoredo = function () {

	}


	/**
	 * Add undo and redo functions
	 */
	Undoredo.prototype.add = function (Object) {

		var obj = Object.prototype;

		obj.actionHistory = {
			index: -1,
			list: []
		};

		// Opposite directions
		obj.moveReverse = {
			"left" : "right",
			"right" : "left",
			"up" : "down",
			"down" : "up"
		}

		obj.undo = function () {
			if (this.actionHistory.index < 0) return false; 
			var index = this.actionHistory.index;
			var currAction;
			var direction;
			for (var i = this.actionHistory.list[index].length - 1; i >= 0; i--) {
				currAction = this.actionHistory.list[index][i];
				if (currAction.type == "move") {
					direction = this.moveReverse[currAction.param]
					currAction.ref.move(direction, false);
				}
				if (currAction.type == "eat") {
					this.currentMap[currAction.param] = this.cell.wall;
					$("#tile" + currAction.param).css("background-image", "url(" + SpriteManager.get("wall").src + ")");
					this.Player.eatPower++;
				}
			};
			this.actionDecrement();
			this.actionHistoryIndexDecrem();
		}

		obj.redo = function () {
			if (this.actionHistory.index + 1 >= this.actionHistory.list.length) return false;
			var index = this.actionHistory.index + 1;
			var currAction;
			for (var i = 0; i < this.actionHistory.list[index].length; i++) {
				currAction = this.actionHistory.list[index][i];
				if (currAction.type == "move") {
					currAction.ref.move(currAction.param, false);
				}
				if (currAction.type == "eat") {
					this.currentMap[currAction.param] = this.cell.floor;
					$("#tile" + currAction.param).css("background-image", "url(" + SpriteManager.get( $("#tile" + currAction.param).data().floorColor ).src + ")");
					this.Player.eatPower--;
				}
			};
			this.actionIncrement();
			this.actionHistoryIndexIncrem();
		}

		/**
		 * Add an action to an index specified in the chronological history
		 * @action Object contains:
		 * 		ref - Reference to the object that performed an action (player, box ...)
		 * 		type -  Action type (eat, move)
		 * 		param - If the type is "move" this corresponds to the right direction (Up, down, right, left)
		 *				If the type is "eat" this corresponds to the box that was eaten
		 */
		obj.addAction = function (action) {
			var i = this.actionHistory.index;
			if (typeof this.actionHistory.list[i] == "undefined") this.actionHistory.list[i] = [];
			this.actionHistory.list[i].push(action);
			this.actionHistory.list.splice(i + 1);
		}

		/**
		 * Increase an index chronologically
		 */
		obj.actionHistoryIndexIncrem = function () {
			this.actionHistory.index++;
		}

		/**
		 * Decrease an index chronologically
		 */
		obj.actionHistoryIndexDecrem = function () {
			this.actionHistory.index--;
		}

		obj.resetActionHistory = function () {
			this.actionHistory = {
				index: -1,
				list: []
			};
		}
	}


	return new Undoredo();
});