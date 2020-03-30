//@flow strict

import getLoginToken from './getLoginToken.js';
import User from './User.js';
import Tank from '../tanks/Tank.js';

//gets the user when passed a token stored as the login token
function prepareMatchAPICall(myTank: Tank, otherPlayer: User, onLoad:(matchId: string) => void) {
	const token=getLoginToken();
	const responsePromise: Promise<Response> = fetch('/api/user/allUsers', {
		method: 'POST',
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Content-Type': 'application/json',
			'Access-Control-Allow-Credentials': 'true',
			'x-auth-token': token
		},
		body: JSON.stringify({
			personBeingChallengedId: otherPlayer.userID,
			challengerTankId: myTank._id,
		})
	});
	responsePromise.then (
		response => response.json().then(data => {
			if (response.status !== 200) {
				console.log(response.status);
				console.log(data.msg);
			}
			else {
				const matchId=data._id;
				console.log('successfully created match with id: '+matchId);
				onLoad(matchId);
			}
		})
	);
}


export default prepareMatchAPICall;
