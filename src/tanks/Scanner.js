//@flow strict

import TankPart from './TankPart.js';
import {getImage} from '../battleground/ImageLoader.js';
import ImageDrawer from '../battleground/ImageDrawer.js';
import Vec from '../casus/blocks/Vec.js';

type ScannerRange = 'SMALL' | 'MEDIUM' | 'LARGE';

const ROTATION_SPEED=Math.PI*2/(30*6);

class Scanner extends TankPart {
	seesItems: boolean;
	immuneToJammers: boolean;
	range: ScannerRange;
	offsetFromParent: Vec;
	rotation: number;
	width: number;

	constructor(seesItems: boolean, immuneToJammers: boolean, range: ScannerRange) {
		super();
		this.seesItems = seesItems;
		this.immuneToJammers = immuneToJammers;
		this.range = range;
		this.rotation = 0;
		if (range === 'SMALL') {
			this.width = 4;
			this.offsetFromParent=new Vec(2, -2);
		}
		else {
			this.width = 6;
			this.offsetFromParent=new Vec(2.5, -2.5);
		}
	}

	update(): void {
		//medium and large range scanners spin. The small ones don't, so they don't need to be updated
		if (this.range === 'MEDIUM' || this.range === 'LARGE') {
			this.rotation+=ROTATION_SPEED;
		}
	}

	drawSelf(drawer: ImageDrawer, parentPos: Vec, parentRotation: number) {
		let image='';
		switch (this.range) {
			case 'SMALL':
				image = this.seesItems?'SCANNER_SMALL_ITEMS':'SCANNER_SMALL';
				break;
			case 'MEDIUM':
				image = this.seesItems?'SCANNER_MEDIUM_ITEMS':'SCANNER_MEDIUM';
				break;
			case 'LARGE':
				image = this.seesItems?'SCANNER_LARGE_ITEMS':'SCANNER_LARGE';
				break;
			default:
				throw new Error('UNEXPECTED RANGE TYPE: '+this.range);
		}
		const position=parentPos.add(this.offsetFromParent.rotate(parentRotation));
		drawer.draw(getImage(image), position, this.width, parentRotation-Math.PI/2+this.rotation);
		if (this.immuneToJammers) {
			drawer.draw(getImage('SCANNER_BUBBLE'), position, this.width+1, 0);
		}
	}

}

export default Scanner;
