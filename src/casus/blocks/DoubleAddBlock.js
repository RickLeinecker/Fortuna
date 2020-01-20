//@flow strict

import BinaryOperationBlock from './BinaryOperationBlock.js';

class DoubleAddBlock extends BinaryOperationBlock {

	constructor() {
		super('DOUBLE', 'DOUBLE', '+');
	}

}

export default DoubleAddBlock;
