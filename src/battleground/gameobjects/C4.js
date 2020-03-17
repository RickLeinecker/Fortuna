//@flow strict

import GameObject from '../GameObject.js';
import Vec from '../../casus/blocks/Vec.js';
import ImageDrawer from '../ImageDrawer.js';
import Battleground from '../Battleground.js';
import {getImage} from '../ImageLoader.js';

class C4 extends GameObject {

	position: Vec;
	//note: rotation is random and should not affect gameplay in any way
	rotation: number;

	constructor(position: Vec)  {
		super();
		console.log('Created c4!');
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
		console.log('Exploding!');
		battleground.deleteGameObject(this);
	}

}

export default C4;
