//@flow strict

import Cookies from 'universal-cookie';
import Tank from '../tanks/Tank.js';
import getBotTanksAPICall from '../globalComponents/apiCalls/getBotTanksAPICall.js';
import {getAllUsersTanks} from '../globalComponents/apiCalls/tankAPIIntegration.js';
import getMatchAPICall from '../globalComponents/apiCalls/getMatchAPICall.js';

// On the onTankLoaded callback, indecies 0-2 refer to tanks on Team1
// refer to tanks on team2
function getTanksToFightOnBattleground(
	onTankLoaded: (tankLoaded: Tank, index: number) => void,
	onMatchIDLoaded: (matchID: string) => void
): void {
	//well, we need an api call to get tanks based on their ids, so this cucrently isn't possible
	const cookies=new Cookies();
	const tanksOrMatch=cookies.get('tanksOrMatch');
	if (tanksOrMatch === 'tanks') {
		const cookieNames: Array<string> =[
			'tank1Me',
			'tank2Me',
			'tank3Me',
			'tank1Enemy',
			'tank2Enemy',
			'tank3Enemy',
		];
		const targetTankIds=cookieNames.map(cookieName => cookies.get(cookieName));
		console.log('Getting tanks: ');
		console.log(targetTankIds);

		getBotTanksAPICall(botTanks => {
			for (let index=0; index<targetTankIds.length; index++) {
				if (targetTankIds[index] == null) {
					continue;
				}
				const matchedTank=botTanks.find(tank => tank._id === targetTankIds[index]);
				if (matchedTank!=null) {
					onTankLoaded(matchedTank, index);
				}
			}
		});
		getAllUsersTanks(usersTanks => {
			for (let index=0; index<targetTankIds.length; index++) {
				if (targetTankIds[index] == null) {
					continue;
				}
				const matchedTank=usersTanks.find(tank => tank._id === targetTankIds[index]);
				if (matchedTank!=null) {
					onTankLoaded(matchedTank, index);
				}
			}
		});
	}
	else if (tanksOrMatch === 'match') {
		const matchId=cookies.get('matchToLoad');
		console.log('trying to load match '+matchId);
		getMatchAPICall(matchId, (tank1, tank2, matchId) => {//todo: do something with this...
			console.log('match loaded!');
			onTankLoaded(tank1, 0);
			onTankLoaded(tank2, 1);
			onMatchIDLoaded(matchId);			
		});
	}
	else {
		console.log('unexpected cookies. Dont know whether to load tanks or match...');
	}
}

export default getTanksToFightOnBattleground;
