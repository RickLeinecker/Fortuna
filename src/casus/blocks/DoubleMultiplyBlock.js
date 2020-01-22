//@flow strict

import BinaryOperationBlock from './BinaryOperationBlock.js';

class DoubleMultiplyBlock extends BinaryOperationBlock {

	constructor() {
		super('DOUBLE', 'DOUBLE', '*');
	}

}

export default DoubleMultiplyBlock;
