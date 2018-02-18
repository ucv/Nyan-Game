<?php
// http://localhost/sokoban/request.php?isRequest=true&name=Teddyyu&password=1234569&request=trucmuche
// SELECT * FROM `users` JOIN `score` ON `users`.`name` = `score`.`playerName`	
error_reporting(E_ALL);
include("account.php");

$requestName = getParam("request", "POST");

/*
 * @sendScore Envoi le score du joueur sur le serveur
 * @getScore Récupère le score du joueur
 * @getBestScore Récupère les dix meilleurs scores des joueurs
 * @getProgress Récupère la progression du joueur
 */
switch ($requestName) {
	case 'sendScore':
		$level = getParam("level", "POST");
		$score = getParam("score", "POST");
		$name = getParam("name", "POST");
		$request = "SELECT * FROM `score` WHERE level='" . $level . "' and playerName='" . $name . "'";
		$result = SQLRequest($connexion, $request);

		if (!$result) {
			$request = "INSERT INTO  `score` (
			`id` ,
			`level` ,
			`score` ,
			`playerName`
			)
			VALUES (
			NULL ,  '" . $level . "',  '" . $score . "', '" . $name . "'
			);";
			$result = SQLRequest($connexion, $request);
			echo 'score insered';
		} else {
			$request = "UPDATE `score` SET `score`='" . $score . "' WHERE `playerName`='" . $name . "' and `level`='" . $level . "' and `score`<2";
			$result = SQLRequest($connexion, $request);
			echo 'score updated';
		}
		break;
	case 'getBestScore':
		$request = "SELECT sum(score) as score, playerName
		FROM `score`
		GROUP BY playerName
		ORDER BY sum(score) DESC";
		$result = SQLRequest($connexion, $request);
		echo json_encode($result);
		break;
	case 'getProgress':
		$name = getParam("name", "POST");
		$request = "SELECT * FROM `score` WHERE `playerName`='" . $name . "'";
		$result = SQLRequest($connexion, $request);
		echo json_encode($result);
		break;
	default:
		echo 'Error: bad request name';
		break;
}
?>