/**
 * Class that handles pathfinding
 */
define([
	"src/game/game/MapManager",
	"src/utils/Config",
	"pathfinding"
],
function (
	MapManager,
	Config,
	PF
) {
	var Pathfinding = function () {

	}


	Pathfinding.prototype.init = function () {
		// Cells not passable by the player
		this.unWalkable = [
			MapManager.cell.wall,
			MapManager.cell.box,
			MapManager.cell.boxOnGoal,
			MapManager.cell.void,
			MapManager.cell.sideIntNO,
			MapManager.cell.sideIntNE,
			MapManager.cell.sideIntSO,
			MapManager.cell.sideIntSE,
			MapManager.cell.sideLineS,
			MapManager.cell.sideLineN,
			MapManager.cell.sideLineO,
			MapManager.cell.sideLineE,
			MapManager.cell.sideExtNO,
			MapManager.cell.sideExtNE,
			MapManager.cell.sideExtSO,
			MapManager.cell.sideExtSE,
		];

		this.map = [];

		for (var i = 0; i < Config.mapSizeY; i++) {
			this.map[i] = [];
			for (var j = 0; j < Config.mapSizeX; j++) {
				this.map[i][j] = 0;
			};
		};
		this.grid = new PF.Grid(Config.mapSizeX, Config.mapSizeY, this.map);
		this.finder = new PF.AStarFinder();
	}


	/**
	 * Return the array of a found path by pathfinding
	 * @pos1 Vector of the starting position
	 * @pos2 Vector of the ending position
	 * @map Sokoban map
	 * @return Array - Path
	 *		   False - No path possible
	 */
	Pathfinding.prototype.find = function (pos1, pos2, map) {
		this.refreshGrid(map);
		var path = this.finder.findPath(pos1.x, pos1.y, pos2.x, pos2.y, this.grid);
		if (path.length == 0) {
			return false
		}
		return path;
	}


	/**
	 * Allows updating of the grid for pathfinding thanks to the Sokoban map
	 * @map Sokoban map
	 */
	Pathfinding.prototype.refreshGrid = function (map) {
		var x;
		var y;
		for (var i = 0; i < map.length; i++) {
			x = Math.floor(i / Config.mapSizeY);
			y = i % Config.mapSizeX;
			if (this.unWalkable.indexOf(map[i]) == -1) {
				this.map[x][y] = 0;
			} else {
				this.map[x][y] = 1;
			}
		};
		this.grid = new PF.Grid(Config.mapSizeX, Config.mapSizeY, this.map);
	}


	return new Pathfinding();
});