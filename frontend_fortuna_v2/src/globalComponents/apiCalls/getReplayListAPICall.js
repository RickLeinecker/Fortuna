//@flow strict

import getLoginToken from '../getLoginToken.js';
import Replay from '../typesAndClasses/Replay.js';
import { toast } from 'react-toastify';
import getErrorFromObject from '../getErrorFromObject.js';

//gets the user when passed a token stored as the login token
function getReplayListAPICall(onLoad:(replays: Array<Replay>) => void) {
	const token=getLoginToken();
	console.log('getting all replays...');
	const responsePromise: Promise<Response> = fetch('/api/replay/getReplayList', {
		method: 'GET',
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Content-Type': 'application/json',
			'Access-Control-Allow-Credentials': 'true',
			'x-auth-token': token
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
				const replays=data.map(backendReplay =>
					new Replay(
						backendReplay.tankOne.tankName,
						backendReplay.tankTwo.tankName,
						backendReplay.userOne.userName,
						backendReplay.userTwo.userName,
						backendReplay.winner,
						backendReplay.prizeMoney,
						backendReplay.eloExchanged,
						backendReplay._id,
						backendReplay.map,
						backendReplay.tankTeamOne.map(tank => tank.tankName),
						backendReplay.tankTeamTwo.map(tank => tank.tankName)
					)
				);
				console.log('returned replays: ');
				console.log(replays);
				onLoad(replays);
			}
		})
	);
}


export default getReplayListAPICall;
