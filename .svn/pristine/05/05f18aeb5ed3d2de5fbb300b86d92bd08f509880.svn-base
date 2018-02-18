/**
 * Class Options
 */
define([
	"jquery",
	"jquery-ui",
	"src/utils/assetsmanager/SpriteManager",
	"src/utils/assetsmanager/SoundManager",
	"src/utils/localization/txt",
	"src/utils/Config"
],
function (
	$,
	ui,
	SpriteManager,
	SoundManager,
	txt,
	Config
) {
	var Options = function () {

	}


	/**
	 * Affiche le contenu dans popUp
	 */
	Options.prototype.init = function (UIManager) {
		$("#screenContainer").append("<div id='Options' class='popUp'></div>");
		$("#blackScreen").show();

		$("#screenContainer #Options").css("background-image", "url(" + SpriteManager.get("popUp").src + ")")
									  .css("width", 786.8)
									  .css("height", 444,5)
									  .css( "left", "170" )
									  .css( "top", "160" );

		$("#Options").append("<div class='buttonClose'>" + txt.get("LABEL_POPUP_CLOSEBTN") + "</div>");
		$("#Options .buttonClose").css("background-image", "url(" + SpriteManager.get("buttonLoginStatic").src + ")");

		// Hover
		$( "#Options .buttonClose").hover(function() {
			$( this ).css("background-image", "url(" + SpriteManager.get("buttonLoginSurvol").src + ")");
			$("#Options .buttonClose").css("background-repeat", "no-repeat");
			SoundManager.play("buttonHover");
		}, function() {
			$( this ).css("background-image", "url(" + SpriteManager.get("buttonLoginStatic").src + ")");
		});

		// Active
		$( "#Options .buttonClose").mousedown(function() {
			$("#Options .buttonClose").css("background-image", "url(" + SpriteManager.get("buttonLoginPress").src + ")");
			$("#Options .buttonClose").css("padding-top", 12);
		});

		$("#Options .buttonClose").mouseup(function() {
			$("#Options .buttonClose").css("background-image", "url(" + SpriteManager.get("buttonLoginStatic").src + ")");
			$("#Options .buttonClose").css("padding-top", 8);
			$("#blackScreen").hide();
			SoundManager.play("meow14");
			UIManager.closeScreen("Options", true);
		});

		
		var sliderName = ["Global", "Music", "Sfx"]
		var sliderFunction = [];

		for (var i = 0; i < sliderName.length; i++) {
			$("#Options").append("<div id='Bar'></div>")
			$("#Bar").append("<section><span id='tooltip" + sliderName[i] + "' class='tooltip bar" + sliderName[i] + "'></span><div id='slider" + sliderName[i] + "' class='slider bar" + sliderName[i] + "'></div></section>");

			sliderFunction[i] = (function(id) {
	  			return function () {
	  				var slider = $("#screenContainer #Options #slider" + sliderName[id]);
					var tooltip = $("#screenContainer #Options #tooltip" + sliderName[id]);  

					tooltip.hide();  
				  
					slider.slider({  
						range: "min",  
						min: 1,
						max: 393, 
						value: SoundManager.volume[sliderName[id].toLowerCase()] / 100 * 393,
				  
						start: function(event,ui) {  
						  tooltip.fadeIn('fast');
						},  
				  
						slide: function(event, ui) {  
							var volume = $('#volume' + sliderName[id]);  
				  			var value = ui.value;
				  			value = value / parseInt(slider.css("width")) * 100;
				  			value = Math.floor(value);
							tooltip.text(value);  				  
						},  
				  
						stop: function(event,ui) {
							var value = ui.value;
							value = value / parseInt(slider.css("width")) * 100;
							value = Math.floor(value);
							tooltip.fadeOut('fast');
							SoundManager.play("meow10");
							switch(sliderName[id]){
								case "Global":
									SoundManager.volume.global = value;
									SoundManager.play("nyan_elevator");
									break;
								case "Music":
									var temp = SoundManager.volume.sfx;
									SoundManager.volume.sfx = value;
									SoundManager.play("meow10");
									SoundManager.volume.music = value;
									SoundManager.volume.sfx = temp;
									SoundManager.play("nyan_elevator");
									break;
								case "Sfx":
									SoundManager.volume.sfx = value
									break;
							}
							var settings = JSON.parse(localStorage.getItem("settings"));
							if (settings == null) settings = {};
							settings.global = SoundManager.volume.global;
							settings.music = SoundManager.volume.music;
							settings.sfx = SoundManager.volume.sfx;
							localStorage.setItem("settings", JSON.stringify(settings));
						},  
					});
	  			}
			})(i);

			sliderFunction[i]();
		};

		$("#screenContainer #Options").append("<div class='optionsText title'>" + txt.get("LABEL_POPUP_OPTIONS_TITLE") + "</div>");

		$("#Options").append("<div id='textVolume'>" + txt.get("LABEL_POPUP_OPTIONS_VOLUME") + "</div>");
		$("#Options").append("<div id='textGlobal'>" + txt.get("LABEL_POPUP_OPTIONS_GLOBAL") + "</div>");
		$("#Options").append("<div id='textMusic'>" + txt.get("LABEL_POPUP_OPTIONS_MUSIC") + "</div>");
		$("#Options").append("<div id='textSfx'>" + txt.get("LABEL_POPUP_OPTIONS_SFX") + "</div>");
		$("#Options").append("<div id='descTitle'>" + txt.get("LABEL_POPUP_OPTIONS_DESCTITLE") + "</div>");

		var flagList = ["englishFlag", "frenchFlag", "germanFlag", "spanishFlag", "italianFlag", "polandFlag"];

		for (var i = 0; i < flagList.length; i++) {
		 	$("#Options").append("<div id='" + flagList[i] + "' class='flag'></div>");
			$("#Options #" + flagList[i]).css("background-image", "url(" + SpriteManager.get(flagList[i]).src + ")");

			//Hover
			$("#Options #" + flagList[i]).hover((function(id) {
				return function () {
					$(this).css("background-image", "url(" + SpriteManager.get(flagList[id] + "Survol").src + ")");
					$("#Options #" + flagList[id]).effect("shake", {distance: 1, times: 1});
				}
			})(i), (function(id) {
				return function () {
					$(this).css("background-image", "url(" + SpriteManager.get(flagList[id]).src + ")");
				}
			})(i) );

			//Active
			$("#Options #" + flagList[i]).mousedown((function(id) {
				return function () {
				}
			})(i));

			$("#Options #" + flagList[i]).mouseup((function(id, flagName) {
				return function () {
					SoundManager.play("buttonPress");

					if (flagName == "englishFlag") Config.language = "en";
					if (flagName == "frenchFlag") Config.language = "fr";
					if (flagName == "germanFlag") Config.language = "de";
					if (flagName == "spanishFlag") Config.language = "es";
					if (flagName == "italianFlag") Config.language = "it";
					if (flagName == "polandFlag") Config.language = "pl";
										
					UIManager.closeScreen("Options");
					if ($("#tile0").length <= 0) {
						UIManager.closeScreen("Menu");
						UIManager.addScreen("Menu");
					}
					UIManager.addScreen("Options");

					var settings = JSON.parse(localStorage.getItem("settings"));
					if (settings == null) settings = {};
					settings.language = Config.language;
					localStorage.setItem("settings", JSON.stringify(settings));
				}
			})(i, flagList[i]));
		}
	}

	
	return new Options();
});