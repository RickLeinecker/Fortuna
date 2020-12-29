//@flow strict

import Cookies from 'universal-cookie';

function getTankForCasus(): string {
	return new Cookies().get('selectedTankId');
}

export default getTankForCasus;
