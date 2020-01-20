//@flow strict

import BinaryOperationBlock from './BinaryOperationBlock.js';

class DoubleEqualsBlock extends BinaryOperationBlock {

	constructor() {
		super('DOUBLE', 'BOOLEAN', '==');
	}

}

export default DoubleEqualsBlock;
