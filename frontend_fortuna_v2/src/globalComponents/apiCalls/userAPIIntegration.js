//@flow strict

import getLoginToken from '../getLoginToken.js';
import User from '../typesAndClasses/User.js';
import { toast } from 'react-toastify';
import getErrorFromObject from '../getErrorFromObject.js';

// Sets the user's wager according to the number passed to it.
// Returns a boolean indicating the stipend was added.
function setWager(wager: number, onLoad:(stipendApplied: boolean) => void): void {
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
			if (response.status !== 200 && response.status !== 201) {
				console.log(response.status);
				console.log(data);
				toast.error(getErrorFromObject(data));
			}
			else if (response.status === 200) {
				onLoad(false);
			}
			else if (response.status === 201) {
				onLoad(true);
			}
		})
	);
}


function setWager3v3(wager: number, onLoad:(stipendApplied: boolean) => void): void {
	const responsePromise: Promise<Response> = fetch('/api/user/setWager3v3/', {
		method: 'PATCH',
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Content-Type': 'application/json',
			'Access-Control-Allow-Credentials': 'true',
			'x-auth-token': getLoginToken()
		},
		body: JSON.stringify({ wager3v3: wager }),
	});
	responsePromise.then (
		response => response.json().then(data => {
			if (response.status !== 200 && response.status !== 201) {
				console.log(response.status);
				console.log(data);
				toast.error(getErrorFromObject(data));
			}
			else if (response.status === 200) {
				onLoad(false);
			}
			else if (response.status === 201) {
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
				toast.error(getErrorFromObject(data));
			}
			else {
				// Process all of the leaders into an array and load it.
				const leaders: Array<User> = [];
				for(const user of data) {
					leaders.push(new User(user.userName, user.money, user.wager, user.wager3v3, user._id, user.stats.elo, []));
				}
				onLoad(leaders);
			}
		})
	);
}

export {
	setWager,
	setWager3v3,
	getLeaders
};
