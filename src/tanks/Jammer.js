//@flow strict

import TankPart from './TankPart.js';
import {getImage} from '../battleground/ImageLoader.js';
import ImageDrawer from '../battleground/ImageDrawer.js';
import Vec from '../casus/blocks/Vec.js';
import InterpriterState from '../casus/interpreter/InterpriterState.js';
import {verifyBoolean} from '../casus/interpreter/Value.js';
import {USE_JAMMER_VAR_NAME} from '../casus/userInteraction/CasusSpecialVariables.js';
import {createElectricityPulse} from '../battleground/gameobjects/Particle.js';

import type Tank from './Tank.js';
import type Battleground from '../battleground/Battleground.js';

type JammerRange = 'SMALL' | 'MEDIUM' | 'LARGE';

class Jammer extends TankPart {
	range: JammerRange;
	offsetFromParent: Vec;
	width: number;
	cooldown: number;

	constructor(range: JammerRange) {
		super();
		this.range = range;
		this.cooldown = 5;
		if (range === 'SMALL') {
			this.width = 4;
			this.offsetFromParent=new Vec(2, 2.2);
		}
		else {
			this.width = 6;
			this.offsetFromParent=new Vec(1.5, 2);
		}
	}

	update(
		interpriterState: InterpriterState, 
		battleground: Battleground, 
		parentPos: Vec, 
		parentRotation: number,
		parentTank: Tank
	): void {
		this.cooldown--;
		if (this.cooldown < 0) {
			const tryingToUseJammer = this._getBoolean(USE_JAMMER_VAR_NAME, interpriterState);
			if (tryingToUseJammer) {
				this.cooldown = this._getMaxCooldown();
				const position=parentPos.add(this.offsetFromParent.rotate(parentRotation));
				createElectricityPulse(position, this._getMaxRange(), battleground);

				//actually jam the tanks
				for (const otherTank: Tank of battleground.getTanks().filter(t => t !== parentTank)) {
					const distance=position.sub(otherTank.getPosition()).mag();
					if (distance<this._getMaxRange()) {
						otherTank.getJammed();
					}
				}
			}
		}
	}

	drawSelf(drawer: ImageDrawer, parentPos: Vec, parentRotation: number): void {
		let image='';
		switch (this.range) {
			case 'SMALL':
				image = 'JAMMER_SMALL';
				break;
			case 'MEDIUM':
				image = 'JAMMER_MEDIUM';
				break;
			case 'LARGE':
				image = 'JAMMER_LARGE';
				break;
			default:
				throw new Error('UNEXPECTED RANGE TYPE: '+this.range);
		}
		const position=parentPos.add(this.offsetFromParent.rotate(parentRotation));
		drawer.draw(getImage(image), position, this.width, parentRotation);
	}

	_getBoolean(name: string, interpriterState: InterpriterState): boolean {
		return verifyBoolean(interpriterState.getVariable('BOOLEAN', name)).val;
	}

	_getMaxCooldown(): number {
		switch (this.range) {
			case 'SMALL':
				return 150;
			case 'MEDIUM':
				return 250;
			case 'LARGE':
				return 400;
			default:
				throw new Error('UNEXPECTED RANGE TYPE: '+this.range);
		}
	}

	_getMaxRange(): number {
		switch (this.range) {
			case 'SMALL':
				return 30;
			case 'MEDIUM':
				return 50;
			case 'LARGE':
				return 90;
			default:
				throw new Error('UNEXPECTED RANGE TYPE: '+this.range);
		}
	}
}

export default Jammer;
