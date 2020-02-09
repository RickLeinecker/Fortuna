//@flow strict

import SingleConditionHeader from './SingleConditionHeader.js';
import {verifyBoolean} from '../interpreter/Value.js';
import {
	WHILE_BLOCK_WHILE_WIDTH
} from './generateCornerPerim.js';

class WhileBlock extends SingleConditionHeader {
	constructor() {
		super(WHILE_BLOCK_WHILE_WIDTH, 'while');
	}
	
	evaluate(): null {
		while (verifyBoolean(this.conditionBlock.evaluate()).val) {
			this.contents.evaluate();
		}
		return null;
	}

}

export default WhileBlock;
