//@flow strict

import TankPart from './TankPart.js';
import {getImage} from '../battleground/ImageLoader.js';
import ImageDrawer from '../battleground/ImageDrawer.js';
import Vec from '../casus/blocks/Vec.js';
import type { TankComponent } from '../armory/TankComponent.js';
import type { ChassisType } from './ChassisType.js';

class Chassis extends TankPart {
	chassisType: ChassisType;
	name: TankComponent;

	constructor(name: TankComponent, chassisType: ChassisType) {
		super();
		this.name = name;
		this.chassisType = chassisType;
	}

	drawSelf(drawer: ImageDrawer, parentPos: Vec, parentRotation: number) {
		drawer.draw(getImage(this.chassisType), parentPos, 10, parentRotation-Math.PI/2);
	}

	getMoveSpeedMultiplier(): number {
		switch (this.chassisType) {
			case 'CHASSIS_1':
				return 1.3;
			case 'CHASSIS_2':
				return 0.95;
			case 'CHASSIS_3':
				return 1.1;
			case 'CHASSIS_4':
				return 0.95;
			case 'CHASSIS_5':
				return 1.3;
			default: throw new Error('UNEXPECTED CHASSIS TYPE: '+this.chassisType);
		}
	}

	getTurnSpeedMultiplier(): number {
		switch (this.chassisType) {
			case 'CHASSIS_1':
				return 1.2;
			case 'CHASSIS_2':
				return 0.95;
			case 'CHASSIS_3':
				return 1.05;
			case 'CHASSIS_4':
				return 0.95;
			case 'CHASSIS_5':
				return 1.2;
			default: throw new Error('UNEXPECTED CHASSIS TYPE: '+this.chassisType);
		}
	}

	getArmorOffset(): number {
		switch (this.chassisType) {
			case 'CHASSIS_1':
				return 150;
			case 'CHASSIS_2':
				return 200;
			case 'CHASSIS_3':
				return 150;
			case 'CHASSIS_4':
				return 170;
			case 'CHASSIS_5':
				return 130;
			default: throw new Error('UNEXPECTED CHASSIS TYPE: '+this.chassisType);
		}
	}

	getPointCost(): number {
		switch (this.chassisType) {
			case 'CHASSIS_1':
				return 3;
			case 'CHASSIS_2':
				return 3;
			case 'CHASSIS_3':
				return 1;
			case 'CHASSIS_4':
				return 1;
			case 'CHASSIS_5':
				return 1;
			default: throw new Error('UNEXPECTED CHASSIS TYPE: '+this.chassisType);
		}
	}

}

export default Chassis;
