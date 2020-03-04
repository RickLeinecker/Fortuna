//@flow strict

import Vec from '../casus/blocks/Vec.js';
import ImageDrawer from './ImageDrawer.js';
import {getImage} from './ImageLoader.js';

class Wall {
	position: Vec;
	angle: number;

	constructor(position: Vec, angle: number) {
		this.position = position;
		this.angle=angle;
	}
	
	drawSelf(drawer: ImageDrawer): void {
		drawer.draw(getImage('WALL'), this.position, 45, this.angle);
	}
}

export default Wall;
