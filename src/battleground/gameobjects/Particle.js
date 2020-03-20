//@flow strict

import Vec from '../../casus/blocks/Vec.js';
import GameObject from '../GameObject.js';
import {getImage} from '../ImageLoader.js';
import type {ImageName} from '../ImageName.js';

import type ImageDrawer from '../ImageDrawer.js';
import type Battleground from '../Battleground.js';

class Particle extends GameObject {
	image: ImageName;
	position: Vec;
	width: number;
	velocity: Vec;
	fullLifetime: number;
	lifeLeft: number;
	rotation: number;
	renderOrder: number;
	velocityMultiplier: number;

	constructor(
		image: ImageName, 
		position: Vec, 
		width: number, 
		velocity: Vec, 
		fullLifetime: number, 
		rotation: number, 
		renderOrder: number, 
		velocityMultiplier: number
	) {
		super();
		this.image=image;
		this.position=position;
		this.width=width;
		this.velocity=velocity;
		this.fullLifetime=fullLifetime;
		this.lifeLeft=fullLifetime;
		this.rotation=rotation;
		this.renderOrder=renderOrder;
		this.velocityMultiplier=velocityMultiplier;
	}

	update(battleground: Battleground): void {
		this.position=this.position.add(this.velocity);
		this.velocity=this.velocity.scale(this.velocityMultiplier);
		this.lifeLeft--;
		if (this.lifeLeft===0) {
			battleground.deleteGameObject(this);
			return;
		}

	}

	render(drawer: ImageDrawer): void {
		const alpha=this.lifeLeft/this.fullLifetime;
		drawer.draw(getImage(this.image), this.position, this.width, this.rotation, alpha);
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
	const particle=new Particle(imageName, position, 6, velocity, 25, rotation, 2, velocityMultiplier);
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

export {createSmokeCloud};

export default Particle;
