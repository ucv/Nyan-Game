/**
 * Tout ce qui concerne les paramètres du comptes et les requêtes AJAX disponible.
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
	 * Permet de ce connecter ou créer un compte.
	 * @name Nom de compte
	 * @password Mot de passe du compte
	 * Return "created" - Compte créer
	 *		  "connected" - Connexion réussi
	 *		  "wrongpassword" - Mot de passe incorrect ou compte déjà existant
	 */
	Account.prototype.connect = function (name, password) {
		this.name = name;
		this.password = password;

		$.post(ServerConfig.host + "request.php", {
			name: this.name,
			password: this.password,
			isRequest: false
		}, function (data) {
			var screenList = {
				created: "AccountCreated",
				connected: "GoodPassword",
				wrongpassword: "WrongPassword"
			}
			
			data = data.replace(/ /g,"");
			data = data.replace(/\n/g,"");

			this.UIManager.addScreen(screenList[data], true);
			this.refreshProgress();
			this.refreshScore();
		}.bind(this));
	}


	/**
	 * Refresh la progression du joueurs. (Niveau débloqué, score par niveau)
	 */
	Account.prototype.refreshProgress = function () {
		var result;
		$.post(ServerConfig.host + "request.php", {
			name: this.name,
			password: this.password,
			request: "getProgress",
			isRequest: true
		}, function (data) {
			data = JSON.parse(data);
			if (!data) data = [];

			data.push({
				score: 0
			});

			this.progress = {
				level: []
			}

			var unlocked;
			var score;
			for (var i = 0; i < Config.totalLevel; i++) {
				if (data.length <= i) {
					unlocked = false;
					score = 0;
				} else {
					unlocked = true;
					score = data[i].score;
				}

				this.progress.level.push({
					unlocked: unlocked,
					score: score,
				})
			};
		}.bind(this));
	}


	/*
	 * Permet d'ajouter un score à la database.
	 * @level Niveau auquel correspond le score
	 * @score Score à ajouter
	 */
	Account.prototype.addScore = function (level, score) {
		$.post(ServerConfig.host + "request.php", {
			name: this.name,
			password: this.password,
            request: "sendScore",
            level: level,
            score: score,
			isRequest: true
		}, function (data) {
			this.refreshProgress();
			this.refreshScore();
		}.bind(this));
	}


	/*
	 * Récupère le score total du joueur.
	 * Return Score du joueur.
	 */
	Account.prototype.getScore = function () {
		var result;
		$.post(ServerConfig.host + "request.php", {
			name: this.name,
			password: this.password,
			request: "getBestScore",
			isRequest: true
		}, function (data) {
			data = JSON.parse(data);
			this.playerScore = data;
		}.bind(this));
	}


	/*
	 * Récupère le top 10 des joueurs.
	 * Return Objet du top 10
	 */
	Account.prototype.getBestScore = function () {
		var result;
		$.post(ServerConfig.host + "request.php", {
			name: this.name,
			password: this.password,
			request: "getBestScore",
			isRequest: true
		}, function (data) {
			data = JSON.parse(data);
			this.highScore = data;
		}.bind(this));
	}


	/**
	 * Met à jours la variable highScore et playerScore
	 */
	Account.prototype.refreshScore = function () {
		this.getBestScore();
		this.getScore();
	}


	return new Account();
});