/**
 * Class that allows getting sentences based on language
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
	 * Get a sentence based on language
	 */
	txt.prototype.get = function (labelName) {
		return $(this.xliffData[Config.language]).find("#" + labelName + " target").html();
	}


	return new txt();
});