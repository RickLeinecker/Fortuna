//@flow strict

import TankPart from './TankPart.js';
import {getImage} from '../battleground/ImageLoader.js';
import ImageDrawer from '../battleground/ImageDrawer.js';
import Vec from '../casus/blocks/Vec.js';

type JammerRange = 'SMALL' | 'MEDIUM' | 'LARGE';

class Jammer extends TankPart {
	range: JammerRange;
	offsetFromParent: Vec;
	width: number;

	constructor(range: JammerRange) {
		super();
		this.range = range;
		if (range === 'SMALL') {
			this.width = 4;
			this.offsetFromParent=new Vec(2, 2.2);
		}
		else {
			this.width = 6;
			this.offsetFromParent=new Vec(1.5, 2);
		}
	}

	drawSelf(drawer: ImageDrawer, parentPos: Vec, parentRotation: number) {
		let image='';
		switch (this.range) {
			case 'SMALL':
				image = 'JAMMER_SMALL';
				break;
			case 'MEDIUM':
				image = 'JAMMER_MEDIUM';
				break;
			case 'LARGE':
				image = 'JAMMER_LARGE';
				break;
			default:
				throw new Error('UNEXPECTED RANGE TYPE: '+this.range);
		}
		const position=parentPos.add(this.offsetFromParent.rotate(parentRotation));
		drawer.draw(getImage(image), position, this.width, parentRotation);
	}

}

export default Jammer;
