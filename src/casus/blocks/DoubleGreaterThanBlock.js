//@flow strict

import BinaryOperationBlock from './BinaryOperationBlock.js';

class DoubleGreaterThanBlock extends BinaryOperationBlock {

	constructor() {
		super('DOUBLE', 'BOOLEAN', '>');
	}

}

export default DoubleGreaterThanBlock;
