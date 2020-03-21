//@flow strict

import TankPart from './TankPart.js';
import {getImage} from '../battleground/ImageLoader.js';
import ImageDrawer from '../battleground/ImageDrawer.js';
import Vec from '../casus/blocks/Vec.js';

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

	drawSelf(drawer: ImageDrawer, parentPos: Vec, parentRotation: number) {
		drawer.draw(getImage(this.treadType), parentPos, 10, parentRotation-Math.PI/2);
	}

}

export default Treads;
