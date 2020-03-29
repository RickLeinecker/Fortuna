//@flow strict

import Cookies from 'universal-cookie';
import BackendTank from '../tanks/BackendTank.js';
import Tank from '../tanks/Tank.js';
import getLoginToken from './getLoginToken.js';

/*
	This function takes no input
	This function gets the id of the users favorite tank
*/
function getFavoriteTank() : Promise<Response> {
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

function setFavoriteTankId(tankId: string): boolean {
	const cookies = new Cookies();
	const responsePromise: Promise<Response> = fetch('/api/tank/favoriteTank/', {
		method: 'PATCH',
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Content-Type': 'application/json',
			'Access-Control-Allow-Credentials': 'true',
			'x-auth-token': cookies.get('token')
		},
		body: JSON.stringify({ favoriteTank: new BackendTank(
			tank._id, 
			tank.parts.map(part => part.name),
			tank.casusCode,
			false, 
			tank.userId, 
			tank.tankName
		)}),
	});
	responsePromise.then(
		response => response.json().then(data => {
			if (response.status !== 200) {
				console.log(response.status);
				console.log(data.msg);
				console.log(data);
				return false;
			}
			else {
				return true;
			}
		})
	)
	// If the response failed, return false.
	return false;
}

/*
	This function takes no input
	This function gets all of the tanks the user is associated with
*/
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
	getFavoriteTank,
	setFavoriteTankId,
	getAllUsersTanks,
}

