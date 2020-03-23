//@flow strict

import Vec from '../../casus/blocks/Vec.js';
import GameObject from '../GameObject.js';
import {getImage} from '../ImageLoader.js';
import type {ImageName} from '../ImageName.js';

import type ImageDrawer from '../ImageDrawer.js';
import type Battleground from '../Battleground.js';

class Particle extends GameObject {
	image: ImageName;
	width: number;
	velocity: Vec;
	fullLifetime: number;
	lifeLeft: number;
	rotation: number;
	renderOrder: number;
	velocityMultiplier: number;
	fadeoutPower: number;
	image2: ImageName;
	imageSwapTime: number;
	finalWidth: number;
	widthPower: number;

	constructor(
		image: ImageName, 
		position: Vec,
		width: number, 
		velocity: Vec, 
		fullLifetime: number, 
		rotation: number, 
		renderOrder: number, 
		velocityMultiplier: number,
		fadeoutPower: number,
		image2: ?ImageName = null,
		imageSwapTime: number = 1000000000,
		finalWidth: ?number = null,
		widthPower: number = 1
	) {
		super(position);
		this.image=image;
		this.width=width;
		this.velocity=velocity;
		this.fullLifetime=fullLifetime;
		this.lifeLeft=fullLifetime;
		this.rotation=rotation;
		this.renderOrder=renderOrder;
		this.velocityMultiplier=velocityMultiplier;
		this.fadeoutPower=fadeoutPower;
		this.image2=image2 ?? image;
		this.imageSwapTime=imageSwapTime;
		this.finalWidth=finalWidth ?? width;
		this.widthPower=widthPower;
	}

	update(battleground: Battleground): void {
		this.position=this.position.add(this.velocity);
		this.velocity=this.velocity.scale(this.velocityMultiplier);
		this.lifeLeft--;
		if (this.lifeLeft<=0) {
			battleground.deleteGameObject(this);
			return;
		}

	}

	render(drawer: ImageDrawer): void {
		const percentThroughLife=Math.min((this.fullLifetime-this.lifeLeft)/this.fullLifetime, 1);
		const alpha=Math.pow(Math.max(0, this.lifeLeft/this.fullLifetime), this.fadeoutPower);
		const curImage=this.lifeLeft%(this.imageSwapTime*2)<this.imageSwapTime?this.image:this.image2;
		const width=this.lerp(this.width, this.finalWidth, Math.pow(percentThroughLife, this.widthPower));
		drawer.draw(getImage(curImage), this.getPosition(), width, this.rotation, alpha);
	}

	lerp(from: number, to: number, percent:number): number {
		return from+(to-from)*percent;
	}

	getRenderOrder(): number {
		return this.renderOrder;
	}
}

function _createSmokeParticle(position: Vec, battleground: Battleground) {
	const rotation=Math.random()*2*Math.PI;
	const velocity=new Vec(Math.random()-0.5, Math.random()-0.5).scale(5);
	const smokeType=Math.random();
	let imageName='';
	if (smokeType<.333) {
		imageName='SMOKE1';
	}
	else if (smokeType<0.666) {
		imageName='SMOKE2';
	}
	else {
		imageName='SMOKE3';
	}
	const velocityMultiplier=0.8;
	const fadeoutPower=1;
	const particle=new Particle(imageName, position, 6, velocity, 25, rotation, 2, velocityMultiplier, fadeoutPower);
	battleground.createGameObject(particle);
}

function createSmokeCloud(position: Vec, battleground: Battleground) {
	for (let i=0; i<40; i++) {
		const dx=Math.random()*10-5;
		const dy=Math.random()*10-5;
		const dPos=new Vec(dx, dy);
		_createSmokeParticle(position.add(dPos), battleground);
	}
}

function createElectricityParticle(position: Vec, maxRange: number, battleground: Battleground) {
	const rotation=Math.random()*2*Math.PI;
	let velocityMag = Math.random()*4-2;
	velocityMag+=Math.sign(velocityMag)*3;
	const velocity=new Vec(velocityMag, 0).rotate(rotation);
	const velocityMultiplier = 0.91;
	const lifetime=10+Math.random()*20;
	const fliptime=3;
	const fadeoutPower=0.5;
	const particle=new Particle(
		'ELECTRICITY', 
		position, 
		9, 
		velocity, 
		lifetime, 
		rotation - Math.PI/2, 
		1, 
		velocityMultiplier,
		fadeoutPower,
		'ELECTRICITY_FLIPPED',
		fliptime
	);
	battleground.createGameObject(particle);
}

function createElectricityPulse(position: Vec, maxRange: number, battleground: Battleground) {
	const lifetime=30;
	const velocity=new Vec(0, 0);
	const rotation=0;
	const renderOrder=1;
	const velocityMultiplier=1;
	const fadeoutPower=0.8;
	const imageSwapTime=1e8;
	const startWidth=0;
	//extends to about 2.3
	const endWidth=maxRange*2.5;
	const widthPower=0.2;
	const particle=new Particle(
		'EMP',
		position,
		startWidth,
		velocity,
		lifetime,
		rotation,
		renderOrder,
		velocityMultiplier,
		fadeoutPower,
		null,
		imageSwapTime,
		endWidth,
		widthPower
	);
	battleground.createGameObject(particle);
}

function createStaticParticle(position: Vec, battleground: Battleground) {
	const offsetAngle=Math.random()*2*Math.PI;
	const offsetR=Math.random()*1;

	const lifetime=10;
	const rotation=Math.random()*2*Math.PI;
	let velocityMag = Math.random()*4-2;
	const velocity=new Vec(velocityMag, 0).rotate(rotation);
	const velocityMultiplier = 0.8;
	const renderOrder=1;
	const fadeoutPower=0.5;
	const width=7;
	const particle=new Particle(
		'STATIC',
		position.add(new Vec(offsetR, 0).rotate(offsetAngle)),
		width,
		velocity,
		lifetime,
		rotation-Math.PI/2,
		renderOrder,
		velocityMultiplier,
		fadeoutPower,
	);
	battleground.createGameObject(particle);
}

function createGreenParticle(position: Vec, battleground: Battleground) {
	const offsetAngle=Math.random()*2*Math.PI;
	const offsetR=Math.pow(Math.random(), 0.25)*6;

	const lifetime=25;
	const rotation=Math.random()*2*Math.PI;
	let velocityMag = Math.random()*6-3;
	const velocity=new Vec(velocityMag, 0).rotate(rotation);
	const velocityMultiplier = 0.8;
	const renderOrder=1;
	const fadeoutPower=2;
	const width=8;
	const particle=new Particle(
		'GREEN_PARTICLE',
		position.add(new Vec(offsetR, 0).rotate(offsetAngle)),
		width,
		velocity,
		lifetime,
		rotation-Math.PI/2,
		renderOrder,
		velocityMultiplier,
		fadeoutPower,
	);
	battleground.createGameObject(particle);
}


export {
	createSmokeCloud, 
	createElectricityParticle,
	createElectricityPulse, 
	createStaticParticle, 
	createGreenParticle,
};

export default Particle;
