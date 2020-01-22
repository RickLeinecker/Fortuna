//@flow strict

import BinaryOperationBlock from './BinaryOperationBlock.js';

class IntGreaterThanBlock extends BinaryOperationBlock {

	constructor() {
		super('INT', 'BOOLEAN', '>');
	}

}

export default IntGreaterThanBlock;
