/**
 * Class qui permet de récuperer les phrases en fonction de la langue.
 */
define([
	"src/utils/Config",
	"src/game/server/ServerConfig"
],
function (
	Config,
	ServerConfig
) {
	var txt = function () {
		this.xliffData = {};
	}


	txt.prototype.init = function () {
		for (var i = 0; i < Config.availableLanguage.length; i++) {
			$.get(Config.xliffPath + Config.availableLanguage[i] + ".xliff?d=" + Date.now(),
				(function (lang, obj) {
					return function (xliff) {
						var xliff = $.parseXML(xliff);
						obj.xliffData[lang] = xliff;
					}
				})(Config.availableLanguage[i], this)
			);
		};
	}


	/**
	 * Récupère une phrase en fonction de la langue
	 */
	txt.prototype.get = function (labelName) {
		return $(this.xliffData[Config.language]).find("#" + labelName + " target").html();
	}


	return new txt();
});