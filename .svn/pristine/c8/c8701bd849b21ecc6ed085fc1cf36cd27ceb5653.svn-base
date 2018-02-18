/**
 * Permet de crée une animation disponible via un spriteSheet.
 * Cette classe va contenir toute les function animPause, onAnimEnd, setState etc et tout les differents spriteSheet
 */
define([
	"src/utils/assetsmanager/AnimationList",
	"src/utils/assetsmanager/AnimationManager",
	"src/utils/math/Vector2"
],
function (
	AnimationList,
	AnimationManager,
	Vector2
) {
	/*
	 * Constructeur
	 * @animationName Nom de l'animation
	 */
	var Animation = function (animationName) {
		this.animTimer = Date.now();
		this.paused = false;
		this.anim = AnimationList.get(animationName);
		this.currentState = this.anim.state[this.anim.state.default];
		this.currentKey = 0;
		this.clipCoord = {
			sposition: new Vector2(this.currentState.key[this.currentKey].x, this.currentState.key[this.currentKey].y),
			swidth: this.currentState.key[this.currentKey].width,
			sheight: this.currentState.key[this.currentKey].height
		};
		AnimationManager.list.push(this)
	}


	Animation.prototype.update = function () {
		if (Date.now() - this.animTimer >= this.currentState.animSpeed && !this.paused) {
			this.currentKey++;
			if (this.currentState.key.length <= this.currentKey) {
				this.currentKey = 0;
			}
			this.clipCoord.sposition.x = this.currentState.key[this.currentKey].x;
			this.clipCoord.sposition.y = this.currentState.key[this.currentKey].y;
			this.clipCoord.swidth = this.currentState.key[this.currentKey].width;
			this.clipCoord.sheight = this.currentState.key[this.currentKey].height;
			this.animTimer = Date.now();
		}
	}

	/*
	 * Change l'état de l'animation
	 * @name nom de l'état
	 */
	Animation.prototype.setState = function (name) {
		if (this.currentState != this.anim.state[name]) {
			this.animTimer = Date.now();
			this.currentState = this.anim.state[name];
			this.currentKey = 0;
			this.clipCoord = {
				sposition: new Vector2(this.currentState.key[this.currentKey].x, this.currentState.key[this.currentKey].y),
				swidth: this.currentState.key[this.currentKey].width,
				sheight: this.currentState.key[this.currentKey].height
			};
		}
	}


	/*
	 * Met en pause l'animation à la première frame d'animation
	 */
	Animation.prototype.stop = function () {
		this.currentKey = 0;
		this.paused = true;
		this.clipCoord.sposition.x = this.currentState.key[this.currentKey].x;
		this.clipCoord.sposition.y = this.currentState.key[this.currentKey].y;
		this.clipCoord.swidth = this.currentState.key[this.currentKey].width;
		this.clipCoord.sheight = this.currentState.key[this.currentKey].height;
	}


	/*
	 * Met en pause l'animation 
	 */
	Animation.prototype.pause = function () {
		this.paused = true
	}


	/*
	 * Ré-active l'animation
	 */
	Animation.prototype.resume = function () {
		this.paused = false;
	}


	Animation.prototype.destroy = function () {
		AnimationManager.list.splice(AnimationManager.list.indexOf(this), 1);
	}
	

	return Animation;
});