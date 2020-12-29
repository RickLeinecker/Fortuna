//@flow strict

import Cookies from 'universal-cookie';
import type {ArenaType} from './ArenaType.js';

function getBattlegroundArena(): ArenaType {
	const arena=new Cookies().get('arena');
	if (arena === 'DIRT' || arena === 'HEX' || arena === 'CANDEN' || arena === 'LUNAR') {
		return arena;
	}
	console.log('Unexpected arena cookie!');
	return 'DIRT';
}

export default getBattlegroundArena;

