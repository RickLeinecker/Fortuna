//@flow strict

import TankPart from './TankPart.js';
import type { TankComponent } from '../armory/TankComponent.js';

class Item extends TankPart {
	
	constructor(name: TankComponent) {
		super(name);
	}
}

export default Item;