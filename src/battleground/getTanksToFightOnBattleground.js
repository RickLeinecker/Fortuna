//@flow strict

import Cookies from 'universal-cookie';
import Tank from '../tanks/Tank.js';
import getBotTanksAPICall from '../globalComponents/apiCalls/getBotTanksAPICall.js';
import {getAllUsersTanks} from '../globalComponents/apiCalls/tankAPIIntegration.js';
import getMatchAPICall from '../globalComponents/apiCalls/getMatchAPICall.js';

function getTanksToFightOnBattleground(
	onTankLoaded: (tankLoaded: Tank, index: 0|1) => void,
	onMatchIDLoaded: (matchID: string) => void
): void {
	//well, we need an api call to get tanks based on their ids, so this cucrently isn't possible
	const cookies=new Cookies();
	const tanksOrMatch=cookies.get('tanksOrMatch');
	if (tanksOrMatch === 'tanks') {
		const tankId1=cookies.get('tankToFight1');
		const tankId2=cookies.get('tankToFight2');
		console.log('Getting tanks '+tankId1+' '+tankId2);

		getBotTanksAPICall(botTanks => {
			const tank1=botTanks.find(tank => tank._id === tankId1);
			if (tank1 != null) {
				onTankLoaded(tank1, 0);
			}
			const tank2=botTanks.find(tank => tank._id === tankId2);
			if (tank2 != null) {
				onTankLoaded(tank2, 1);
			}
		});
		getAllUsersTanks(usersTanks => {
			const tank1=usersTanks.find(tank => tank._id === tankId1);
			if (tank1 != null) {
				onTankLoaded(tank1, 0);
			}
			const tank2=usersTanks.find(tank => tank._id === tankId2);
			if (tank2 != null) {
				onTankLoaded(tank2, 1);
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
