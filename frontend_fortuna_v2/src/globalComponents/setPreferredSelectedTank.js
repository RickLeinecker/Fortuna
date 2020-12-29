//@flow strict

import Cookies from 'universal-cookie';
import Tank from '../tanks/Tank.js';
import setTankForCasus from './setTankForCasus.js';

function setPreferredSelectedTank(preferredTank: Tank): void {
	setTankForCasus(preferredTank._id);
	return new Cookies().set('preferredTankId', preferredTank._id, {path: '/'});	
}

export default setPreferredSelectedTank;
