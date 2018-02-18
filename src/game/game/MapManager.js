/**
 * Class that loads maps
 */
define([
	"jquery",
	"src/game/ui/UIManager",
	"src/utils/Config",
	"src/game/server/Account",
	"src/utils/assetsmanager/SoundManager",
	"src/utils/assetsmanager/SpriteManager",
	"src/utils/math/Vector2",
	"src/game/game/component/Undoredo",
	"src/game/game/box/Box",
	"src/game/game/box/BoxManager",
	"src/utils/localization/txt",
	"assets/map/level1",
	"assets/map/level2",
	"assets/map/level3",
	"assets/map/level4",
	"assets/map/level5",
	"assets/map/level6",
	"assets/map/level7",
	"assets/map/level8",
	"assets/map/level9",
	"assets/map/level10",
	"assets/map/level11",
	"assets/map/level12",
	"assets/map/level13",
	"assets/map/level14",
	"assets/map/level15"
],
function (
	$,
	UIManager,
	Config,
	Account,
	SoundManager,
	SpriteManager,
	Vector2,
	Undoredo,
	Box,
	BoxManager,
	txt,
	level1,
	level2,
	level3,
	level4,
	level5,
	level6,
	level7,
	level8,
	level9,
	level10,
	level11,
	level12,
	level13,
	level14,
	level15
) {
	var MapManager = function () {
		this.currentMap = [];
		this.cell = {
			void: 0,
			floor: 1,

			floorRed: 1,
			floorOrange: 2,
			floorYellow: 3,
			floorGreen: 4,
			floorBlue: 5,
			floorPurple: 6,

			wall: 7,
			goal: 8,

			sideIntNO: 9,
			sideIntNE: 10,
			sideIntSO: 11,
			sideIntSE: 12,

			sideLineS: 13,
			sideLineN: 14,
			sideLineO: 15,
			sideLineE: 16,

			sideExtNO: 17,
			sideExtNE: 18,
			sideExtSO: 19,
			sideExtSE: 20,

			box: 21,
			boxOnGoal: 22,
			player: 23,
			playerOnGoal: 24
		}

		this.floorColor = [
			"floorRed",
			"floorOrange",
			"floorYellow",
			"floorGreen",
			"floorBlue",
			"floorPurple"
		];
	}


	MapManager.prototype.init = function (Player) {
		this.Player = Player;
		Undoredo.add(MapManager);
	}


	MapManager.prototype.update = function () {
		$("#hudTimeText").text(Math.floor((Date.now() - this.levelStartDate) / 1000) + " s");
		for (var i = 0; i < 3; i++) {
			if (this.Player.eatPower > i) {
				$("#specialLogo" + i).show();
			} else {
				$("#specialLogo" + i).hide();
			}
			if (this.Player.eatPower == 0) {
				$("#specialLogo0").show();
				$("#specialLogo0").text(txt.get("LABEL_HUD_EMPTYSKILL"));
				$("#specialLogo0").css("margin-left", 45)
								  .css("background-image", "");
			} else {
				$("#specialLogo0").text("");
				$("#specialLogo0").css("margin-left", 0)
								  .css("background-image", "url(" + SpriteManager.get("hudSpecialLogo").src + ")");
			}
		};

		if ($("#mapContainer").length > 0 && this.currentMap.length > 0) {
			var won = true;
			for (var i = 0; i < this.currentMap.length; i++) {
				if (this.currentMap[i] == this.cell.box) {
					var won = false;
				}
			};
			if (won) {
				var score;
				score = this.actionCount > this.levelPar ? 1 : 2;
				Account.addScore(this.levelNum, score);
				
				//alert("Bravo, tu as gagné.\nTon nombre d'action :" + this.actionCount + "\nLe par du niveau :" + this.levelPar + "\nTon score : " + score + "\nDev tip: Message temporaire");
				if (this.levelNum + 1 == 16) {
				//	alert("Bravo, tu as fini le jeu");
					
				} else {
					this.removeMap('level' + (this.levelNum + 1));
				}
			}
		}
	}


	/**
	 * Load a map and show it in the game
	 */
	MapManager.prototype.loadMap = function (name) {
		this.resetActionHistory();
		this.currentMap = [];
		this.actionCount = 0; // Number of actions performed by the player (moves, undo, redo)
		this.levelNum = parseInt(name.substr(name.length - 2, 2));
		if (isNaN(this.levelNum)) this.levelNum = parseInt(name.substr(name.length - 1, 1)); // To do, clean this...hacked it together 1 day before release
		this.levelStartDate = Date.now();
		
		this.musicList = [
			"",
			"nyan_multigenre", // 1 - 5
			false,
			false,
			false,
			false, 

			"nyan_8bit", // 6 - 10
			false,
			false,
			false,
			false,

			"nyan_part_trance", // 11 - 15
			"nyan_part_rock",
			"nyan_part_electro",
			"nyan_part_dubstep",
			"nyan_part_drumandbass"
		];

		var musicToPlay = this.musicList[this.levelNum];
		musicToPlay ? SoundManager.play(musicToPlay, true) : null;

		var imageName = "";
		var map = eval(name);
		Config.mapSizeX = Math.sqrt(map.layers[0].data.length);
		Config.mapSizeY = Math.sqrt(map.layers[0].data.length);

		$("#gameContainer").append("<div id='mapContainer'></div>")

		this.levelPar = map.properties.par;
		$("#hudParNumberText").text(this.levelPar);
		this.Player.eatPower = map.properties.eatPower || 0;
		
		for (var i = 0; i < map.layers[0].data.length; i++) {

			if (map.layers[0].data[i] >= this.cell.floorRed ||
				map.layers[0].data[i] <= this.cell.floorPurple) {
				map.layers[0].data[i] == this.cell.floor;
			}

			this.currentMap.push(map.layers[0].data[i]);

			for (cellName in this.cell){
				if (this.cell[cellName] == map.layers[0].data[i]) {
					imageName = cellName;
				}
			}

			var floorImageName = this.floorColor[Math.floor(i / Config.mapSizeY) % this.floorColor.length];

			switch (map.layers[0].data[i]) {
				case this.cell.floorRed:
				case this.cell.floorOrange:
				case this.cell.floorYellow:
				case this.cell.floorGreen:
				case this.cell.floorBlue:
				case this.cell.floorPurple:
				case this.cell.floor:
					imageName = floorImageName;
					break;
				case this.cell.box:
					imageName = floorImageName;
					new Box((i % Config.mapSizeX), Math.floor(i / Config.mapSizeY), false, this, this.Player);
					break;
				case this.cell.boxOnGoal:
					imageName = "goal";
					new Box((i % Config.mapSizeX), Math.floor(i / Config.mapSizeY), true, this, this.Player);
					break;
				case this.cell.playerOnGoal:
					imageName = "goal";
					break;
				case this.cell.player:
					imageName = floorImageName;
					break;
			}
			
			if (map.layers[0].data[i] == this.cell.playerOnGoal ||
				map.layers[0].data[i] == this.cell.player) {
				$("#mapContainer").append("<div id='player'></div>")
					$("#player").css("background-image", "url(" + SpriteManager.get("player").src + ")")
								.css("width", 141 * Math.max(Config.mapWidth, Config.mapHeight) / 110)
								.css("height", 87 * Math.max(Config.mapWidth, Config.mapHeight) / 110);
			}

			$('#mapContainer').append('<div id="tile' + i + '" class="' + imageName + ' tile"></div>');
			$('#tile' + i).css("background-image", "url(" + SpriteManager.get(imageName).src + ")");
			$('#tile' + i).css("left", Config.mapWidth * (i % Config.mapSizeX))
						  .css("top", Config.mapHeight * Math.floor(i / Config.mapSizeY))
						  .css("width", Config.mapWidth)
						  .css("height", Config.mapHeight)
						  .data("floorColor", floorImageName);


			var mouseUpEvent = (function (MapManager, i, Player) {
				return function () {
					var clickX = i % Config.mapSizeX;
					var clickY = Math.floor(i / Config.mapSizeY);
					var nextDir = Player.XYToDir(clickX, clickY);
					var moved = false;
					if (nextDir != false) {
						moved = Player.move(nextDir);
					} else {
						moved = Player.move(clickX, clickY);
					}
					if (moved) MapManager.actionIncrement();
				}
			})(this, i, this.Player);

			$('#tile' + i).mouseup(mouseUpEvent);

			$('#tile' + i).hide();
			setTimeout((function (id) {
				return function () {
					$('#tile' + id).fadeIn(400);
				};
			})(i), Config.fadeInMin + Math.random() * (Config.fadeInMax - Config.fadeInMin));
		}
	}


	/**
	 * Increase the player's action counter
	 */
	MapManager.prototype.actionIncrement = function () {
		this.actionCount++;
		$("#hudActionNumberText").text(this.actionCount);
	}


	/**
	 * Decrease the player's action counter
	 */
	MapManager.prototype.actionDecrement = function () {
		this.actionCount--;
		$("#hudActionNumberText").text(this.actionCount);
	}


	/**
	 * Destroy the current map
	 * @mapName String - Name of the map to load after removal
	 */
	MapManager.prototype.removeMap = function (mapName) {
		if (typeof mapName == "undefined") mapName = false;
		$("#hudActionNumberText").text(0); // Reset number of actions

		var mapLength = this.currentMap.length;
		this.currentMap = [];
		BoxManager.destroyAll();

		for (var i = 0; i < mapLength; i++) {
			setTimeout((function (id) {
				return function () {
					$('#tile' + id).fadeOut(400, function () {
						$('#tile' + id).remove();
					});
				};
			})(i), Config.fadeInMin + Math.random() * (Config.fadeInMax - Config.fadeInMin));
		}

		setTimeout((function (MapManager, mapName) {
			return function () {
				if (mapName != false) {
					$("#mapContainer").remove();
					MapManager.loadMap(mapName);
				}
			}
		})(this, mapName), Config.fadeInMax + 400 * 2);

	}


	/**
	  * Return a cell's value
	  * @x Horizontal coordinates
	  * @y Vertical coordinates
	  */
	MapManager.prototype.getCellValue = function (x, y) {
		if (x < 0 || x > Config.mapSizeX - 1 || y < 0 || y > Config.mapSizeY - 1) return this.cell.wall;
		return this.currentMap[(y % Config.mapSizeX) * Config.mapSizeX + x];
	}


	/**
	 * Return the id of what's at position x and y
	 */
	MapManager.prototype.getCellId = function (x, y) {
		return (y % Config.mapSizeX) * Config.mapSizeX + x;
	}
	

	return new MapManager();
});