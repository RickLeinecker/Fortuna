//@flow strict

import Tank from './Tank.js';

function getTestTank(): Tank {
	const toReturn: Tank = new Tank();
	return toReturn;
}

export {getTestTank};
