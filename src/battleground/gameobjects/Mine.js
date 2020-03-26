//@flow strict

import GameObject from '../GameObject.js';
import Vec from '../../casus/blocks/Vec.js';
import {getImage} from '../ImageLoader.js';
import {createSmokeCloud} from './Particle.js';

import type ImageDrawer from '../ImageDrawer.js';
import type Battleground from '../Battleground.js'; 
import type Tank from '../../tanks/Tank.js';

const MINE_WIDTH=6;
const ARM_TIME=100;
const ACTIVATE_DISTANCE=15;
const TRIGGERED_UNTIL_EXPLOSION=25;

class Mine extends GameObject {

	lifetimeCounter: number;
	triggered: boolean;
	triggeredCounter: number;

	constructor(position: Vec)  {
		super(position);
		this.lifetimeCounter=0;
		this.triggered=false;
		this.triggeredCounter=0;
	}

	update(battleground: Battleground): void {
		this.lifetimeCounter++;
		if (!this.triggered && this.lifetimeCounter >= ARM_TIME) {
			const tanks=battleground.getTanks();	
			for (const t:Tank of tanks) {
				const distance=this.getPosition().sub(t.position).mag();
				if (distance<ACTIVATE_DISTANCE) {
					this.triggered=true;
					this.triggeredCounter=TRIGGERED_UNTIL_EXPLOSION;
				}
			}
		}
		if (this.triggered) {
			this.triggeredCounter--;
			if (this.triggeredCounter===0) {
				this._explode(battleground);
			}
		}
	}
	
	render(drawer: ImageDrawer): void {
		if (this.triggered) {
			drawer.draw(getImage('MINE'), this.getPosition(), MINE_WIDTH, 0);
		}
		else {
			if (this.lifetimeCounter < ARM_TIME) {
				//wait to arm still...
				drawer.draw(getImage('MINE_UNTRIGGERED'), this.getPosition(), MINE_WIDTH, 0);
			}
			else {
				//flash on and off to indicate triggered
				if (this.lifetimeCounter % 30 < 7) {
					drawer.draw(getImage('MINE'), this.getPosition(), MINE_WIDTH, 0);
				}
				else {
					drawer.draw(getImage('MINE_UNTRIGGERED'), this.getPosition(), MINE_WIDTH, 0);
				}
			}
		}
	}

	getRenderOrder(): number {
		return -1;
	}

	_explode(battleground: Battleground): void {
		battleground.deleteGameObject(this);
		createSmokeCloud(this.getPosition(), battleground);
	}

}

export default Mine;
