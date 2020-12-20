//@flow strict

import Cookies from 'universal-cookie';
import type {BattleType} from '../globalComponents/typesAndClasses/BattleType.js';

function getPreferredBattleType(): BattleType {
	const preferredType=new Cookies().get('preferredBattleType');	
	if (preferredType === '1 vs 1' || preferredType === '3 vs 3') {
		return preferredType;
	}
	return '1 vs 1';
}

export default getPreferredBattleType;
