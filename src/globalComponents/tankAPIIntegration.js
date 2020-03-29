//@flow strict

import getLoginToken from './getLoginToken.js';

// This function gets the id of the users favorite tank
function getFavoriteTankID() : Promise<Response> {
	const responsePromise: Promise<Response> = fetch('/api/tank/getFavorite/', {
		method: 'GET',
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Content-Type': 'application/json',
			'Access-Control-Allow-Credentials': 'true',
			'x-auth-token': getLoginToken()
		},
	});
	return responsePromise;
}

// This function gets all of the tanks the user is associated with
function getAllUsersTanks() : Promise<Response> {
	const responsePromise: Promise<Response> = fetch('/api/tank/userTanks/', {
		method: 'GET',
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Content-Type': 'application/json',
			'Access-Control-Allow-Credentials': 'true',
			'x-auth-token': getLoginToken()
		},
	});
	return responsePromise;
}

export {
	getFavoriteTankID,
	getAllUsersTanks
}

