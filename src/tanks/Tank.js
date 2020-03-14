//@flow strict

import Vec from '../casus/blocks/Vec.js';
import TankPart from './TankPart.js'
import ImageDrawer from '../battleground/ImageDrawer.js';
import InterpriterState from '../casus/interpreter/InterpriterState.js';
import {getInterpriterState, setInterpriterState} from '../casus/interpreter/InterpriterState.js';
import CasusBlock from '../casus/blocks/CasusBlock.js';
import {verifyDouble} from '../casus/interpreter/Value.js';

class Tank {
	position: Vec;
	rotation: number;

	// parts: 
	chassis: TankPart;
	treads: TankPart;
	mainGun: TankPart;

	// Casus:
	interpriterState: InterpriterState;
	casusCode: CasusBlock;

	constructor(position: Vec, chassis: TankPart, treads: TankPart, mainGun: TankPart, casusCode: CasusBlock) {
		this.position = position;

		this.chassis = chassis;
		this.treads = treads;
		this.mainGun = mainGun;

		this.interpriterState = new InterpriterState();
		this.casusCode = casusCode;
	}

	executeCasusFrame(): void {
		setInterpriterState(this.interpriterState);	
		this.casusCode.evaluate();
		this.interpriterState = getInterpriterState();
	}
	
	executePhysics(): void {
		const amountToMove = verifyDouble(this.interpriterState.getVariable('DOUBLE', 'forwardMovement')).val;
		this.position=this.position.add(new Vec(0, amountToMove*0.6));
	}

	drawSelf(drawer: ImageDrawer): void {
		this.treads.drawSelf(drawer, this.position, this.rotation);
		this.chassis.drawSelf(drawer, this.position, this.rotation);
		this.mainGun.drawSelf(drawer, this.position, this.rotation);
	}

}

export default Tank;
