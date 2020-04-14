//@flow strict

import Cookies from 'universal-cookie';
import Tank from '../tanks/Tank.js';

function getPreferredSelectedTank(loadedTanks: Array<Tank>): Tank {
	console.log('Loaded all tanks');
	if (loadedTanks.length === 0) {
		throw new Error('All users must have at least one tank!');
	}
	const preferredTankId=new Cookies().get('preferredTankId');
	if (preferredTankId == null) {
		console.log('No cookie set :( returning default');
		return loadedTanks[0];
	}
	const foundTank=loadedTanks.find(tank => tank._id === preferredTankId);
	if (foundTank == null) {
		console.log('Couldnt find favorite tank :( returning default');
		return loadedTanks[0];
	}
	console.log('returning favorited tank!');
	return foundTank;
}

export default getPreferredSelectedTank;
