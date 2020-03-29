//@flow strict

import Cookies from 'universal-cookie';
import Tank from '../tanks/Tank.js';

function getTanksToFightOnBattleground(onTankLoaded: (tank1: Tank, index: 0|1) => void): void {
	//well, we need an api call to get tanks based on their ids, so this cucrently isn't possible
}

export default getTanksToFightOnBattleground;
