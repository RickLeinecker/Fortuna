//@flow strict

import ImageDrawer from '../battleground/ImageDrawer.js';
import Vec from '../casus/blocks/Vec.js';

//A parent class for all tank parts

class TankPart {
	name: string;

	constructor(name:string){
		this.name = name;
	}
	drawSelf(drawer: ImageDrawer, parentPos: Vec, parentRotation: number) {
	}

}

export default TankPart;
