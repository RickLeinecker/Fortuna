//@flow strict

import getLoginToken from '../getLoginToken.js';
import User from '../typesAndClasses/User.js';
import { getInventory } from '../GetInventoryInfo.js';

//gets the user when passed a token stored as the login token
function getUserAPICall(onLoad:(user: User) => void): void {
	const responsePromise: Promise<Response> = fetch('/api/user/getUser', {
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
				onLoad(data);
			}
			else {
				const user = new User(data.userName, data.money, data.wager, data._id, data.stats.elo, getInventory(data.inventory.tankComponents));
				onLoad(user);
			}
		})
	);
}


export default getUserAPICall;
