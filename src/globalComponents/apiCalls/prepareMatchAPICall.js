//@flow strict

import getLoginToken from '../getLoginToken.js';
import User from '../typesAndClasses/User.js';
import Tank from '../../tanks/Tank.js';
import { toast } from 'react-toastify';
import getErrorFromObject from '../getErrorFromObject.js';

//gets the user when passed a token stored as the login token
function prepare1v1APICall(myTank: Tank, otherPlayer: User, onLoad:(matchId: string) => void) {
	const responsePromise: Promise<Response> = fetch('/api/battle/prepareMatch1v1', {
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

function prepare3v3APICall(myTankOne: ?Tank, myTankTwo: ?Tank, myTankThree: ?Tank, otherPlayer: User, onLoad:(matchId: string) => void) {
	const myTankIds: Array<string> = [];
	if (myTankOne != null) {
		myTankIds.push(myTankOne._id);
	}
	if (myTankTwo != null) {
		myTankIds.push(myTankTwo._id);
	}
	if (myTankThree != null) {
		myTankIds.push(myTankThree._id);
	}

	const responsePromise: Promise<Response> = fetch('api/battle/prepareMatch3v3', {
		method: 'POST',
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Content-Type': 'application/json',
			'Access-Control-Allow-Credentials': 'true',
			'x-auth-token': getLoginToken()
		},
		body: JSON.stringify({
			personBeingChallengedId: otherPlayer.userId,
			challengerTankIds: myTankIds
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
				const matchId = data;
				console.log('successfully created match with id: '+matchId);
				onLoad(matchId);
			}
		})
	);
}


export { prepare1v1APICall, prepare3v3APICall };
