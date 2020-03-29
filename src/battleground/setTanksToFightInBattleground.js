//@flow strict

import Cookies from 'universal-cookie';

function setTanksToFightOnBattleground(tankId1: string, tankId2: string): void {
	const cookies=new Cookies();
	cookies.set('tankToFight1', tankId1);
	cookies.set('tankToFight2', tankId2);
}

export default setTanksToFightOnBattleground;
