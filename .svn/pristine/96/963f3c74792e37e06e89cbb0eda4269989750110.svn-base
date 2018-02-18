requirejs.config ({
	baseUrl : "",
	paths : {
		"jquery" : "libs/jquery/jquery.min",
		"jquery-ui" : "libs/jquery-ui/jquery-ui.min",
		"howler" : "libs/howler.min",
		"underscore" : "libs/underscore-min",
		"pathfinding" : "libs/pathfinding-browser.min",
		"stats" : "libs/debug/stats.min",
		"datgui" : "libs/debug/dat.gui.min"
	},
	shim : {
		"jquery-ui" : {
			exports : "$",
			deps : ['jquery']
		},
		"howler" : {
			exports : "Howl"
		},
		"underscore" : {
			exports : "_"
		},
		"pathfinding" : {
			exports : "PF"
		},
		"stats" : {
			exports : "Stats"
		},
		"datgui" : {
			exports : "dat.gui"
		}
	},
	urlArgs : "d=" + Date.now()
});


define([
	"src/game/Game"
], function (
	game
) {
	game.init();
});