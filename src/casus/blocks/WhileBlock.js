//@flow strict

import SingleConditionHeader from './SingleConditionHeader.js';
import {verifyBoolean} from '../interpreter/Value.js';
import {
	WHILE_BLOCK_WHILE_WIDTH
} from './generateCornerPerim.js';

class WhileBlock extends SingleConditionHeader {
	constructor() {
		super('WhileBlock', WHILE_BLOCK_WHILE_WIDTH, 'while');
	}
	
	evaluate(): null {
		while (verifyBoolean(this.conditionBlock.runEvaluate()).val) {
			this.contents.runEvaluate();
		}
		return null;
	}

}

export default WhileBlock;
