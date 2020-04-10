//@flow strict

import Cookies from 'universal-cookie';
import type {ArenaType} from '../battleground/ArenaType.js';

function getPreferredArena(arena: ArenaType): ArenaType {
	const result=new Cookies().get('preferredArena');
	if (result === 'HEX' || result === 'DIRT' || result === 'CANDEN' || result === 'LUNAR') {
		return result;
	}
	return 'DIRT';
}

export default getPreferredArena;
