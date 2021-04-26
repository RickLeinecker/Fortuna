//@flow strict

import getLoginToken from '../getLoginToken.js';
import Tank from '../../tanks/Tank.js';
import { getTank } from '../../tanks/TankLoader.js';
import BackendTank from '../../tanks/BackendTank.js';
import { toast } from 'react-toastify';
import getErrorFromObject from '../getErrorFromObject.js';
import type {ArenaType} from '../../battleground/ArenaType.js';

//gets the user when passed a token stored as the login token
function getMatchAPICall(
	matchId: string, 
	onLoad:(tanksLoaded: Array<?Tank>, matchId: string, arenaType: ArenaType) => void
) {
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
				toast.error(getErrorFromObject(data));
			}
			else {
				//might be either a 1v1 or a 3v3 match
				if (data.tankTeamOne.length===0) {
					console.log(data);
					const dataT1=data.tankOne;
					const dataT2=data.tankTwo;
					const arena=data.map;
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
					onLoad([tank1, null, null, tank2, null, null], matchId, arena);
				}
				else {
					const teamOne=data.tankTeamOne;
					const teamTwo=data.tankTeamTwo;
					const tank1=teamOne.length>0?getTank(teamOne[0]): null;
					const tank2=teamOne.length>1?getTank(teamOne[1]): null;
					const tank3=teamOne.length>2?getTank(teamOne[2]): null;

					const tank4=teamTwo.length>0?getTank(teamTwo[0]): null;
					const tank5=teamTwo.length>1?getTank(teamTwo[1]): null;
					const tank6=teamTwo.length>2?getTank(teamTwo[2]): null;
					const arena=data.map;
					onLoad([tank1, tank2, tank3, tank4, tank5, tank6], matchId, arena);
				}
			}
		})
	);
}


export default getMatchAPICall;
