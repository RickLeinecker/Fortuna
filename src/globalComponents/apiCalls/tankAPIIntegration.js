//@flow strict

import BackendTank from '../../tanks/BackendTank.js';
import Tank from '../../tanks/Tank.js';
import getLoginToken from '../getLoginToken.js';
import { getTank } from '../../tanks/TankLoader.js';
import { toast } from 'react-toastify';
import getErrorFromObject from '../getErrorFromObject.js';


// This function gets the id of the users favorite tank
function getFavoriteTank(onLoad:(tank: ?Tank) => void): void {
	const responsePromise: Promise<Response> = fetch('/api/tank/getFavorite/', {
		method: 'GET',
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
				toast.error(getErrorFromObject(data));
			}
			else {
				// Check data for no favorite tank. Then the user has no favorite.
				if (getErrorFromObject(data) === 'No set favorite tank') {
					onLoad(null);
					return;
				}
				const tank = new BackendTank(
					data._id,
					data.components,
					data.casusCode,
					data.isBot,
					data.userId,
					data.tankName
				);
				onLoad(getTank(tank));
			}
		})
	)
}

// Function that gets the user's favorite tank team.
function getFavoriteTankTeam(onLoad:(tanks: Array<?Tank>) => void): void {
	const responsePromise: Promise<Response> = fetch('/api/tank/getFavoriteTankTeam/', {
		method: 'GET',
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
				toast.error(getErrorFromObject(data));
			}
			else {
				if (data === []) {
					onLoad([null, null, null]);
					return;
				}
				const tanks: Array<?Tank> = [];
				console.log(data);
				for(let i: number = 0; i < 3; i++) {
					if (data[i] != null) {
						tanks.push(getTank(new BackendTank(
							data[i]._id,
							data[i].components,
							data[i].casusCode,
							data[i].isBot,
							data[i].userId,
							data[i].tankName
						)));
					}
					else {
						tanks.push(null);
					}
				}
				onLoad(tanks);
			}
		})
	)
}

function setFavoriteTankId(tankId: string, onLoad:() => void): void {
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
				toast.error(data);
			}
			else {
				onLoad();
			}
		})
	);
}

function setFavoriteTankTeamIds(tankIds: Array<?string>, onLoad:() => void): void {
	const responsePromise: Promise<Response> = fetch('/api/tank/setFavoriteTankTeam/', {
		method: 'PATCH',
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Content-Type': 'application/json',
			'Access-Control-Allow-Credentials': 'true',
			'x-auth-token': getLoginToken()
		},
		body: JSON.stringify({ tankTeam: tankIds }),
	});
	responsePromise.then (
		response => response.text().then(data => {
			if (response.status !== 200) {
				console.log(response.status);
				console.log(data);
				toast.error(data);
			}
			else {
				onLoad();
			}
		})
	);
}

function removeFavoriteTankId(onLoad:() => void): void {
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
				toast.error(data);
			}
			else {
				onLoad();
			}
		})
	);
}

function removeFavoriteTankTeamIds(onLoad:() => void): void {
	const responsePromise: Promise<Response> = fetch('/api/tank/unfavoriteTankTeam/', {
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
				toast.error(data);
			}
			else {
				onLoad();
			}
		})
	);
}

// Updates a user's tank.
function updateTank(tank: Tank, onLoad:() => void): void {
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
					toast.error(getErrorFromObject(data));
				}
				else {
					onLoad();
				}
			})
		);
}

// This function gets all of the tanks the user is associated with
function getAllUsersTanks(onLoad: (allTanks: Array<Tank>) => void): void {
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
				toast.error(getErrorFromObject(data));
			}
			else {
				const allTanks: Array<Tank> = [];
				for(const tank of data) {
					allTanks.push(getTank(tank));
				}
				onLoad(allTanks);
			}
		})
	);
}

function createTank(tank: Tank, onLoad:() => void): void {
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
				toast.error(getErrorFromObject(data));
			}
			else {
				onLoad();
			}
		})
	);
}

function deleteTank(tankId: string, onLoad:() => void): void {
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
				toast.error(getErrorFromObject(data));
			}
			else {
				onLoad();
			}
		})
	);
}

//Input: Id of a tank
//Output: a tank object of the tank whose id equals the id that was passed in
function getTanksById(tankIds: Array<string>, onLoad:(tanks: Array<Tank>) => void): void {
	const jsonTanksId = JSON.stringify(tankIds);
	const responsePromise: Promise<Response> = fetch('/api/tank/getTanksById/?array='+ jsonTanksId, {
		method: 'GET',
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
				toast.error(getErrorFromObject(data));
			}
			else {
				const tanks = [];
				for(let i = 0; i < data.length; i++) {
					const tank = new BackendTank(
						data[i]._id,
						data[i].components,
						data[i].casusCode,
						data[i].isBot,
						data[i].userId,
						data[i].tankName
					);
					tanks.push(getTank(tank));
				}
				onLoad(tanks);
			}
		})
	)
}


export {
	getFavoriteTank,
	getFavoriteTankTeam,
	setFavoriteTankId,
	setFavoriteTankTeamIds,
	removeFavoriteTankId,
	removeFavoriteTankTeamIds,
	updateTank,
	getAllUsersTanks,
	createTank,
	deleteTank,
	getTanksById
}

