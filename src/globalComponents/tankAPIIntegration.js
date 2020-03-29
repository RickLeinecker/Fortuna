//@flow strict

import BackendTank from '../tanks/BackendTank.js';
import Tank from '../tanks/Tank.js';
import getLoginToken from './getLoginToken.js';
import { getTank } from '../tanks/TankLoader.js';

// This function gets the id of the users favorite tank
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

// This function gets all of the tanks the user is associated with
function getAllUsersTanks(onLoad: (successful: boolean, allTanks: Array<Tank>) => void): void {
	const responsePromise: Promise<Response> = fetch('/api/tank/userTanks/', {
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
				console.log(data);
				onLoad(false, []);
			}
			else {
				const allTanks: Array<Tank> = [];
				for(const tank of data) {
					allTanks.push(getTank(tank));
				}
				onLoad(true, allTanks);
			}
		})
	);
}

export {
	getFavoriteTank,
	setFavoriteTankId,
	getAllUsersTanks,
}

