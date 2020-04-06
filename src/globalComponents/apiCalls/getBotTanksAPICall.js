//@flow strict

import Tank from '../../tanks/Tank.js';
import getLoginToken from '../getLoginToken.js';
import { getTank } from '../../tanks/TankLoader.js';

function getBotTanksAPICall(onLoad: (botTanks: Array<Tank>)=> void): void {
	const token=getLoginToken();
	const responsePromise: Promise<Response> = fetch('/api/tank/getBotTanks', {
		method: 'GET',
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Content-Type': 'application/json',
			'Access-Control-Allow-Credentials': 'true',
			'x-auth-token': token
		},
	});
	responsePromise.then (
		response => response.json().then(data => {
			if (response.status !== 200) {
				console.log(response.status);
				console.log(data);
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

export default getBotTanksAPICall;
