//@flow strict

import BinaryOperationBlock from './BinaryOperationBlock.js';

class DoubleLessThanBlock extends BinaryOperationBlock {

	constructor() {
		super('DOUBLE', 'BOOLEAN', '<');
	}

}

export default DoubleLessThanBlock;
