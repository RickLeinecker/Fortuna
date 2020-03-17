//@flow strict

import GameObject from '../GameObject.js';
import Vec from '../../casus/blocks/Vec.js';
import ImageDrawer from '../ImageDrawer.js';
import Battleground from '../Battleground.js';
import {getImage} from '../ImageLoader.js';
import {createSmokeCloud} from './Particle.js';

const MINE_WIDTH=6;
const ARM_TIME=100;
const ACTIVATE_DISTANCE=15;
const TRIGGERED_UNTIL_EXPLOSION=25;

class Mine extends GameObject {

	position: Vec;
	lifetimeCounter: number;
	triggered: boolean;
	triggeredCounter: int;

	constructor(position: Vec)  {
		super();
		this.position=position;
		this.lifetimeCounter=0;
		this.triggered=false;
		this.triggeredCounter=0;
	}

	update(battleground: Battleground): void {
		this.lifetimeCounter++;
		if (!this.triggered && this.lifetimeCounter >= ARM_TIME) {
			const tanks=battleground.getTanks();	
			for (const t:Tank of tanks) {
				const distance=this.position.sub(t.position).mag();
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
			drawer.draw(getImage('MINE'), this.position, MINE_WIDTH, 0);
		}
		else {
			if (this.lifetimeCounter < ARM_TIME) {
				//wait to arm still...
				drawer.draw(getImage('MINE_UNTRIGGERED'), this.position, MINE_WIDTH, 0);
			}
			else {
				//flash on and off to indicate triggered
				if (this.lifetimeCounter % 30 < 7) {
					drawer.draw(getImage('MINE'), this.position, MINE_WIDTH, 0);
				}
				else {
					drawer.draw(getImage('MINE_UNTRIGGERED'), this.position, MINE_WIDTH, 0);
				}
			}
		}
	}

	getRenderOrder(): number {
		return -1;
	}

	_explode(battleground: Battleground): void {
		battleground.deleteGameObject(this);
		createSmokeCloud(this.position, battleground);
	}

}

export default Mine;
