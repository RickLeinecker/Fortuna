//@flow strict

import Cookies from 'universal-cookie';
import Tank from '../tanks/Tank.js';
import getBotTanksAPICall from '../globalComponents/getBotTanksAPICall.js';
import {getAllUsersTanks} from '../globalComponents/tankAPIIntegration.js';

function getTanksToFightOnBattleground(onTankLoaded: (tankLoaded: Tank, index: 0|1) => void): void {
	//well, we need an api call to get tanks based on their ids, so this cucrently isn't possible
	const cookies=new Cookies();
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
	getAllUsersTanks((successful, usersTanks) => {
		if (!successful) {
			throw new Error("Couldn't get user's tanks!");
		}
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

export default getTanksToFightOnBattleground;
