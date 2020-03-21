//@flow strict

import TankPart from './TankPart.js';
import {getImage} from '../battleground/ImageLoader.js';
import ImageDrawer from '../battleground/ImageDrawer.js';
import Vec from '../casus/blocks/Vec.js';
import type { TankComponent } from '../armory/TankComponent.js';
import type { TreadType } from './TreadType.js';

class Treads extends TankPart {
	
	treadType: TreadType;
	name: TankComponent;

	constructor(name: TankComponent, treadType: TreadType) {
		super();
		this.treadType=treadType;
		this.name = name
	}

	drawSelf(drawer: ImageDrawer, parentPos: Vec, parentRotation: number) {
		drawer.draw(getImage(this.treadType), parentPos, 10, parentRotation-Math.PI/2);
	}

	getMoveSpeedMultiplier(): number {
		switch (this.treadType) {
			case 'TREAD_1':
				return 0.80;
			case 'TREAD_2':
				return 1.2;
			case 'TREAD_3':
				return 1.1;
			case 'TREAD_4':
				return 0.9;
			default: throw new Error('UNEXPECTED TREAD TYPE: '+this.treadType);
		}
	}

	getTurnSpeedMultiplier(): number {
		switch (this.treadType) {
			case 'TREAD_1':
				return 0.9;
			case 'TREAD_2':
				return 1.1;
			case 'TREAD_3':
				return 0.95;
			case 'TREAD_4':
				return 1.05;
			default: throw new Error('UNEXPECTED TREAD TYPE: '+this.treadType);
		}
	}

	getArmorOffset(): number {
		switch (this.treadType) {
			case 'TREAD_1':
				return 50;
			case 'TREAD_2':
				return 0;
			case 'TREAD_3':
				return 0;
			case 'TREAD_4':
				return 25;
			default: throw new Error('UNEXPECTED TREAD TYPE: '+this.treadType);
		}
	}

	getPointCost(): number {
		switch (this.treadType) {
			case 'TREAD_1':
				return 2;
			case 'TREAD_2':
				return 2;
			case 'TREAD_3':
				return 1;
			case 'TREAD_4':
				return 1;
			default: throw new Error('UNEXPECTED TREAD TYPE: '+this.treadType);
		}
	}

}

export default Treads;
