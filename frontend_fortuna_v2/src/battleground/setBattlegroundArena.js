//@flow strict

import Cookies from 'universal-cookie';
import type {ArenaType} from './ArenaType.js';

function setBattlegroundArena(arenaType: ArenaType): void {
	new Cookies().set('arena', arenaType, {path: '/'});
}

export default setBattlegroundArena;

