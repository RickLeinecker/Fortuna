//@flow strict

import BackendTank from '../tanks/BackendTank.js';
import Tank from '../tanks/Tank.js';
import getLoginToken from './getLoginToken.js';
import { getTank } from '../tanks/TankLoader.js';

/*
	This function takes no input
	This function gets the id of the users favorite tank
*/
function getFavoriteTank(onLoad:(tank: Tank) => void): void {
	const responsePromise: Promise<Response> = fetch('/api/tank/getFavorite/', {
		method: 'GET',
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Content-Type': 'application/json',
			'Access-Control-Allow-Credentials': 'true',
			'x-auth-token': getLoginToken()
		},
	});
	responsePromise.then (
		response => response.json().then(data => {
			if (response.status !== 200) {
				console.log(response.status);
				console.log(data.msg);
			}
			else {
				const tank = new BackendTank(
					data._id,
					data.components,
					data.casusCode,
					data.isBot,
					data.userid,
					data.tankName
				);
				onLoad(getTank(tank));
			}
		})
	)
}

function setFavoriteTankId(tankId: string, onLoad:(setSuccessful: boolean) => void): void {
	const responsePromise: Promise<Response> = fetch('/api/tank/favoriteTank/', {
		method: 'PATCH',
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Content-Type': 'application/json',
			'Access-Control-Allow-Credentials': 'true',
			'x-auth-token': getLoginToken()
		},
		body: JSON.stringify({ favoriteTank: tankId }),
	});
	responsePromise.then (
		response => response.text().then(data => {
			if (response.status !== 200) {
				console.log(response.status);
				console.log(data);
				onLoad(false);
			}
			else {
				onLoad(true);
			}
		})
	);
}

function updateTank(tank: Tank, onLoad:(updateSuccessful: boolean) => void): void {
	const responsePromise: Promise<Response> = fetch('/api/tank/tankUpdate/' + tank._id, {
			method: 'PUT',
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Content-Type': 'application/json',
				'Access-Control-Allow-Credentials': 'true',
				'x-auth-token': getLoginToken(),
			},
			body: JSON.stringify({ 
				tankName: tank.tankName, 
				userId: tank.userId, 
				components: tank.parts.map(part => part.name),
				isBot: false,
			}),
		});
		responsePromise.then(
			response => response.json().then(data => {
				if(response.status !== 200) {
					console.log(response.status);
					console.log(data.msg);
					onLoad(false);
				}
				else {
					onLoad(true);
				}
			})
		);
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
	updateTank,
	getAllUsersTanks,
}

