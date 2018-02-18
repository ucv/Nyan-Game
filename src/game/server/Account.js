/**
 * Account settings and available AJAX requests
 */
define([
	"src/utils/Config",
	"src/game/server/ServerConfig"
],
function (
	Config,
	ServerConfig
) {
	var Account = function () {
		this.name = "";
		this.password = "";
		this.progress = {};
		this.highScore = 0;
		this.playerScore = 0;
	}


	Account.prototype.init = function (UIManager) {
		this.UIManager = UIManager;
	}


	/*
	 * Allows logging in or creating an account
	 * @name Account name
	 * @password Account password
	 * Return "created" - Account created
	 *		  "connected" - Login successful
	 *		  "wrongpassword" - Incorrect password or account already exists
	 */
	Account.prototype.connect = function (name, password) {
		this.name = name;
		this.password = password;


		this.UIManager.addScreen("GoodPassword", true);
		this.refreshProgress();
		this.refreshScore();
	}


	/**
	 * Refresh player progression (level unlocked, score by level)
	 */
	Account.prototype.refreshProgress = function () {
		var result;
		
		data = [];

		data.push({
			score: 0
		});

		this.progress = {
			level: []
		}

		var unlocked;
		var score;
		for (var i = 0; i < Config.totalLevel; i++) {
			unlocked = true;
            score = 0;

			this.progress.level.push({
				unlocked: unlocked,
				score: score,
			})
		};
	}


	/*
	 * Add a score to the database
	 * @level Level to which the score corresponds
	 * @score Score to add
	 */
	Account.prototype.addScore = function (level, score) {
		
			this.refreshProgress();
			this.refreshScore();
	}


	/*
	 * Gets the total player score
	 * Return player score
	 */
	Account.prototype.getScore = function () {
		this.playerScore = 0;
	}


	/*
	 * Get the top 10 players
	 * Return object of the top 10
	 */
	Account.prototype.getBestScore = function () {
		this.highScore = 0;
	}


	/**
	 * Update variables highScore and playerScore
	 */
	Account.prototype.refreshScore = function () {
		this.getBestScore();
		this.getScore();
	}


	return new Account();
});