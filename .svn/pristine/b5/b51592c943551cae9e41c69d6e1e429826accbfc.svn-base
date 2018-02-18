/**
 * Class HighScore
 */
define([
	"src/utils/assetsmanager/SpriteManager",
	"src/utils/assetsmanager/SoundManager",
	"src/utils/localization/txt",
	"src/game/server/Account"
],
function (
	SpriteManager,
	SoundManager,
	txt,
	Account
) {
	var HighScore = function () {

	}


	/**
	 * Affiche le contenu dans popUp
	 */
	HighScore.prototype.init = function (UIManager) {
		$("#screenContainer").append("<div id='HighScore' class='popUp'></div>");
		$("#blackScreen").show();

		$("#screenContainer #HighScore").css("background-image", "url(" + SpriteManager.get("popUpVertical").src + ")")
									  .css("width", 786.8)
									  .css("height", 600,5)
									  .css( "left", "170" )
									  .css( "top", "20" );

		$("#HighScore").append("<div class='buttonClose'>" + txt.get("LABEL_POPUP_CLOSEBTN") + "</div>");
		$("#HighScore .buttonClose").css("background-image", "url(" + SpriteManager.get("buttonLoginStatic").src + ")")
									.css("top","485");

		// Hover
		$("#HighScore .buttonClose").hover(function() {
			$( this ).css("background-image", "url(" + SpriteManager.get("buttonLoginSurvol").src + ")");
			$("#HighScore .buttonClose").css("background-repeat", "no-repeat");
			SoundManager.play("buttonHover");
		}, function() {
			$( this ).css("background-image", "url(" + SpriteManager.get("buttonLoginStatic").src + ")");
		});

		// Active
		$("#HighScore .buttonClose").mousedown(function() {
			$("#HighScore .buttonClose").css("background-image", "url(" + SpriteManager.get("buttonLoginPress").src + ")");
			$("#HighScore .buttonClose").css("padding-top", 12);
		});

		$("#HighScore .buttonClose").mouseup(function() {
			$("#HighScore .buttonClose").css("background-image", "url(" + SpriteManager.get("buttonLoginStatic").src + ")");
			$("#HighScore .buttonClose").css("padding-top", 8);
			$("#blackScreen").hide();
			SoundManager.play("meow14");
			UIManager.closeScreen("HighScore", true);
		});

		//Title
		$("#screenContainer #HighScore").append("<div class='highScoreTitle'>" + txt.get("LABEL_POPUP_HIGHSCORE_TITLE") + "</div>");

		var highScoreList = Account.highScore;
		var playerScoreList = Account.playerScore;

		var playerScore;
		var playerRank;
		
		var name;
		var score;

		for (var i = 0; i < 10; i++) {
			if (typeof highScoreList[i] != "undefined") {
				name = highScoreList[i]["playerName"];
				score = highScoreList[i]["score"];
			} else {
				name = "Aucun";
				score = "/";
			}
			$("#screenContainer #HighScore").append("<div class='nameAndScore' id='number" + i + "'" + ">" + (i + 1) + ". " + name + " : " + score + "</div>");
			var topOffset = 100 + 30 * i;
			$("#number" + i).css("top", topOffset);
		};

		for (var i = 0; i < playerScoreList.length; i++) {
			if (playerScoreList[i]["playerName"] == Account.name) {
				playerScore = playerScoreList[i]["score"];
				playerRank = i;
			}
		};

		var myScoreText = (playerRank + 1) + txt.get("LABEL_YOUR_SCORE") + playerScore;
		if (typeof playerScore == "undefined") myScoreText =  txt.get("LABEL_POPUP_HIGHSCORE_NORANK");

		$("#screenContainer #HighScore").append("<div id='yourHighScore'>" + myScoreText + "</div>");
	}
	return new HighScore();
});