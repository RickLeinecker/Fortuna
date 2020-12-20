//@flow strict

import GameObject from '../GameObject.js';
import Vec from '../../casus/blocks/Vec.js';
import {getImage} from '../ImageLoader.js';

import type ImageDrawer from '../ImageDrawer.js';
import type Battleground from '../Battleground.js';
import type Tank from '../../tanks/Tank.js';

const MISSILE_TRACKING_BEACON_WIDTH=40;
const INITIAL_SHOW_TIME=35;
const CYCLE_LENGTH=150;
const ALPHA_WINDOW=60;

class MissileTrackingBeacon extends GameObject {

	following: Vec|Tank;
	lifeCounter: number;

	constructor(following: Vec|Tank) {
		super(new Vec(0, 0));
		this.following = following;
		this.lifeCounter = 0;
	}

	update(battleground: Battleground): void {
		this.lifeCounter++;
	}

	render(drawer: ImageDrawer): void {
		let alpha=0;
		if (this.lifeCounter<INITIAL_SHOW_TIME) {
			alpha=0.5;
		}
		else {
			const timeUnmoded=this.lifeCounter-INITIAL_SHOW_TIME+ALPHA_WINDOW/2;
			const time=timeUnmoded%CYCLE_LENGTH;
			if (time>ALPHA_WINDOW) {
				alpha=0;
			}
			else {
				const percent=time/ALPHA_WINDOW;
				alpha=Math.min(percent, 1-percent);
			}
		}
		alpha=Math.pow(alpha, 2);
		drawer.draw(getImage('MISSILE_TRACKER_TARGET'), this.getPosition(), MISSILE_TRACKING_BEACON_WIDTH, 0, alpha);
	}

	getRenderOrder(): number {
		return 3;
	}

	getPosition(): Vec {
		if (this.following instanceof Vec) {
			return this.following;
		}
		else {
			return this.following.getPosition();
		}
	}

}

export default MissileTrackingBeacon;
