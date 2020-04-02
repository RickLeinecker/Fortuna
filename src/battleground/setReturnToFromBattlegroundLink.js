//@flow strict

import Cookies from 'universal-cookie';
import type { LinkType } from '../globalComponents/typesAndClasses/LinkType.js';

function setReturnToFromBattlegroundLink(link: LinkType): void {
	new Cookies().set('battlegroundReturnLink', link, {path: '/'});
}

export default setReturnToFromBattlegroundLink;

