//@flow strict

import TankPart from './TankPart.js';
import {getImage} from '../battleground/ImageLoader.js';
import {verifyBoolean, verifyDouble} from '../casus/interpreter/Value.js';
import ImageDrawer from '../battleground/ImageDrawer.js';
import InterpriterState from '../casus/interpreter/InterpriterState.js';
import Vec from '../casus/blocks/Vec.js';
import Bullet from '../battleground/gameobjects/Bullet.js';
import {
	TURRET_DIRECTION_VAR_NAME,
	SHOOT_PRIMARY_WEAPON_VAR_NAME,
} from '../casus/userInteraction/CasusSpecialVariables.js';

import type Battleground from '../battleground/Battleground.js';
import type Tank from './Tank.js';
import type {BulletType} from '../battleground/gameobjects/Bullet.js';

const LERP_PERCENT=0.2;
const GUN_CENTER_TO_TANK_CENTER=2;
const GUN_CENTER_TO_GUN_ROT=2;
const TAU=Math.PI*2;
const FIRING_SLOWDOWN=0.6;

//
// Which guns are which types:
//
// Gun 1: Grenade launcher (grenades)
// Gun 2: Machine gun (regular bullets)
// Gun 3: Laser (green laser beams)
// Gun 4: Plasma blob (plasma blobs)
// Gun 5: Vulcan cannon (regular bullets, really fast)
// Gun 6: Death Ray (death rays)
// Gun 7: Shotgun (shotgun bullets)
// Gun 8: Lancer (shock particles)
// Gun 9: Missile launcher (missiles)
// Gun 10: Pulse Laser (pulse particle)
//

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

type GunStats = {
	betweenShotsCooldown: number,
	bullet: BulletType,
	orthogonalOffset: number,
};

const STATS_FOR_GUN: {[GunType]: GunStats} = {
	GUN_1: {
		bullet: 'GRENADE_BULLET',
		betweenShotsCooldown: 30,
		orthogonalOffset: 0,
	},
	GUN_2: {
		bullet: 'GUN_BULLET',
		betweenShotsCooldown: 8,
		orthogonalOffset: 0,
	},
	GUN_3: {
		bullet: 'GREEN_LASER',
		betweenShotsCooldown: 16,
		orthogonalOffset: 2
	},
	GUN_4: {
		bullet: 'PLASMA_BLOB',
		betweenShotsCooldown: 60,
		orthogonalOffset: 0,
	},
	GUN_5: {
		bullet: 'GUN_BULLET',
		betweenShotsCooldown: 4,
		orthogonalOffset: 1,
	},
	GUN_6: {
		bullet: 'DEATH_RAY_BULLET',
		betweenShotsCooldown: 25,
		orthogonalOffset: 0,
	},
	GUN_7: {
		bullet: 'SHOTGUN_BULLET',
		betweenShotsCooldown: 22,
		orthogonalOffset: 0,
	},
	GUN_8: {
		//TODO: handle this so it is shock particles
		bullet: 'GUN_BULLET',
		betweenShotsCooldown: 60,
		orthogonalOffset: 0,
	},
	GUN_9: {
		bullet: 'MISSILE',
		betweenShotsCooldown: 19,
		orthogonalOffset: 3,
	},
	GUN_10: {
		bullet: 'PULSE_LASER_PARTICLE',
		betweenShotsCooldown: 35,
		orthogonalOffset: 0,
	},
}

class Gun extends TankPart {

	//in order for the gun movement to look smooth but still be easy to write code for,
	//the gun will actually turn instantly, but it will look like it turns more slowly.
	//If you fire a bullet, the bullet will go in the gunAngle. However, the actual gun
	//is rendered at the displayAngle
	gunAngle: number;
	displayAngle: number;
	gunType: GunType;

	fireCooldown: number;
	firing: boolean;
	fireOnLeft: boolean;

	constructor(gunType: GunType) {
		super();
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
		this.fireCooldown--;
		if (tryToFire && this.fireCooldown<=0) {
			const gunStats=STATS_FOR_GUN[this.gunType];
			const myPosition=this._getPosition(parentPos, parentRotation);
			const offset=new Vec(0, gunStats.orthogonalOffset).rotate(this.gunAngle);
			const bulletPosition=this.fireOnLeft?myPosition.add(offset):myPosition.sub(offset);
			battleground.createGameObject(new Bullet(bulletPosition, this.gunAngle, parentTank, gunStats.bullet));
			this.fireCooldown = gunStats.betweenShotsCooldown;
			this.fireOnLeft = !this.fireOnLeft;
		}
		this.firing=tryToFire;
	}

	drawSelf(drawer: ImageDrawer, parentPos: Vec, parentRotation: number): void {
		const myPosition=this._getPosition(parentPos, parentRotation);
		drawer.draw(getImage(this.gunType), myPosition, 15, this.displayAngle-Math.PI/2);
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

	_getPosition(parentPos: Vec, parentRotation: number) {
		const gunRotAround=parentPos.add(new Vec(-GUN_CENTER_TO_TANK_CENTER, 0).rotate(parentRotation));
		const imageCenter=gunRotAround.add(new Vec(GUN_CENTER_TO_GUN_ROT, 0).rotate(this.displayAngle));
		return imageCenter;
	}

	//currently don't change rotation speed. Maybe we should change it?
	getMoveSpeedMultiplier(): number {
		const applyPenalty: boolean = this.fireCooldown>0 || this.firing;
		return applyPenalty?FIRING_SLOWDOWN:1;
	}

}

export default Gun;
