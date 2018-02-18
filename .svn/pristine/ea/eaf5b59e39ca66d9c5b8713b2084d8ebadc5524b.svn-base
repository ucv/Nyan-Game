/**
 * Charge les images de l'écran de loading
 */
define([
	"src/utils/localization/txt"
],
function (
	txt
) {
	var PreLoad = function () {

	}


	/**
	 * Initialise les images de l'écran de loading, une fois fini, execute le callback.
	 */
	PreLoad.prototype.init = function (callback) {
		this.baseFolder = "assets/img/";
		txt.init();

		this.imgSrc = [
			this.baseFolder + "sprite/ui/loadingScreen/Background.png",
			this.baseFolder + "sprite/ui/loadingScreen/loadingBar.png",
			this.baseFolder + "sprite/ui/loadingScreen/loadingCat.gif"
		];

		this.list = [
			new Image(),
			new Image(),
			new Image()
		];


		var loadingText = $("<div class='loadingText'>...</div>");
		$('body').append(loadingText);

		for (var i = 0; i < this.list.length; i++) {
			this.list[i].src = this.imgSrc[i];
			if (i == this.list.length - 1) {
				this.list[i].onload = function () {
					$('.loadingText').fontSpy({
						onLoad: function () {
							callback();
							$(loadingText).remove();
						},
						onFail: function () {
							console.log("fail to load font")
						}
					});
				}
			}
		};


	}

	return new PreLoad();
});