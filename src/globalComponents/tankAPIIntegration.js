//@flow strict

import Cookies from 'universal-cookie';

/*
	This function takes no input
	This function gets the id of the users favorite tank
*/
function getFavoriteTankID() {
	const cookies = new Cookies();
	const token = cookies.get('token');
	const responsePromise: Promise<Response> = fetch('/api/tank/getFavorite/', {
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
/*
	This function takes no input
	This function gets all of the tanks the user is associated with
*/
function getAllUsersTanks() {
	const cookies = new Cookies();
	const token = cookies.get('token');
	const responsePromise: Promise<Response> = fetch('/api/tank/userTanks/', {
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

export {
	getFavoriteTankID,
	getAllUsersTanks
}
