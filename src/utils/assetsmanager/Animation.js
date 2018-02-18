/**
 * Allows animation creation via spriteSheet.
 * This class will contain animPause, onAnimEnd, setState etc functions and varied spriteSheet-s
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
	 * Constructor
	 * @animationName Name of the animation
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
	 *  Change the state of the animation
	 * @name state name
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
	 * Pause the animation at the first frame
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
	 * Pause the animation 
	 */
	Animation.prototype.pause = function () {
		this.paused = true
	}


	/*
	 * Reactivate the animation
	 */
	Animation.prototype.resume = function () {
		this.paused = false;
	}


	Animation.prototype.destroy = function () {
		AnimationManager.list.splice(AnimationManager.list.indexOf(this), 1);
	}
	

	return Animation;
});