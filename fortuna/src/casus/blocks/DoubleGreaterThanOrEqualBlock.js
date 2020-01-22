//@flow strict

import BinaryOperationBlock from './BinaryOperationBlock.js';

class DoubleGreaterThanOrEqualBlock extends BinaryOperationBlock {

	constructor() {
		super('DOUBLE', 'BOOLEAN', '>=');
	}

}

export default DoubleGreaterThanOrEqualBlock;
