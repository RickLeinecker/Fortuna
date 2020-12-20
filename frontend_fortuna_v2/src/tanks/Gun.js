//@flow strict

import TankPart from './TankPart.js';
import { getImage } from '../battleground/ImageLoader.js';
import { verifyBoolean, verifyDouble } from '../casus/interpreter/Value.js';
import ImageDrawer from '../battleground/ImageDrawer.js';
import InterpriterState from '../casus/interpreter/InterpriterState.js';
import Vec from '../casus/blocks/Vec.js';
import Bullet from '../battleground/gameobjects/Bullet.js';
import {
	TURRET_DIRECTION_VAR_NAME,
	SHOOT_PRIMARY_WEAPON_VAR_NAME,
	SHOOT_SECONDARY_WEAPON_VAR_NAME,
} from '../casus/userInteraction/CasusSpecialVariables.js';

import type { TankComponent } from '../globalComponents/typesAndClasses/TankComponent.js';
import type Battleground from '../battleground/Battleground.js';
import type Tank from './Tank.js';
import type { BulletType } from '../battleground/gameobjects/Bullet.js';

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
	numBulletsPerShot: number,
};

const STATS_FOR_GUN: {[GunType]: GunStats} = {
	GUN_1: {
		bullet: 'GRENADE_BULLET',
		betweenShotsCooldown: 30,
		orthogonalOffset: 0,
		numBulletsPerShot: 1,
	},
	GUN_2: {
		bullet: 'GUN_BULLET',
		betweenShotsCooldown: 9,
		orthogonalOffset: 0.7,
		numBulletsPerShot: 1,
	},
	GUN_3: {
		bullet: 'RED_LASER',
		betweenShotsCooldown: 10,
		orthogonalOffset: 2,
		numBulletsPerShot: 2,
	},
	GUN_4: {
		bullet: 'PLASMA_BLOB',
		betweenShotsCooldown: 80,
		orthogonalOffset: 0,
		numBulletsPerShot: 1,
	},
	GUN_5: {
		bullet: 'GUN_BULLET',
		betweenShotsCooldown: 4,
		orthogonalOffset: 1,
		numBulletsPerShot: 1,
	},
	GUN_6: {
		bullet: 'DEATH_RAY_BULLET',
		betweenShotsCooldown: 25,
		orthogonalOffset: 0,
		numBulletsPerShot: 1,
	},
	GUN_7: {
		bullet: 'SHOTGUN_BULLET',
		betweenShotsCooldown: 22,
		orthogonalOffset: 0,
		numBulletsPerShot: 9,
	},
	GUN_8: {
		bullet: 'LANCER_PARTICLE',
		betweenShotsCooldown: 60,
		orthogonalOffset: 0,
		numBulletsPerShot: 1,
	},
	GUN_9: {
		bullet: 'MISSILE',
		betweenShotsCooldown: 19,
		orthogonalOffset: 3,
		numBulletsPerShot: 1,
	},
	GUN_10: {
		bullet: 'PULSE_LASER_PARTICLE',
		betweenShotsCooldown: 35,
		orthogonalOffset: 0,
		numBulletsPerShot: 1,
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
	isSecondary: boolean;

	fireCooldown: number;
	firing: boolean;
	fireOnLeft: boolean;

	moveSpeedMultiplier: number;

	constructor(name: TankComponent, isSecondary: boolean) {
		super(name);
		if (name==null) {
			throw new Error('Cannot have a name of null');
		}
		switch(name) {
			case 'grenadeLauncher':
				this.gunType = 'GUN_1';
				break;
			case 'machineGun':
				this.gunType = 'GUN_2';
				break;
			case 'laser':
				this.gunType = 'GUN_3';
				break;
			case 'plasma':
				this.gunType = 'GUN_4';
				break;
			case 'vulcanCannon':
				this.gunType = 'GUN_5';
				break;
			case 'deathRay':
				this.gunType = 'GUN_6';
				break;
			case 'shotgun':
				this.gunType = 'GUN_7';
				break;
			case 'lancer':
				this.gunType = 'GUN_8';
				break;
			case 'missile':
				this.gunType = 'GUN_9';
				break;
			case 'pulseLaser':
				this.gunType = 'GUN_10';
				break;
			default:
				break;
		}
		this.isSecondary=isSecondary;
		this.gunAngle=Math.PI/2;
		this.displayAngle=this.gunAngle;
		this.fireCooldown=0;
		this.firing=false;
		this.moveSpeedMultiplier=1;
	}

	update(
		interpriterState: InterpriterState, 
		battleground: Battleground, 
		parentPos: Vec, 
		parentRotation: number,
		parentTank: Tank
	): void {

		// Check if the no component is equipped.
		if (this.checkEmpty(this.name)) {
			return;
		}

		if (!this.isSecondary) {
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
		}
		else {
			this.displayAngle=this.gunAngle=parentRotation;
		}

		const shootVarName=this.isSecondary?SHOOT_SECONDARY_WEAPON_VAR_NAME:SHOOT_PRIMARY_WEAPON_VAR_NAME;
		const tryToFire=this._getBoolean(shootVarName, interpriterState);
		this.fireCooldown--;
		if (parentTank.getUsingOverdrive()) {
			this.fireCooldown--;
		}
		if (tryToFire && this.fireCooldown<=0) {
			const gunStats=STATS_FOR_GUN[this.gunType];
			for (let i=0; i<gunStats.numBulletsPerShot; i++) {
				const myPosition=this._getPosition(parentPos, parentRotation);
				const offset=new Vec(0, gunStats.orthogonalOffset).rotate(this.gunAngle);
				const bulletPosition=this.fireOnLeft?myPosition.add(offset):myPosition.sub(offset);
				battleground.createGameObject(new Bullet(bulletPosition, this.gunAngle, parentTank, gunStats.bullet, i));
				this.fireCooldown = gunStats.betweenShotsCooldown;
				this.fireOnLeft = !this.fireOnLeft;
			}
		}
		this.firing=tryToFire;

		//handle move speed penalties
		const applyPenalty: boolean = (this.fireCooldown>0 || this.firing) && !parentTank.getUsingOverdrive();
		this.moveSpeedMultiplier = applyPenalty?FIRING_SLOWDOWN:1;
		//end of move speed penalties
	}

	drawSelf(drawer: ImageDrawer, parentPos: Vec, parentRotation: number): void {

		// Check if the no component is equipped.
		if (this.checkEmpty(this.name)) {
			return;
		}
		if (this.isSecondary) {
			this.displayAngle=this.gunAngle=parentRotation;
		}

		const myPosition=this._getPosition(parentPos, parentRotation);
		const width=this.isSecondary?18:15;
		drawer.draw(getImage(this.gunType), myPosition, width, this.displayAngle-Math.PI/2);
	}

	setTargetGunAngle(gunAngle: number): void {

		// Check if the no component is equipped.
		if (this.checkEmpty(this.name)) {
			return;
		}

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
		return this.moveSpeedMultiplier;
	}

}

export default Gun;
