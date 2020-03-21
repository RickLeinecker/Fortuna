//@flow strict

import TankPart from './TankPart.js';
import {getImage} from '../battleground/ImageLoader.js';
import ImageDrawer from '../battleground/ImageDrawer.js';
import Vec from '../casus/blocks/Vec.js';
import type { TankComponent } from '../armory/TankComponent.js';

class Chassis extends TankPart {

	name: TankComponent;

	constructor(name: TankComponent) {
		super();
		this.name = name;
	}

	drawSelf(drawer: ImageDrawer, parentPos: Vec, parentRotation: number) {
		drawer.draw(getImage('BLUE_CHASSIS_1'), parentPos, 10, parentRotation-Math.PI/2);
	}

}

export default Chassis;
