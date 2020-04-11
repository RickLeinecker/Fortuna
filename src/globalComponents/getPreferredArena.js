//@flow strict

import Cookies from 'universal-cookie';
import type {ArenaType} from '../battleground/ArenaType.js';
import type {BattleType} from './typesAndClasses/BattleType.js';

function getPreferredArena(battleType: BattleType): ArenaType {
	const result=new Cookies().get('preferredArena');
	if (battleType === '1 vs 1') {
		if (result === 'HEX' || result === 'DIRT') {
			return result;
		}
		return 'DIRT';
	}
	else {
		if (result === 'CANDEN' || result === 'LUNAR') {
			return result;
		}
		return 'CANDEN';
	}
}

export default getPreferredArena;
