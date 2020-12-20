//@flow strict

import Cookies from 'universal-cookie';

function setLoginToken(token: string): void {
	return new Cookies().set('token', token, {path: '/'});
}

export default setLoginToken;
