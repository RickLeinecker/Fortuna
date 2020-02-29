//@flow strict

import Tank from './Tank.js';
import Vec from '../casus/blocks/Vec.js';

function getTestTank(): Tank {
	const toReturn: Tank = new Tank(new Vec(0, 0));
	return toReturn;
}

export {getTestTank};
