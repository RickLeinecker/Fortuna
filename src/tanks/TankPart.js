//@flow strict

import type ImageDrawer from '../battleground/ImageDrawer.js';
import type Vec from '../casus/blocks/Vec.js';
import type Battleground from '../battleground/Battleground.js';
import type Tank from './Tank.js';
import type InterpriterState from '../casus/interpreter/InterpriterState.js';
import type { TankComponent } from '../armory/TankComponent.js';

//A parent class for all tank parts

class TankPart {

	name: TankComponent;

	update(
		interpriterState: 
		InterpriterState, 
		battleground: Battleground, 
		parentPos: Vec, 
		parentRotation: number,
		parentTank: Tank,
	) {
	}

	drawSelf(drawer: ImageDrawer, parentPos: Vec, parentRotation: number) {
	}

	//returns the multiplier that this gives to your move speed
	getMoveSpeedMultiplier(): number {
		return 1;
	}

	//returns the multiplier that this gives to your turn speed
	getTurnSpeedMultiplier(): number {
		return 1;
	}

	//returns the additive offset that this gives to your armor
	getArmorOffset(): number {
		return 0;
	}

	//get the number of points that this item costs
	getPointCost(): number {
		return 1;
	}
}

export default TankPart;
