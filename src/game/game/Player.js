/**
 * Player
 */
define([
	"jquery",
	"src/utils/Config",
	"src/utils/debug/Debug",
	"src/utils/assetsmanager/SpriteManager",
	"src/utils/assetsmanager/SoundManager",
	"src/utils/math/Vector2",
	"src/game/game/MapManager",
	"src/game/game/box/BoxManager",
	"src/game/controller/Controller",
	"src/game/game/Pathfinding",
	"src/game/game/component/Move"
],
function (
	$,
	Config,
	Debug,
	SpriteManager,
	SoundManager,
	Vector2,
	MapManager,
	BoxManager,
	Controller,
	Pathfinding,
	Move
) {
	var Player = function () {
		
	}


	Player.prototype.init = function () {
		Move.addPositionUpdate(Player, Config, MapManager);
		this.modifier = {
			currentCell: [
				[MapManager.cell.player, MapManager.cell.floor],
				[MapManager.cell.playerOnGoal, MapManager.cell.goal]
			],
			nextCell: [
				[MapManager.cell.floor, MapManager.cell.player],
				[MapManager.cell.goal, MapManager.cell.playerOnGoal]
			]
		}

		this.name = "player";
		this.idleSprite = SpriteManager.get("player").src;
		this.position = this.getPlayerPos();
		this.eatPower = 0;
		this.xOffset = -18;
		this.yOffset = 6;
		this.moveQueue  = [];

		this.translateOffset = new Vector2(0, 0);
	}


	Player.prototype.update = function () {
		if (this.position.x == -1 ||
			this.position.y == -1) {
			this.position = this.getPlayerPos();
		}
		if (MapManager.currentMap.length == 0) {
			this.position.x = -1;
			this.position.y = -1;
		}

		this.checkMovingInput();
		this.positionUpdate();
		this.fluidMovementUpdate();
		this.pathfindingUpdate();
	}


	/**
	 * Move the player if a directional key is pressed
	 */
	Player.prototype.checkMovingInput = function () {
		// Update controller
		var direction = ["left", "right", "up", "down"];
		for (var i = 0; i < direction.length; i++) {
			if (Controller[direction[i]]) {
				var moved = this.move(direction[i]);
				if (moved) MapManager.actionIncrement();
				Controller[direction[i]] = 0;
			}
		};
	}


	/**
	 * Handle automatic movement with pathfinding
	 */
	Player.prototype.pathfindingUpdate = function () {
		if (this.moveQueue.length > 0) {
			if (Math.abs(this.translateOffset.x) + Math.abs(this.translateOffset.y) == 0) {
				var nextMove = this.moveQueue.shift();
				var nextDir = this.XYToDir(nextMove[0], nextMove[1])
				var moved = this.move(nextDir);
				if (moved) MapManager.actionIncrement();
			}
		}
	}


	/**
	 * Transform an x,y direction into a string (Left, Right, Up, down)
	 */
	Player.prototype.XYToDir = function (x, y) {
		var xOffset = x - this.position.x;
		var yOffset = y - this.position.y;
		var dirName = {
			"-1" : "left",
			"1" : "right",
			"0" : "none"
		}
		var nextDir = dirName[xOffset];
		if (nextDir == "none") {
			dirName = {
				"-1" : "up",
				"1" : "down",
			}
			nextDir = dirName[yOffset];
		}
		if (typeof nextDir == "undefined" || Math.abs(xOffset) + Math.abs(yOffset) >= 2) nextDir = false;
		return nextDir;
	}


	/**
	 * Get the player's position
	 * Return Vector2 position x and y
	 */
	Player.prototype.getPlayerPos = function () {
		var currentMap = MapManager.currentMap;
		for (var i = 0; i < currentMap.length; i++) {
			if (currentMap[i] == MapManager.cell.player ||
				currentMap[i] == MapManager.cell.playerOnGoal) {
				return new Vector2((i % Config.mapSizeX), Math.floor(i / Config.mapSizeY));
			}
		}
		return new Vector2(-1, -1);
	}


	/**
	 * Move the player in the given direction if possible
	 * @dir Direction, "left", "right", "up", "down" accepted.
	 * @y Allows having destintion x, y. (in this case, dir will equal x)
	 * Return True - Movement happened
	 *		  False - Movement did not happen (Collision)
	 */
	Player.prototype.move = function (dir, y) {
		if (typeof y == "undefined" || typeof y == "boolean") {
			if (typeof y == "boolean") y = false;
			else y = true;
			// If there's no translation ongoing
			if (Math.abs(this.translateOffset.x) + Math.abs(this.translateOffset.y) == 0) {
				if (y) {
					MapManager.actionHistoryIndexIncrem();
				}

				var map = MapManager.currentMap;
				var xOffset = 0;
				var yOffset = 0;

				switch(dir){
					case "left":
						xOffset = -1;
						break;
					case "right":
						xOffset = 1;
						break;
					case "up":
						yOffset = -1;
						break;
					case "down":
						yOffset = 1;
						break;
					default:
						console.error("Mauvaise direction ! Accepté : left, right, up, down. Entré : " + dir)
						break;
				}

				var canMove = false;
				var currentCellId = MapManager.getCellId(this.position.x, this.position.y);
				var currentCellValue = MapManager.getCellValue(this.position.x, this.position.y);
				var nextCellId = MapManager.getCellId(this.position.x + xOffset, this.position.y + yOffset);
				var nextCellValue = MapManager.getCellValue(this.position.x + xOffset, this.position.y + yOffset);

				// Si la nextCell est une box
				if (nextCellValue == MapManager.cell.box ||
					nextCellValue == MapManager.cell.boxOnGoal) {
					var box = BoxManager.getByXY(this.position.x + xOffset, this.position.y + yOffset);
					var boxCanMove = box.move(dir);
					if (boxCanMove) {
						nextCellValue = MapManager.getCellValue(this.position.x + xOffset, this.position.y + yOffset);
						if (y) {
							MapManager.addAction({
								ref: box,
								type: "move",
								param: dir
							});
						}
					} else {
						MapManager.actionHistoryIndexDecrem();
						return false;
					}
				}

				// Bouge si la nextCell est un goal ou floor
				for (var i = 0; i < this.modifier.nextCell.length; i++) {
					if (this.modifier.nextCell[i][0] == nextCellValue) {
						map[nextCellId] = this.modifier.nextCell[i][1]
						canMove = true;
					}
				};

				// Si il a un eatpower, cela bouffe le wall et le transforme en floor
				if (this.eatPower > 0 && nextCellValue == MapManager.cell.wall) {
					map[nextCellId] = MapManager.cell.floor;
					$("#tile" + nextCellId).css("background-image", "url(" + SpriteManager.get( $("#tile" + nextCellId).data().floorColor ).src + ")");
					canMove = true;
					this.eatPower--;
					if (y) {
						MapManager.addAction({
							ref: this,
							type: "eat",
							param: nextCellId
						});
					}
				}

				if (!canMove) {
					MapManager.actionHistoryIndexDecrem();
					return false;
				}

				for (var i = 0; i < this.modifier.currentCell.length; i++) {
					if (this.modifier.currentCell[i][0] == currentCellValue) {
						map[currentCellId] = this.modifier.currentCell[i][1];
					}
				};

				this.position.x += xOffset;
				this.position.y += yOffset;
				this.translateOffset.x = xOffset * Config.mapWidth * -1;
				this.translateOffset.y = yOffset * Config.mapHeight * -1;

				// SoundManager.play("meow" + Math.floor(Math.random() * 15));
				SoundManager.play("playerMove");

				$("#player").css("background-image", "url(" + SpriteManager.get("playerMove").src + ")");

				if (y) {
					MapManager.addAction({
						ref: this,
						type: "move",
						param: dir
					});
				}
				return true;
			}
			return false;
		} else {
			var destinationPos = new Vector2(dir, y);
			this.moveQueue = Pathfinding.find(this.position, destinationPos, MapManager.currentMap);
			if (this.moveQueue == false) {
				return false;
			}
			this.moveQueue.shift();
			return true;
		}
	}


	return new Player();
});