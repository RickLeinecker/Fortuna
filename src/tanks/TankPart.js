//@flow strict

import type ImageDrawer from '../battleground/ImageDrawer.js';
import type Vec from '../casus/blocks/Vec.js';
import type Battleground from '../battleground/Battleground.js';
import type Tank from './Tank.js';
import type InterpriterState from '../casus/interpreter/InterpriterState.js';

//A parent class for all tank parts

class TankPart {
	update(
		interpriterState: 
		InterpriterState, 
		battleground: Battleground, 
		parentPos: Vec, 
		parentRotation: number,
		parentTank: Tank
	) {
	}

	drawSelf(drawer: ImageDrawer, parentPos: Vec, parentRotation: number) {
	}

}

export default TankPart;
