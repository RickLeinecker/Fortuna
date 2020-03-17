//@flow strict

import Vec from '../casus/blocks/Vec.js';
import TankPart from './TankPart.js'
import Gun from './Gun.js';
import ImageDrawer from '../battleground/ImageDrawer.js';
import InterpriterState from '../casus/interpreter/InterpriterState.js';
import {getInterpriterState, setInterpriterState} from '../casus/interpreter/InterpriterState.js';
import CasusBlock from '../casus/blocks/CasusBlock.js';
import {verifyDouble} from '../casus/interpreter/Value.js';
import Seg from '../geometry/Seg.js';
import Circle from '../geometry/Circle.js';
import BooleanValue from '../casus/interpreter/BooleanValue.js';
import {
	RAN_INTO_WALL_VAR_NAME,
	FORWARD_MOVEMENT_VAR_NAME,
	TARGET_DIRECTION_VAR_NAME,
	TURRET_DIRECTION_VAR_NAME,
} from '../casus/userInteraction/CasusSpecialVariables.js';

class Tank {
	position: Vec;
	rotation: number;

	// tank info
	tankId: string;
	tankName: string;
	isBot: boolean;

	// parts: 
	chassis: TankPart;
	treads: TankPart;
	mainGun: Gun;
	secondaryGun: Gun;
	mainScanner: TankPart;
	secondaryScanner: TankPart;
	tertiaryScanner: TankPart;
	jammer: TankPart;
	firstSingleUseItem: TankPart;
	secondSingleUseItem: TankPart;
	thirdSingleUseItem: TankPart;

	// Casus:
	interpriterState: InterpriterState;
	casusCode: CasusBlock;

	constructor(
		position: Vec, 
		tankId: string, 
		tankName: string, 
		isBot: boolean, 
		chassis: TankPart, 
		mainGun: Gun, 
		secondaryGun: Gun, 
		mainScanner: TankPart, 
		secondaryScanner: TankPart,
		tertiaryScanner: TankPart, 
		jammer: TankPart, 
		treads: TankPart, 
		firstSingleUseItem: TankPart, 
		secondSingleUseItem: TankPart, 
		thirdSingleUseItem: TankPart, 
		casusCode: CasusBlock) {
		this.position = position;

		this.tankId = tankId;
		this.tankName = tankName;
		this.isBot = isBot;

		this.chassis = chassis;
		this.treads = treads;
		this.mainGun = mainGun;
		this.secondaryGun = secondaryGun;
		this.mainScanner = mainScanner;
		this.secondaryScanner = secondaryScanner;
		this.tertiaryScanner = tertiaryScanner;
		this.jammer = jammer;
		this.firstSingleUseItem = firstSingleUseItem;
		this.secondSingleUseItem = secondSingleUseItem;
		this.thirdSingleUseItem = thirdSingleUseItem;

		this.interpriterState = new InterpriterState();
		this.casusCode = casusCode;
		this.rotation = Math.PI*0.8;
	}

	executeCasusFrame(): void {
		setInterpriterState(this.interpriterState);	
		this.casusCode.evaluate();
		this.interpriterState = getInterpriterState();
	}
	
	executePhysics(walls: Array<Seg>, tanks: Array<Tank>): void {

		//movement stuff
		const otherTanks = tanks.filter(otherTank => otherTank !== this);
		const forwardMovementUnclamped = verifyDouble(this.interpriterState.getVariable('DOUBLE', FORWARD_MOVEMENT_VAR_NAME)).val;
		let forwardMovement = Math.max(-1, Math.min(1, forwardMovementUnclamped));
		const targetDirection = verifyDouble(this.interpriterState.getVariable('DOUBLE', TARGET_DIRECTION_VAR_NAME)).val;

		const unit=new Vec(1, 0);
		const targetVec=unit.rotate(targetDirection);
		const facingVec=unit.rotate(this.rotation);

		let dAngle=Math.asin(facingVec.cross(targetVec));
		if (targetVec.dot(facingVec)<0) {
			if (dAngle<0) {
				dAngle = -Math.PI - dAngle;
			}
			else {
				dAngle = Math.PI + dAngle;
			}
		}
		const totalMovement=Math.abs(forwardMovement)+2*Math.abs(dAngle);
		forwardMovement/=Math.max(1, totalMovement)*1;
		dAngle/=Math.max(1, totalMovement)*2;

		this.rotation+=dAngle;
		const oldPosition=this.position;
		this.position=this.position.add(unit.rotate(this.rotation).scale(0.7*forwardMovement));
		let ranIntoWall=false;
		if (this.intersectingTankOrWall(walls, otherTanks)) {
			this.position=oldPosition;
			ranIntoWall=true;
		}

		this.interpriterState.setVariable('BOOLEAN', RAN_INTO_WALL_VAR_NAME, new BooleanValue(ranIntoWall));
		//end of movement stuff
		
		//gun stuff
		const turretDirection = verifyDouble(this.interpriterState.getVariable('DOUBLE', TURRET_DIRECTION_VAR_NAME));
		this.mainGun.setTargetGunAngle(turretDirection.val);
		this.mainGun.onUpdate();
		//end of gun stuff
	}

	intersectingTankOrWall(walls: Array<Seg>, tanks: Array<Tank>): boolean {
		const me=this.getBoundingCircle();
		for (const wall: Seg of walls) {
			const myCircle=new Circle(me.c, me.r+wall.paddingWidth);
			if (myCircle.intersectsSeg(wall)) {
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
