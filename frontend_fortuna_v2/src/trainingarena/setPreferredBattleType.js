//@flow strict

import Cookies from 'universal-cookie';
import type {BattleType} from '../globalComponents/typesAndClasses/BattleType.js';

function setPreferredBattleType(battleType: BattleType): void {
	return new Cookies().set('preferredBattleType', battleType, {path: '/'});	
}

export default setPreferredBattleType;
