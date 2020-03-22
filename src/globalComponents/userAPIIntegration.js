//@flow strict

import Cookies from 'universal-cookie';

/*
	This function has no input
	This function returns a json object of the user
*/
function getUser() : Promise<Response> {
	const cookies = new Cookies();
	const token = cookies.get('token');
	const responsePromise: Promise<Response> = fetch('/api/user/getUser/', {
		method: 'GET',
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Content-Type': 'application/json',
			'Access-Control-Allow-Credentials': 'true',
			'x-auth-token': token
		},
	});
	return responsePromise;
}

export {getUser};
