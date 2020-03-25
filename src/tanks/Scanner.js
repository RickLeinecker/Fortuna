//@flow strict

import TankPart from './TankPart.js';
import {getImage} from '../battleground/ImageLoader.js';
import ImageDrawer from '../battleground/ImageDrawer.js';
import Vec from '../casus/blocks/Vec.js';
import Mine from '../battleground/gameobjects/Mine.js';
import C4 from '../battleground/gameobjects/C4.js';
import InterpriterState from '../casus/interpreter/InterpriterState.js';
import GameObject from '../battleground/GameObject.js';
import {createStaticParticle} from '../battleground/gameobjects/Particle.js';

import type { Range } from './Range.js';
import type { TankComponent } from '../armory/TankComponent.js';
import type Battleground from '../battleground/Battleground.js';
import type Tank from './Tank.js';

const ROTATION_SPEED=Math.PI*2/(30*6);
const JAM_TIME=60;

class Scanner extends TankPart {
	seesItems: boolean;
	immuneToJammers: boolean;
	range: Range;
	offsetFromParent: Vec;
	rotation: number;
	width: number;
	jamTimer: number;

	constructor(name: TankComponent, seesItems: boolean, immuneToJammers: boolean) {
		super(name);
		this.seesItems = seesItems;
		this.immuneToJammers = immuneToJammers;
		this.rotation = 0;
		this.jamTimer = -1;

		switch(name) {
			case 'shortRangeScanner': 
				this.range = 'SMALL';
				break;
			case 'mediumRangeScanner':
				this.range = 'MEDIUM';
				break;
			case 'longRangeScanner': 
				this.range = 'LARGE';
				break;
			default:
				break;
		}

		if (this.range === 'SMALL') {
			this.width = 4;
			this.offsetFromParent=new Vec(2, -2);
		}
		else {
			this.width = 6;
			this.offsetFromParent=new Vec(2.5, -2.5);
		}
	}

	update(
		interpriterState: InterpriterState, 
		battleground: Battleground, 
		parentPos: Vec, 
		parentRotation: number,
		parentTank: Tank
	): void {

		// Check if the no component is equipped.
		checkEmpty(this.name) {
			return;
		}

		//medium and large range scanners spin. The small ones don't, so they don't need to be updated
		if (this.range === 'MEDIUM' || this.range === 'LARGE') {
			if (this.jamTimer<=0) {
				this.rotation+=ROTATION_SPEED;
			}
		}
		this.jamTimer--;
		if (this.jamTimer>0 && this.jamTimer%1===0) {
			const position=parentPos.add(this.offsetFromParent.rotate(parentRotation));
			createStaticParticle(position, battleground);
		}
	}

	drawSelf(drawer: ImageDrawer, parentPos: Vec, parentRotation: number): void {

		// Check if the no component is equipped.
		checkEmpty(this.name) {
			return;
		}

		let image='';
		switch (this.range) {
			case 'SMALL':
				image = this.seesItems?'SCANNER_SMALL_ITEMS':'SCANNER_SMALL';
				break;
			case 'MEDIUM':
				image = this.seesItems?'SCANNER_MEDIUM_ITEMS':'SCANNER_MEDIUM';
				break;
			case 'LARGE':
				image = this.seesItems?'SCANNER_LARGE_ITEMS':'SCANNER_LARGE';
				break;
			default:
				throw new Error('UNEXPECTED RANGE TYPE: '+this.range);
		}
		const position=parentPos.add(this.offsetFromParent.rotate(parentRotation));
		drawer.draw(getImage(image), position, this.width, parentRotation-Math.PI/2+this.rotation);
		if (this.immuneToJammers) {
			drawer.draw(getImage('SCANNER_BUBBLE'), position, this.width+1, 0);
		}
		if (this.jamTimer<=0) {
			drawer.drawCircle(position, this._getScanRadius());
		}
	}

	_getScanRadius(): number {
		switch (this.range) {
			case 'SMALL':
				return 50;
			case 'MEDIUM':
				return 90;
			case 'LARGE':
				return 150;
			default:
				throw new Error('UNEXPECTED RANGE TYPE: '+this.range);
		}
	}

	getJammed(): void {
		if (!this.immuneToJammers) {
			this.jamTimer=JAM_TIME;
		}
	}

	getEnemyTanks(
		interpriterState: InterpriterState, 
		battleground: Battleground, 
		parentPos: Vec, 
		parentRotation: number,
		parentTank: Tank
	): Array<Tank> {

		// Check if the no component is equipped.
		checkEmpty(this.name) {
			return [];
		}

		if (this.jamTimer>0) {
			return [];
		}
		const myPosition=parentPos.add(this.offsetFromParent.rotate(parentRotation));
		const otherTanks=battleground.getTanks().filter(tank => tank!==parentTank);
		const canSee=otherTanks.filter(tank => tank.getPosition().sub(myPosition).mag()<this._getScanRadius());
		return canSee;
	}

	getMines(
		interpriterState: InterpriterState, 
		battleground: Battleground, 
		parentPos: Vec, 
		parentRotation: number,
		parentTank: Tank
	): Array<GameObject> {

		// Check if the no component is equipped.
		checkEmpty(this.name) {
			return [];
		}

		if (this.jamTimer>0) {
			return [];
		}
		if (!this.seesItems) {
			return [];
		}
		const myPosition=parentPos.add(this.offsetFromParent.rotate(parentRotation));
		const mines=battleground.getAllGameObjects().filter(o => (o instanceof Mine) || (o instanceof C4));
		const canSee = mines.filter(mine => mine.getPosition().sub(myPosition).mag()<this._getScanRadius());
		return canSee;
	}

}

export default Scanner;
