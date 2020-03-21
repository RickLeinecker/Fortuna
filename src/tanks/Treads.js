//@flow strict

import TankPart from './TankPart.js';
import {getImage} from '../battleground/ImageLoader.js';
import ImageDrawer from '../battleground/ImageDrawer.js';
import Vec from '../casus/blocks/Vec.js';
import type { TankComponent } from '../armory/TankComponent.js';

// 4 Tread types:
// 
// Tread 1: Heavily Armored Treads
//   -2 linear speed, -1 rot speed, +2 armor, +2 point cost
//
// Tread 2: Advanced Treads
//   +2 linear speed, +1 rot speed, +0 armor, +2 point cost
//	
// Tread 3: Fast Treads
//   +1 linear speed, +1 rot speed, +0 armor, +1 point cost
//
// Tread 4: Armored Treads
//   -1 linear speed, -1 rot speed, +1 armor, +1 point cost
//

type TreadType = 
	'TREAD_1' |
	'TREAD_2' |
	'TREAD_3' |
	'TREAD_4';

class Treads extends TankPart {
	treadType: TreadType;

	constructor(treadType: TreadType) {
		super();
		this.treadType=treadType;
	}

	name: TankComponent;

	constructor(name: TankComponent) {
		super();
		this.name = name;
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
