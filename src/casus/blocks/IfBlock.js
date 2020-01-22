//@flow strict

import SingleConditionHeader from './SingleConditionHeader.js';

import {
	IF_BLOCK_IF_WIDTH
} from './generateCornerPerim.js';

class IfBlock extends SingleConditionHeader {
	constructor() {
		super(IF_BLOCK_IF_WIDTH, 'if');
	}
}

export default IfBlock;
