//@flow strict

import Vec from '../casus/blocks/Vec.js';
import {getImage} from '../battleground/ImageLoader.js';

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
		const treadsImage = getImage('GREY_TREAD_1');
		const chassisImage = getImage('BLUE_CHASSIS_1');
		const gunImage = getImage('RED_GUN_1');
		ctx.drawImage(treadsImage, this.position.x, this.position.y, 100, 100);
		ctx.drawImage(chassisImage, this.position.x, this.position.y, 100, 100);
		ctx.drawImage(gunImage, this.position.x-25, this.position.y-25, 150, 150);
	}

}

export default Tank;
