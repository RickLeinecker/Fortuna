//@flow strict

import Cookies from 'universal-cookie';
import Tank from '../tanks/Tank.js';
import getBotTanksAPICall from '../globalComponents/apiCalls/getBotTanksAPICall.js';
import {getAllUsersTanks} from '../globalComponents/apiCalls/tankAPIIntegration.js';
import getMatchAPICall from '../globalComponents/apiCalls/getMatchAPICall.js';
import type {ArenaType} from './ArenaType.js';
import setBattlegroundArena from './setBattlegroundArena.js';

// On the onTankLoaded callback, indecies 0-2 refer to tanks on Team1
// indecies 3-5 refer to tanks on team2
function getTanksToFightOnBattleground(
	onTankLoaded: (tankLoaded: Tank, index: number) => void,
	onMatchIDLoaded: (matchID: string) => void,
	onArenaLoaded: (arenaType: ArenaType) => void
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

		for (let index=0; index<targetTankIds.length; index++) {
			const targetIndex=targetTankIds[index];
			if (targetIndex==null || targetIndex==='') {
				continue;
			}
			getBotTanksAPICall(botTanks => {
				const matchedTank=botTanks.find(tank => tank._id === targetIndex);
				if (matchedTank!=null) {
					onTankLoaded(matchedTank, index);
				}
			});
			getAllUsersTanks(usersTanks => {
				const matchedTank=usersTanks.find(tank => tank._id === targetIndex);
				if (matchedTank!=null) {
					onTankLoaded(matchedTank, index);
				}
			});
		}
	}
	else if (tanksOrMatch === 'match') {
		const matchId=cookies.get('matchToLoad');
		console.log('trying to load match '+matchId);
		getMatchAPICall(matchId, (tanksLoaded, matchId, arenaType) => {
			console.log('match loaded!');
			setBattlegroundArena(arenaType);
			onArenaLoaded(arenaType);
			for (let i=0; i<6; i++) {
				if (tanksLoaded[i] != null) {
					onTankLoaded(tanksLoaded[i], i);
				}
			}
			onMatchIDLoaded(matchId);			
		});
	}
	else {
		console.log('unexpected cookies. Dont know whether to load tanks or match...');
	}
}

export default getTanksToFightOnBattleground;
