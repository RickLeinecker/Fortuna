//@flow strict

import Cookies from 'universal-cookie';
import Tank from '../tanks/Tank.js';

function setTanksToFightInBattleground(tankId1: string, tankId2: string): void {
	const cookies=new Cookies();
	cookies.set('tanksOrMatch', 'tanks');
	cookies.set('tank1Me', tankId1);
	cookies.set('tank1Enemy', tankId2);
}

function setTanksToFightInBattleground3v3(
	tank1Me: ?Tank, 
	tank2Me: ?Tank, 
	tank3Me: ?Tank,
	tank1Enemy: ?Tank,
	tank2Enemy: ?Tank,
	tank3Enemy: ?Tank,
): void {
	const cookies=new Cookies();
	cookies.set('tanksOrMatch', 'tanks');
	cookies.set('tank1Me', tank1Me?._id??'');
	cookies.set('tank2Me', tank2Me?._id??'');
	cookies.set('tank3Me', tank3Me?._id??'');
	cookies.set('tank1Enemy', tank1Enemy?._id??'');
	cookies.set('tank2Enemy', tank2Enemy?._id??'');
	cookies.set('tank3Enemy', tank3Enemy?._id??'');
}

function setMatchForBattleground(matchId: string): void {
	const cookies=new Cookies();
	cookies.set('tanksOrMatch', 'match');
	cookies.set('matchToLoad', matchId);
}

export {setMatchForBattleground, setTanksToFightInBattleground3v3};

export default setTanksToFightInBattleground;
