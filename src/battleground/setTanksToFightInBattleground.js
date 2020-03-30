//@flow strict

import Cookies from 'universal-cookie';

function setTanksToFightInBattleground(tankId1: string, tankId2: string): void {
	const cookies=new Cookies();
	cookies.set('tanksOrMatch', 'tanks');
	cookies.set('tankToFight1', tankId1);
	cookies.set('tankToFight2', tankId2);
}

function setMatchForBattleground(matchId: string): void {
	const cookies=new Cookies();
	cookies.set('tanksOrMatch', 'match');
	cookies.set('matchToLoad', matchId);
}

export {setMatchForBattleground};

export default setTanksToFightInBattleground;
