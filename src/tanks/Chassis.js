//@flow strict

import TankPart from './TankPart.js';
import {getImage} from '../battleground/ImageLoader.js';
import ImageDrawer from '../battleground/ImageDrawer.js';
import Vec from '../casus/blocks/Vec.js';
import type { TankComponent } from '../armory/TankComponent.js';

// 5 Chassis types:
//
// Chassis 1: Light
// 	-Fast, quick to turn
//
// Chassis 2: Heavy
//  -strongest and slowest
// 
// Chassis 3: Moddable
//  -medium in pretty much all respects
//
// Chassis 4: Moddable Heavy
//  -slower, medium health, but more free slots
//
// Chassis 5: Moddable Light
//  -light and fast, weakest, more free slots
//
type ChassisType = 'CHASSIS_1' | 'CHASSIS_2' | 'CHASSIS_3' | 'CHASSIS_4' | 'CHASSIS_5';

class Chassis extends TankPart {

	chassisType: ChassisType;

	constructor(name: TankComponent) {
		super(name);

		switch(name) {
			case 'light':
				this.chassisType = 'CHASSIS_1';
				break;
			case 'heavy':
				this.chassisType = 'CHASSIS_2';
				break;
			case 'moddable':
				this.chassisType = 'CHASSIS_3';
				break;
			case 'moddableHeavy':
				this.chassisType = 'CHASSIS_4';
				break;
			case 'moddableLight':
				this.chassisType = 'CHASSIS_5';
				break;
			case 'empty':
				this.chassisType = 'CHASSIS_1';
				break;
			default:
				break;
		}
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
