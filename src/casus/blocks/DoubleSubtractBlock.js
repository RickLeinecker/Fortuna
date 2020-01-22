//@flow strict

import BinaryOperationBlock from './BinaryOperationBlock.js';

class DoubleSubtractBlock extends BinaryOperationBlock {

	constructor() {
		super('DOUBLE', 'DOUBLE', '-');
	}

}

export default DoubleSubtractBlock;
