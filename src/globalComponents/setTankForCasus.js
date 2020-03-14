//@flow strict

import Cookies from 'universal-cookie';

function setTankForCasus(token: string): void {
	return new Cookies().set('tankIDForCasus', token, {path: '/'});
}

export default setTankForCasus;
