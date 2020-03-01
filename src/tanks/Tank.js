//@flow strict

import Vec from '../casus/blocks/Vec.js';
import {getImage} from '../battleground/ImageLoader.js';
import ImageDrawer from '../battleground/ImageDrawer.js';

class Tank {
	position: Vec;

	constructor(position: Vec) {
		this.position = position;
	}

	executeCasusFrame(): void {
	}
	
	executePhysics(): void {
	}

	drawSelf(drawer: ImageDrawer): void {
		const treadsImage = getImage('GRAY_TREAD_1');
		const chassisImage = getImage('BLUE_CHASSIS_1');
		const gunImage = getImage('RED_GUN_1');
		drawer.draw(treadsImage, this.position, 100, 0);
		drawer.draw(chassisImage, this.position, 100, 0);
		drawer.draw(gunImage, this.position, 150, 1);
	}

}

export default Tank;
