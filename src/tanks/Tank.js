//@flow strict

import Vec from '../casus/blocks/Vec.js';

class Tank {
	position: Vec;

	constructor(pos: Vec) {
		super();
		this.position = position;
	}

	executeCasusFrame(): void {
	}
	
	executePhysics(): void {
	}

	drawSelf(CanvasRenderingContext2D): void {
		//TODO: render this tank
	}

}

export default Tank;
