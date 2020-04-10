//@flow strict

import Cookies from 'universal-cookie';
import type {ArenaType} from '../battleground/ArenaType.js';

function setPreferredArena(arena: ArenaType): void {
	return new Cookies().set('preferredArena', arena, {path: '/'});	
}

export default setPreferredArena;
