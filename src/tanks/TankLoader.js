//@flow strict

import Tank from './Tank.js';
import Vec from '../casus/blocks/Vec.js';
import Chassis from './Chassis.js';
import Gun from './Gun.js';
import Treads from './Treads.js';

function getTestTank(): Tank {
	const toReturn: Tank = new Tank(new Vec(300, 150), new Chassis(), new Treads(), new Gun());
	return toReturn;
}

export {getTestTank};
