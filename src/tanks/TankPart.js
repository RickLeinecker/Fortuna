//@flow strict

import ImageDrawer from '../battleground/ImageDrawer.js';
import Vec from '../casus/blocks/Vec.js';
import Battleground from '../battleground/Battleground.js';
import InterpriterState from '../casus/interpreter/InterpriterState.js';

//A parent class for all tank parts

class TankPart {

	update(interpriterState: InterpriterState, battleground: Battleground, parentPos: Vec, parentRotation: number) {
	}

	drawSelf(drawer: ImageDrawer, parentPos: Vec, parentRotation: number) {
	}

}

export default TankPart;
