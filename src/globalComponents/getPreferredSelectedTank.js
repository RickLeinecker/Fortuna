//@flow strict

import Cookies from 'universal-cookie';
import Tank from '../tanks/Tank.js';

function getPreferredSelectedTank(loadedTanks: Array<Tank>): Tank {
	if (loadedTanks.length == 0) {
		throw new Error('All users must have at least one tank!');
	}
	const preferredTankId=new Cookies().get('preferredTankId');
	if (preferredTankId == null) {
		return loadedTanks[0];
	}
	const foundTank=loadedTanks.find(tank => tank._id === preferredTankId);
	if (foundTank == null) {
		return loadedTanks[0];
	}
	return foundTank;
}

export default getPreferredSelectedTank;
