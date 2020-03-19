//@flow strict

import TankPart from './TankPart.js';
import {getImage} from '../battleground/ImageLoader.js';
import ImageDrawer from '../battleground/ImageDrawer.js';
import Vec from '../casus/blocks/Vec.js';

const LERP_PERCENT=0.2;
const GUN_CENTER_TO_TANK_CENTER=2;
const GUN_CENTER_TO_GUN_ROT=2;
const TAU=Math.PI*2;
class Gun extends TankPart {

	//in order for the gun movement to look smooth but still be easy to write code for,
	//the gun will actually turn instantly, but it will look like it turns more slowly.
	//If you fire a bullet, the bullet will go in the gunAngle. However, the actual gun
	//is rendered at the displayAngle
	gunAngle: number;
	displayAngle: number;

	constructor() {
		super();
		this.gunAngle=0;
		this.displayAngle=0;
	}

	setTargetGunAngle(gunAngle: number): void {
		this.gunAngle=(gunAngle%TAU+TAU)%TAU;
	}

	onUpdate(): void {
		//lerp the displayAngle towards the gun angle
		//lerp is short for linear interpolation
		const TAU=2*Math.PI;
		const positiveDistance=((this.gunAngle-this.displayAngle)%TAU+TAU)%TAU;
		const negativeDistance=((this.displayAngle-this.gunAngle)%TAU+TAU)%TAU;
		if (positiveDistance<negativeDistance) {
			this.displayAngle+=positiveDistance*LERP_PERCENT;
		}
		else {
			this.displayAngle-=negativeDistance*LERP_PERCENT;
		}
		this.displayAngle=(this.displayAngle%TAU+TAU)%TAU;
	}

	drawSelf(drawer: ImageDrawer, parentPos: Vec, parentRotation: number): void {
		const gunRotAround=parentPos.add(new Vec(-GUN_CENTER_TO_TANK_CENTER, 0).rotate(parentRotation));
		const imageCenter=gunRotAround.add(new Vec(GUN_CENTER_TO_GUN_ROT, 0).rotate(this.displayAngle));
		drawer.draw(getImage('RED_GUN_1'), imageCenter, 15, this.displayAngle-Math.PI/2);
	}

}

export default Gun;
