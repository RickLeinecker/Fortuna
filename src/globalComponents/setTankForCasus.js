//@flow strict

import Cookies from 'universal-cookie';

function setTankForCasus(tankId: string): string {
	console.log('Setting preferred tank to '+tankId);
	return new Cookies().set('selectedTankId', tankId);
}

export default setTankForCasus;
