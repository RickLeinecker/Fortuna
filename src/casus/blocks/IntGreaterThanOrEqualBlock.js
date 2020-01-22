//@flow strict

import BinaryOperationBlock from './BinaryOperationBlock.js';

class IntGreaterThanOrEqualBlock extends BinaryOperationBlock {

	constructor() {
		super('INT', 'BOOLEAN', '>=');
	}

}

export default IntGreaterThanOrEqualBlock;
