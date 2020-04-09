//@flow strict

import getLoginToken from '../getLoginToken.js';
import User from '../typesAndClasses/User.js';
import Tank from '../../tanks/Tank.js';
import { toast } from 'react-toastify';
import getErrorFromObject from '../getErrorFromObject.js';

//gets the user when passed a token stored as the login token
function prepareMatchAPICall(myTank: Tank, otherPlayer: User, onLoad:(matchId: string) => void) {
	const responsePromise: Promise<Response> = fetch('/api/battle/prepareMatch', {
		method: 'POST',
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Content-Type': 'application/json',
			'Access-Control-Allow-Credentials': 'true',
			'x-auth-token': getLoginToken()
		},
		body: JSON.stringify({
			personBeingChallengedId: otherPlayer.userId,
			challengerTankId: myTank._id,
		})
	});
	responsePromise.then (
		response => response.json().then(data => {
			if (response.status !== 200) {
				console.log(response.status);
				console.log(data);
				toast.error(getErrorFromObject(data));
			}
			else {
				const matchId=data;
				console.log('successfully created match with id: '+matchId);
				onLoad(matchId);
			}
		})
	);
}


export default prepareMatchAPICall;
