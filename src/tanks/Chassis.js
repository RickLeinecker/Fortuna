//@flow strict

import TankPart from './TankPart.js';
import {getImage} from '../battleground/ImageLoader.js';
import ImageDrawer from '../battleground/ImageDrawer.js';
import Vec from '../casus/blocks/Vec.js';

class Chassis extends TankPart {

	drawSelf(drawer: ImageDrawer, parentPos: Vec, parentRotation: number) {
		drawer.draw(getImage('BLUE_CHASSIS_1'), parentPos, 100, parentRotation);
	}

}

export default Chassis;
