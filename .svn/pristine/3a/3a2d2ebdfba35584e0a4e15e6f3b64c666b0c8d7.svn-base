/*
 * Liste des animation disponible
 */
define([
],
function (
) {
	var AnimationList = function () {
		this.list = [{
			name: "player",
			state: {
				default: "static",
				static: {
					animSpeed: 100,
					key: [{
						x: 32,
						y: 0,
						width: 32,
						height: 32
					}]
				},
				down: {
					animSpeed: 100,
					key: [{
						x: 32 * 0,
						y: 32 * 0,
						width: 32,
						height: 32
					}, {
						x: 32 * 1,
						y: 32 * 0,
						width: 32,
						height: 32	
					},  {
						x: 32 * 2,
						y: 32 * 0,
						width: 32,
						height: 32	
					}]
				},
				left: {
					animSpeed: 100,
					key: [{
						x: 32 * 0,
						y: 32 * 1,
						width: 32,
						height: 32
					}, {
						x: 32 * 1,
						y: 32 * 1,
						width: 32,
						height: 32	
					},  {
						x: 32 * 2,
						y: 32 * 1,
						width: 32,
						height: 32	
					}]
				},
				right: {
					animSpeed: 100,
					key: [{
						x: 32 * 0,
						y: 32 * 2,
						width: 32,
						height: 32
					}, {
						x: 32 * 1,
						y: 32 * 2,
						width: 32,
						height: 32	
					},  {
						x: 32 * 2,
						y: 32 * 2,
						width: 32,
						height: 32	
					}]
				},
				up: {
					animSpeed: 100,
					key: [{
						x: 32 * 0,
						y: 32 * 3,
						width: 32,
						height: 32
					}, {
						x: 32 * 1,
						y: 32 * 3,
						width: 32,
						height: 32	
					},  {
						x: 32 * 2,
						y: 32 * 3,
						width: 32,
						height: 32	
					}]
				}
			}
 		}]
	}


	/*
	 * Retourne une animation
	 */
	AnimationList.prototype.get = function (name) {
		for (var i = 0; i < this.list.length; i++) {
			if (this.list[i].name == name) {
				return this.list[i];
			}
		};
		throw new Error("AnimationList : Animation " + name + " does not exist.");
	}


	return new AnimationList();
});