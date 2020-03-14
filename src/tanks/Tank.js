//@flow strict

import Vec from '../casus/blocks/Vec.js';
import TankPart from './TankPart.js'
import ImageDrawer from '../battleground/ImageDrawer.js';
import InterpriterState from '../casus/interpreter/InterpriterState.js';
import {getInterpriterState, setInterpriterState} from '../casus/interpreter/InterpriterState.js';
import CasusBlock from '../casus/blocks/CasusBlock.js';
import {verifyDouble} from '../casus/interpreter/Value.js';
import Seg from '../geometry/Seg.js';
import Circle from '../geometry/Circle.js';

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
	
	executePhysics(walls: Array<Seg>, tanks: Array<Tank>): void {
		const otherTanks = tanks.filter(otherTank => otherTank !== this);
		const amountToMove = verifyDouble(this.interpriterState.getVariable('DOUBLE', 'forwardMovement')).val;
		const oldPosition=this.position;
		this.position=this.position.add(new Vec(0, amountToMove*0.5));
		if (this.intersectingTankOrWall(walls, otherTanks)) {
			this.position=oldPosition;
		}
	}

	intersectingTankOrWall(walls: Array<Seg>, tanks: Array<Tank>): boolean {
		const me=this.getBoundingCircle();
		for (const wall: Seg of walls) {
			if (me.intersectsSeg(wall)) {
				return true;
			}
		}
		for (const otherTank: Tank of tanks) {
			if (me.intersectsCircle(otherTank.getBoundingCircle())) {
				return true;
			}
		}
		return false;
	}

	getBoundingCircle(): Circle {
		return new Circle(this.position, 4);
	}

	drawSelf(drawer: ImageDrawer): void {
		this.treads.drawSelf(drawer, this.position, this.rotation);
		this.chassis.drawSelf(drawer, this.position, this.rotation);
		this.mainGun.drawSelf(drawer, this.position, this.rotation);
	}

}

export default Tank;
