//@flow strict

import getLoginToken from '../getLoginToken.js';
import User from '../typesAndClasses/User.js';

// Sets the user's wager according to the number passed to it.
// Returns a boolean indicating success (true) or failure (false). Maybe change to string to return the error.
function setWager(wager: number, onLoad:(setSuccessful: boolean) => void): void {
	const responsePromise: Promise<Response> = fetch('/api/user/setWager/', {
		method: 'PATCH',
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Content-Type': 'application/json',
			'Access-Control-Allow-Credentials': 'true',
			'x-auth-token': getLoginToken()
		},
		body: JSON.stringify({ wager: wager }),
	});
	responsePromise.then (
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

function getLeaders(onLoad:(leaders: Array<User>) => void): void {
	const responsePromise: Promise<Response> = fetch('/api/user/leaderboard', {
		method: 'GET',
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Content-Type': 'application/json',
			'Access-Control-Allow-Credentials': 'true'
		},
	});
	responsePromise.then(
		response => response.json().then(data => {
			if (response.status !== 200) {
				console.log(response.status);
				console.log(data);
			}
			else {
				// Process all of the leaders into an array and load it.
				const leaders: Array<User> = [];
				for(const user of data) {
					leaders.push(new User(user.userName, user.money, user.wager, user._id, user.stats.elo, []));
				}
				console.log(leaders);
				onLoad(leaders);
			}
		})
	);
}

export {
	setWager,
	getLeaders
};
