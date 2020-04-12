//@flow strict

import Vec from '../../casus/blocks/Vec.js';
import Seg from '../../geometry/Seg.js';
import GameObject from '../GameObject.js';
import MissileTrackingBeacon from './MissileTrackingBeacon.js';
import {getImage} from '../ImageLoader.js';

import type ImageDrawer from '../ImageDrawer.js';
import type Battleground from '../Battleground.js';
import type Tank from '../../tanks/Tank.js';
import {createSmokeCloud, createElectricityParticle} from './Particle.js';

type BulletType = 
	'DEATH_RAY_BULLET' |
	'GREEN_LASER' |
	'GRENADE_BULLET' |
	'GUN_BULLET' |
	'RED_LASER' |
	'MISSILE' |
	'PLASMA_BLOB' |
	'PULSE_LASER_PARTICLE' |
	'SHOTGUN_BULLET' |
	'LANCER_PARTICLE' |
	'MISSILE_TRACKER_DART';

type BulletStats = {
	speed: number,
	width: number,
	lifetime: number,
	damage: number,
};

const STATS_FOR_BULLET: {[BulletType]: BulletStats} = {
	DEATH_RAY_BULLET: {
		speed: 1.4,
		width: 25,
		lifetime: 100,
		damage: 20,
	},
	GREEN_LASER: {
		speed: 7,
		width: 40,
		lifetime: 100,
		damage: 3,
	},
	GRENADE_BULLET: {
		speed: 2,
		width: 12,
		lifetime: 15,
		damage: 10,
	},
	GUN_BULLET: {
		speed: 2,
		width: 13,
		lifetime: 39,
		damage: 3,
	},
	RED_LASER: {
		speed: 6,
		width: 20,
		lifetime: 100,
		damage: 3,
	},
	MISSILE: {
		speed: 1.4,
		width: 10,
		lifetime: 100,
		damage: 7,
	},
	PLASMA_BLOB: {
		speed: 1.2,
		width: 20,
		lifetime: 100,
		damage: 30,
	},
	PULSE_LASER_PARTICLE: {
		speed: 0,
		width: 150,
		lifetime: 18,
		damage: 6,
	},
	SHOTGUN_BULLET: {
		speed: 4,
		width: 13,
		lifetime: 10,
		damage: 2,
	},
	LANCER_PARTICLE: {
		speed: 3,
		width: 1,
		lifetime: 3,
		damage: 40,
	},
	MISSILE_TRACKER_DART: {
		speed: 5,
		width: 6,
		lifetime: 100,
		damage: 0,
	}
};

const MAX_MISSILE_TURN=0.1;

class Bullet extends GameObject {

	rotation: number;
	tankToIgnore: Tank;
	bulletType: BulletType;
	lifetime: number;
	velocity: Vec;

	constructor(position: Vec, rotation: number, tankToIgnore: Tank, bulletType: BulletType, rseed:number=0) {
		const realVelocity=new Vec(STATS_FOR_BULLET[bulletType].speed, 0).rotate(rotation);
		super(position.add(realVelocity));
		this.rotation=rotation;
		this.tankToIgnore=tankToIgnore;
		this.bulletType=bulletType;
		this.lifetime=STATS_FOR_BULLET[bulletType].lifetime;
		this.velocity=new Vec(STATS_FOR_BULLET[bulletType].speed, 0);
		if (bulletType === 'SHOTGUN_BULLET') {
			//CAREFUL: this has to be 100% determistic and be the same on all clients!
			//no Math.random() allowed!
			const randomNumber=(rseed*1235.58717 + 
				this.rotation*862.6206 + 
				this.position.x*511.1626+
				this.position.y*86.3634636);
			const angleOffset=randomNumber%.6-0.3;
			const speedOffset=randomNumber%2-1;
			this.rotation+=angleOffset;
			this.velocity=this.velocity.add(new Vec(speedOffset, 0));
		}
	}

