//@flow strict

import TankPart from './TankPart.js';
import {getImage} from '../battleground/ImageLoader.js';
import ImageDrawer from '../battleground/ImageDrawer.js';
import Vec from '../casus/blocks/Vec.js';

type ChassisType =
	'CHASSIS_1' |
	'CHASSIS_2' |
	'CHASSIS_3' |
	'CHASSIS_4' |
	'CHASSIS_5';

class Chassis extends TankPart {
	chassisType: ChassisType;

	constructor(chassisType: ChassisType) {
		super();
		this.chassisType=chassisType;
	}

	drawSelf(drawer: ImageDrawer, parentPos: Vec, parentRotation: number) {
		drawer.draw(getImage(this.chassisType), parentPos, 10, parentRotation-Math.PI/2);
	}

}

export default Chassis;
