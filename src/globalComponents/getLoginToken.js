//@flow strict

import Cookies from 'universal-cookie';

function getLoginToken(): string {
	return new Cookies().get('token');
}

export default getLoginToken;
