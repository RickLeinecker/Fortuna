//@flow strict

import Cookies from 'universal-cookie';
import Tank from '../tanks/Tank.js';
import setTankForCasus from './setTankForCasus.js';

function setPreferredSelectedTank(preferredTank: Tank): void {
	console.log('Setting preferred tank to '+preferredTank._id);
	setTankForCasus(preferredTank._id);
	return new Cookies().set('preferredTankId', preferredTank._id, {path: '/'});	
}

export default setPreferredSelectedTank;
