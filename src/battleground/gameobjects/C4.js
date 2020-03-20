//@flow strict

import GameObject from '../GameObject.js';
import Vec from '../../casus/blocks/Vec.js';
import ImageDrawer from '../ImageDrawer.js';
import {getImage} from '../ImageLoader.js';
import {createSmokeCloud} from './Particle.js';

import type Battleground from '../Battleground.js';

class C4 extends GameObject {

	position: Vec;
	//note: rotation is random and should not affect gameplay in any way
	rotation: number;

	constructor(position: Vec)  {
		super();
		this.position=position;
		this.rotation=Math.random()*2*Math.PI;
	}
	
	render(drawer: ImageDrawer): void {
		drawer.draw(getImage('C4'), this.position, 7, this.rotation);
	}

	getRenderOrder(): number {
		return -1;
	}

	explode(battleground: Battleground): void {
		battleground.deleteGameObject(this);
		createSmokeCloud(this.position, battleground);
	}

}

export default C4;
