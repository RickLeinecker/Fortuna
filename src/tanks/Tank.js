//@flow strict

import Vec from '../casus/blocks/Vec.js';

class Tank {
	position: Vec;

	constructor(position: Vec) {
		this.position = position;
	}

	executeCasusFrame(): void {
	}
	
	executePhysics(): void {
	}

	drawSelf(ctx: CanvasRenderingContext2D): void {
		//TODO: render this tank
	}

}

export default Tank;
