//@flow strict

import Vec from '../../casus/blocks/Vec.js';
import GameObject from '../GameObject.js';
import {getImage} from '../ImageLoader.js';

import type ImageDrawer from '../ImageDrawer.js';
import type Battleground from '../Battleground.js';
import type Tank from '../../tanks/Tank.js';

const VELOCITY_MAG=2;

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
};

const STATS_FOR_BULLET: {[BulletType]: BulletStats} = {
	DEATH_RAY_BULLET: {
		speed: 2,
		width: 13,
	},
	GREEN_LASER: {
		speed: 2,
		width: 13,
	},
	GRENADE_BULLET: {
		speed: 2,
		width: 13,
	},
	GUN_BULLET: {
		speed: 2,
		width: 13,
	},
	RED_LASER: {
		speed: 2,
		width: 13,
	},
	MISSILE: {
		speed: 2,
		width: 13,
	},
	PLASMA_BLOB: {
		speed: 2,
		width: 13,
	},
	PULSE_LASER_PARTICLE: {
		speed: 0,
		width: 150,
	},
	SHOTGUN_BULLET: {
		speed: 2,
		width: 13,
	}
};

class Bullet extends GameObject {

	rotation: number;
	tankToIgnore: Tank;
	bulletType: BulletType;

	constructor(position: Vec, rotation: number, tankToIgnore: Tank, bulletType: BulletType) {
		super(position);
		this.rotation=rotation;
		this.tankToIgnore=tankToIgnore;
		this.bulletType=bulletType;
	}

	update(battleground: Battleground): void {
		const stats=STATS_FOR_BULLET[this.bulletType];
		const vel=new Vec(stats.speed, 0).rotate(this.rotation);
		this.position=this.position.add(vel);
	}

	render(drawer: ImageDrawer): void {
		const stats=STATS_FOR_BULLET[this.bulletType];
		const position=this.getPosition();
		drawer.draw(getImage(this.bulletType), position, stats.width, this.rotation);
	}

	getRenderOrder(): number {
		return 0.5;
	}
}

export type {BulletType};

export default Bullet;
