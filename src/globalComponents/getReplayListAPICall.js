//@flow strict

import getLoginToken from './getLoginToken.js';
import Tank from '../tanks/Tank.js';
import {getTank} from '../tanks/TankLoader.js';
import BackendTank from '../tanks/BackendTank.js';

//gets the user when passed a token stored as the login token
function getReplayListAPICall(onLoad:() => void) {
	const token=getLoginToken();
	console.log(token);
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
				console.log(data.msg);
			}
			else {
				console.log('got this data: ');
				console.log(data);
			}
		})
	);
}


export default getReplayListAPICall;
