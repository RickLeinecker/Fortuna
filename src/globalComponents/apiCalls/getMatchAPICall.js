//@flow strict

import getLoginToken from '../getLoginToken.js';
import Tank from '../../tanks/Tank.js';
import { getTank } from '../../tanks/TankLoader.js';
import BackendTank from '../../tanks/BackendTank.js';
import { toast } from 'react-toastify';
import getErrorFromObject from '../getErrorFromObject.js';

//gets the user when passed a token stored as the login token
function getMatchAPICall(matchId: string, onLoad:(tank1: Tank, tank2: Tank, matchId: string) => void) {
	const token=getLoginToken();
	const responsePromise: Promise<Response> = fetch('/api/battle/getMatch/'+matchId, {
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
				toast.error(getErrorFromObject(response));
			}
			else {
				const dataT1=data.tankOne;
				const dataT2=data.tankTwo;
				const backendTank1=new BackendTank(
					'uh_oh_no_tank_id',
					dataT1.components,
					dataT1.casusCode,
					false, // We don't actually know if it is a bot, hopefuelly it doesn't matter
					data.userOne,
					dataT1.tankName
				);
				const backendTank2=new BackendTank(
					'uh_oh_no_tank_id',
					dataT2.components,
					dataT2.casusCode,
					false, // We don't actually know if it is a bot, hopefuelly it doesn't matter
					data.userTwo,
					dataT2.tankName
				);
				const tank1=getTank(backendTank1);
				const tank2=getTank(backendTank2);
				onLoad(tank1, tank2, matchId);
			}
		})
	);
}


export default getMatchAPICall;
