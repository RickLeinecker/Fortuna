//@flow strict

import TankPart from './TankPart.js';
import {getImage} from '../battleground/ImageLoader.js';
import {verifyBoolean, verifyDouble} from '../casus/interpreter/Value.js';
import ImageDrawer from '../battleground/ImageDrawer.js';
import InterpriterState from '../casus/interpreter/InterpriterState.js';
import Vec from '../casus/blocks/Vec.js';
import type { TankComponent } from '../armory/TankComponent.js';
import {
	TURRET_DIRECTION_VAR_NAME,
	SHOOT_PRIMARY_WEAPON_VAR_NAME,
} from '../casus/userInteraction/CasusSpecialVariables.js';

import type Battleground from '../battleground/Battleground.js';
import type Tank from './Tank.js';

const LERP_PERCENT=0.2;
const GUN_CENTER_TO_TANK_CENTER=2;
const GUN_CENTER_TO_GUN_ROT=2;
const TAU=Math.PI*2;
const FIRING_SLOWDOWN=0.6;

type GunType = 
	'GUN_1' |
	'GUN_2' |
	'GUN_3' |
	'GUN_4' |
	'GUN_5' |
	'GUN_6' |
	'GUN_7' |
	'GUN_8' |
	'GUN_9' |
	'GUN_10';

class Gun extends TankPart {

	name: TankComponent;

	//in order for the gun movement to look smooth but still be easy to write code for,
	//the gun will actually turn instantly, but it will look like it turns more slowly.
	//If you fire a bullet, the bullet will go in the gunAngle. However, the actual gun
	//is rendered at the displayAngle
	gunAngle: number;
	displayAngle: number;
	gunType: GunType;

	fireCooldown: number;
	firing: boolean;

	constructor(name: string, gunType: GunType) {
		super();
		this.name = name;
		this.gunAngle=0;
		this.displayAngle=0;
		this.gunType=gunType;
		this.fireCooldown=0;
		this.firing=false;
	}

	update(
		interpriterState: InterpriterState, 
		battleground: Battleground, 
		parentPos: Vec, 
		parentRotation: number,
		parentTank: Tank
	): void {
		this.setTargetGunAngle(this._getDouble(TURRET_DIRECTION_VAR_NAME, interpriterState));

		//lerp the displayAngle towards the gun angle
		//lerp is short for linear interpolation
		const positiveDistance=((this.gunAngle-this.displayAngle)%TAU+TAU)%TAU;
		const negativeDistance=((this.displayAngle-this.gunAngle)%TAU+TAU)%TAU;
		if (positiveDistance<negativeDistance) {
			this.displayAngle+=positiveDistance*LERP_PERCENT;
		}
		else {
			this.displayAngle-=negativeDistance*LERP_PERCENT;
		}
		this.displayAngle=(this.displayAngle%TAU+TAU)%TAU;

		const tryToFire=this._getBoolean(SHOOT_PRIMARY_WEAPON_VAR_NAME, interpriterState);
		if (tryToFire) {
			console.log('firing');
		}
		this.firing=tryToFire;
	}

	drawSelf(drawer: ImageDrawer, parentPos: Vec, parentRotation: number): void {
		const gunRotAround=parentPos.add(new Vec(-GUN_CENTER_TO_TANK_CENTER, 0).rotate(parentRotation));
		const imageCenter=gunRotAround.add(new Vec(GUN_CENTER_TO_GUN_ROT, 0).rotate(this.displayAngle));
		drawer.draw(getImage(this.gunType), imageCenter, 15, this.displayAngle-Math.PI/2);
	}

	setTargetGunAngle(gunAngle: number): void {
		this.gunAngle=(gunAngle%TAU+TAU)%TAU;
	}

	_getDouble(name: string, interpriterState: InterpriterState): number {
		return verifyDouble(interpriterState.getVariable('DOUBLE', name)).val;
	}

	_getBoolean(name: string, interpriterState: InterpriterState): boolean {
		return verifyBoolean(interpriterState.getVariable('BOOLEAN', name)).val;
	}

	//currently don't change rotation speed. Maybe we should change it?
	getMoveSpeedMultiplier(): number {
		const applyPenalty: boolean = this.fireCooldown>0 || this.firing;
		return applyPenalty?FIRING_SLOWDOWN:1;
	}

}

export default Gun;
