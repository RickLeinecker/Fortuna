//@flow strict

import getBattlegroundWidth from './getBattlegroundWidth.js';

function getBattlegroundHeight(): number {
	return getBattlegroundWidth()/200.0*120;
}

export default getBattlegroundHeight;

