//@flow strict

import SingleConditionHeader from './SingleConditionHeader.js';

import {
	WHILE_BLOCK_WHILE_WIDTH
} from './generateCornerPerim.js';

class WhileBlock extends SingleConditionHeader {
	constructor() {
		super(WHILE_BLOCK_WHILE_WIDTH, 'while');
	}
}

export default WhileBlock;
