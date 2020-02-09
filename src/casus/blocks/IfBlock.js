//@flow strict

import SingleConditionHeader from './SingleConditionHeader.js';
import {verifyBoolean} from '../interpreter/Value.js';

import {
	IF_BLOCK_IF_WIDTH
} from './generateCornerPerim.js';

class IfBlock extends SingleConditionHeader {

	constructor() {
		super(IF_BLOCK_IF_WIDTH, 'if');
	}

	evaluate(): null {
		const condition=verifyBoolean(this.conditionBlock.evaluate());
		if (condition.val) {
			this.contents.evaluate();
		}
		return null;
	}
}

export default IfBlock;
