/**
 * Manage all sounds
 */
define([
	"howler"
],
function (
	howler
) {
	var SoundManager = function () {
		// General volume
		this.volume = {
			global: 50,
			music: 100,
			sfx: 100
		}

		// Saved sound
		var settings = JSON.parse(localStorage.getItem("settings"));
		if (settings == null) settings = {};
		if (typeof settings.global != "undefined") {
			this.volume = {
				global: settings.global,
				music: settings.music,
				sfx: settings.sfx
			}
		}

		this.list = [];
		this.currentMusicInstance = null;
	}


	/*
	 * Play a sound, can have a callback called when the sound is finished
	 */
	SoundManager.prototype.play = function (name, loop) {
		if (loop == "undefined") loop = false;

		var currentSound = -1;
		for (var i = 0; i < this.list.length; i++) {
			if (this.list[i].name == name) {
				currentSound = this.list[i];
				break;
			}
		}

		if (currentSound == -1) throw new Error("SoundManager : Sound \"" + name + "\" does not exist.");

		var volumeType = this.volume[currentSound.type] * (this.volume.global / 100);
		var volumeSound = currentSound.volume * (volumeType / 100);
		volumeSound /= 100;

		// Callback
		if (loop) {
			currentSound.instance._onend = [function () {
				this.play(name);
			}.bind(this)];
		}
		currentSound.instance.volume(volumeSound);
		
		var instance = currentSound.instance.play();

		// Prevents multichannel if the audio source is music
		if (currentSound.type == "music") {
			if (this.currentMusicInstance != null) {
				this.currentMusicInstance.stop();
			}
			this.currentMusicInstance = instance;
		}

		return instance;
	}


	/*
	 * Stop a sound
	 */
	SoundManager.prototype.stop = function (name) {
		for (var i = 0; i < this.list.length; i++) {
			if (this.list[i].name == name) {
				this.list[i].instance.stop();
				break;
			}
		}
	}


	/*
	 * Stop all current sounds
	 */
	SoundManager.prototype.stopAll = function () {
		for (var i = 0; i < this.list.length; i++) {
			this.list[i].instance.stop();
		}
	}


	return new SoundManager();
});