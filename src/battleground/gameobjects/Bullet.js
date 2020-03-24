//@flow strict

import Vec from '../../casus/blocks/Vec.js';
import Seg from '../../geometry/Seg.js';
import GameObject from '../GameObject.js';
import {getImage} from '../ImageLoader.js';

import type ImageDrawer from '../ImageDrawer.js';
import type Battleground from '../Battleground.js';
import type Tank from '../../tanks/Tank.js';

type BulletType = 
	'DEATH_RAY_BULLET' |
	'GREEN_LASER' |
	'GRENADE_BULLET' |
	'GUN_BULLET' |
	'RED_LASER' |
	'MISSILE' |
	'PLASMA_BLOB' |
	'PULSE_LASER_PARTICLE' |
	'SHOTGUN_BULLET';

type BulletStats = {
	speed: number,
	width: number,
	lifetime: number,
};

const STATS_FOR_BULLET: {[BulletType]: BulletStats} = {
	DEATH_RAY_BULLET: {
		speed: 1.4,
		width: 13,
		lifetime: 100,
	},
	GREEN_LASER: {
		speed: 5,
		width: 13,
		lifetime: 100,
	},
	GRENADE_BULLET: {
		speed: 2,
		width: 13,
		lifetime: 100,
	},
	GUN_BULLET: {
		speed: 2,
		width: 13,
		lifetime: 100,
	},
	RED_LASER: {
		speed: 5,
		width: 13,
		lifetime: 100,
	},
	MISSILE: {
		speed: 1.4,
		width: 13,
		lifetime: 100,
	},
	PLASMA_BLOB: {
		speed: 1.2,
		width: 13,
		lifetime: 100,
	},
	PULSE_LASER_PARTICLE: {
		speed: 0,
		width: 150,
		lifetime: 18,
	},
	SHOTGUN_BULLET: {
		speed: 4,
		width: 13,
		lifetime: 10,
	}
};

class Bullet extends GameObject {

	rotation: number;
	tankToIgnore: Tank;
	bulletType: BulletType;
	lifetime: number;

	constructor(position: Vec, rotation: number, tankToIgnore: Tank, bulletType: BulletType) {
		const realVelocity=new Vec(STATS_FOR_BULLET[bulletType].speed, 0).rotate(rotation);
		super(position.add(realVelocity));
		this.rotation=rotation;
		this.tankToIgnore=tankToIgnore;
		this.bulletType=bulletType;
		this.lifetime=STATS_FOR_BULLET[bulletType].lifetime;
	}

	update(battleground: Battleground): void {
		const stats=STATS_FOR_BULLET[this.bulletType];
		const vel=new Vec(stats.speed, 0).rotate(this.rotation);
		const prevPosition=this.position;
		this.position=this.position.add(vel);
		this.lifetime--;
		if (this.lifetime<=0) {
			battleground.deleteGameObject(this);
			return;
		}

		const hitSomething: boolean = this._checkIfHitTankOrWall(prevPosition, this.position, battleground);
		if (hitSomething) {
			battleground.deleteGameObject(this);
		}
	}

	render(drawer: ImageDrawer): void {
		const stats=STATS_FOR_BULLET[this.bulletType];
		const position=this.getPosition();
		//special case pulse laser because it changes scale and alpha over lifetime
		if (this.bulletType === 'PULSE_LASER_PARTICLE') {
			const stats=STATS_FOR_BULLET[this.bulletType];
			const lifetimeLeft=Math.pow(this.lifetime/stats.lifetime, 3);
			const width=stats.width*(1-lifetimeLeft);
			const alpha=lifetimeLeft;
			drawer.draw(getImage(this.bulletType), position, width, this.rotation, alpha);
		}
		else {
			drawer.draw(getImage(this.bulletType), position, stats.width, this.rotation);
		}
	}

	getRenderOrder(): number {
		return 0.5;
	}

	//returns true if hit something
	_checkIfHitTankOrWall(
		prevPosition: Vec, 
		newPosition: Vec, 
		battleground: Battleground,
	): boolean {
		const allSegs=battleground.getCollisionSegs();
		const allTanks=battleground.getTanks().filter(t => t!==this.tankToIgnore);

		const mySeg=new Seg(prevPosition, newPosition);
		const firstTankHit=null;
		for (const t:Tank of allTanks) {
			//TODO: inflict damage on other tanks
			const distance=mySeg.distanceTo(t.getPosition());
			if (distance<t.getBoundingCircle().r+2) {
				return true;
			}
		}
		for (const seg:Seg of allSegs) {
			const distance=mySeg.distanceTo(seg);
			if (distance<seg.paddingWidth+1) {
				return true;
			}
		}
		return false;
	}

}

export type {BulletType};

export default Bullet;
