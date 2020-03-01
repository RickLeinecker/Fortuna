//@flow strict

import Vec from '../casus/blocks/Vec.js';
import TankPart from './TankPart.js'
import ImageDrawer from '../battleground/ImageDrawer.js';

class Tank {
	position: Vec;
	rotation: number;

	// parts: 
	chassis: TankPart;
	treads: TankPart;
	mainGun: TankPart;

	constructor(position: Vec, chassis: TankPart, treads: TankPart, mainGun: TankPart) {
		this.position = position;

		this.chassis = chassis;
		this.treads = treads;
		this.mainGun = mainGun;
	}

	executeCasusFrame(): void {
	}
	
	executePhysics(): void {
	}

	drawSelf(drawer: ImageDrawer): void {
		this.treads.drawSelf(drawer, this.position, this.rotation);
		this.chassis.drawSelf(drawer, this.position, this.rotation);
		this.mainGun.drawSelf(drawer, this.position, this.rotation);
	}

}

export default Tank;
