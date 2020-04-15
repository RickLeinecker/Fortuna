//@flow strict

import Cookies from 'universal-cookie';

function setTankForCasus(tankId: string): string {
	return new Cookies().set('selectedTankId', tankId);
}

export default setTankForCasus;
