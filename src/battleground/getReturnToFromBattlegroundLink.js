//@flow strict

import Cookies from 'universal-cookie';
import type {LinkType} from '../globalComponents/LinkType.js';

function getReturnToFromBattlegroundLink(): LinkType {
	const fromLink=new Cookies().get('battlegroundReturnLink');
	if (fromLink === '/BattleArena' || fromLink === 'TrainingArena') {
		return fromLink;
	}
	//either the link wasn't set or cookies got cleared or something
	return '/MainMenu';
}

export default getReturnToFromBattlegroundLink;