	update(battleground: Battleground): void {
		const stats=STATS_FOR_BULLET[this.bulletType];
		let vel=this.velocity.rotate(this.rotation);
		//stuff for grenades slowing down over time 
		if (this.bulletType === 'GRENADE_BULLET') {
			vel = vel.scale((this.lifetime+stats.lifetime)/(stats.lifetime*2));
		}
		//end grenade stuff
		
		//stuff for missiles going towards tracking beacons
		if (this.bulletType === 'MISSILE') {
			const beacons = battleground.getAllGameObjects().filter(o => o instanceof MissileTrackingBeacon);
			let target: ?MissileTrackingBeacon=null;
			for (const beacon: GameObject of beacons) {
				if (!(beacon instanceof MissileTrackingBeacon)) {
					continue;
				}
				if (target == null || 
					target.getPosition().sub(this.getPosition()).mag() > 
					beacon.getPosition().sub(this.getPosition()).mag()) {
					target=beacon;
				}
			}

			if (target!=null) {
				//then turn towards the target
				const targetAngle=target.getPosition().sub(this.getPosition()).angle();
				const TAU=Math.PI*2;
				const dRotation=((targetAngle-this.rotation)%TAU+TAU)%TAU;
				if (Math.abs(dRotation)<MAX_MISSILE_TURN || Math.abs(dRotation-TAU)<MAX_MISSILE_TURN) {
					this.rotation=targetAngle;
				}
				else {
					if (dRotation<TAU/2) {
						this.rotation+=MAX_MISSILE_TURN;
					}
					else {
						this.rotation-=MAX_MISSILE_TURN;
					}
				}
			}
		}
		//end of missiles to tracking beacon stuff

		const prevPosition=this.position;
		this.position=this.position.add(vel);
		this.lifetime--;
		if (this.lifetime<=0) {
			this._onDestroy(battleground);
			battleground.deleteGameObject(this);
			return;
		}

		const hitSomething: boolean = this._checkIfHitTankOrWall(prevPosition, this.position, battleground);
		if (hitSomething) {
			this._onDestroy(battleground);
			battleground.deleteGameObject(this);
			return;
		}
	}

	render(drawer: ImageDrawer): void {
		const type=this.bulletType;
		const stats=STATS_FOR_BULLET[this.bulletType];
		if (type === 'LANCER_PARTICLE') {
			//don't render the lancer particles here, create a particle effect for it
			return;
		}
		const position=this.getPosition();
		//special case pulse laser because it changes scale and alpha over lifetime
		if (type === 'PULSE_LASER_PARTICLE') {
			const stats=STATS_FOR_BULLET[this.bulletType];
			const lifetimeLeft=Math.pow(this.lifetime/stats.lifetime, 3);
			const width=stats.width*(1-lifetimeLeft);
			const alpha=lifetimeLeft;
			drawer.draw(getImage(type), position, width, this.rotation, alpha);
		}
		else {
			drawer.draw(getImage(type), position, stats.width, this.rotation);
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
		const stats=STATS_FOR_BULLET[this.bulletType];
		const EXTRA_WIDTH=this.bulletType === 'DEATH_RAY_BULLET'?5:2;

		//special case for if I am a pulse laser doing damage:
		if (this.bulletType === 'PULSE_LASER_PARTICLE') {
			if (this.lifetime===Math.round(stats.lifetime*.7)) {
				for (const t:Tank of allTanks) {
					if (t.getPosition().sub(this.getPosition()).mag()<stats.width/2) {
						t.takeDamage(stats.damage);
					}
				}
			}
			return false;
		}
		//end special case for pulse laser
		
		for (const t:Tank of allTanks) {
			const distance=mySeg.distanceTo(t.getPosition());
			if (distance<t.getBoundingCircle().r+EXTRA_WIDTH) {
				//TODO: inflict damage on other tanks
				t.takeDamage(stats.damage);
				if (this.bulletType === 'MISSILE_TRACKER_DART') {
					const beacon = new MissileTrackingBeacon(t);
					battleground.createGameObject(beacon);
				}
				return true;
			}
		}
		for (const seg:Seg of allSegs) {
			const distance=mySeg.distanceTo(seg);
			if (distance<seg.paddingWidth+EXTRA_WIDTH/2) {
				if (this.bulletType === 'MISSILE_TRACKER_DART') {
					const beacon = new MissileTrackingBeacon(this.getPosition());
					battleground.createGameObject(beacon);
				}
				return true;
			}
		}
		return false;
	}

	_onDestroy(battleground: Battleground): void {
		if (this.bulletType === 'GRENADE_BULLET' ||
				this.bulletType === 'MISSILE') {
			createSmokeCloud(this.getPosition(), battleground);
		}
		if (this.bulletType === 'LANCER_PARTICLE') {
			for (let i=0; i<20; i++) {
				createElectricityParticle(this.getPosition(), 2, battleground);
			}
			createSmokeCloud(this.getPosition(), battleground);
		}
	}
}

export type {BulletType};

export default Bullet;
