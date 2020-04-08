//@flow strict

import BackendTank from '../../tanks/BackendTank.js';
import Tank from '../../tanks/Tank.js';
import getLoginToken from '../getLoginToken.js';
import { getTank } from '../../tanks/TankLoader.js';

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
				console.log(data);
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

function removeFavoriteTankId(onLoad:(setSuccessful: boolean) => void): void {
	const responsePromise: Promise<Response> = fetch('/api/tank/unfavoriteTank/', {
		method: 'PATCH',
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Content-Type': 'application/json',
			'Access-Control-Allow-Credentials': 'true',
			'x-auth-token': getLoginToken()
		}
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

function createTank(tank: Tank, onLoad:(success: boolean) => void): void {
	const responsePromise: Promise<Response> = fetch('/api/tank/assignTank', {
		method: 'POST',
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Content-Type': 'application/json',
			'Access-Control-Allow-Credentials': 'true',
			'x-auth-token': getLoginToken()
		},
		body: JSON.stringify({ tankName: tank.tankName, userId: tank.userId, components: tank.parts.map(part => part.name) }),
	});
	responsePromise.then(
		response => response.json().then(data => {
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

function deleteTank(tankId: string, onLoad:(success: boolean) => void): void {
	const responsePromise: Promise<Response> = fetch('/api/tank/deleteTank/' + tankId, {
			method: 'DELETE',
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Content-Type': 'application/json',
				'Access-Control-Allow-Credentials': 'true',
				'x-auth-token': getLoginToken()
			},
		});
		responsePromise.then(
			response => response.json().then(data => {
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

export {
	getFavoriteTank,
	setFavoriteTankId,
	removeFavoriteTankId,
	updateTank,
	getAllUsersTanks,
	createTank,
	deleteTank
}

