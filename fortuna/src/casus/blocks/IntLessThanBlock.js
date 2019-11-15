//@flow strict

import BinaryOperationBlock from './BinaryOperationBlock.js';

class IntLessThanBlock extends BinaryOperationBlock {

	constructor() {
		super('INT', 'BOOLEAN', '<');
	}

}

export default IntLessThanBlock;
