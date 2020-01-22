//@flow strict

import BinaryOperationBlock from './BinaryOperationBlock.js';

class IntEqualsBlock extends BinaryOperationBlock {

	constructor() {
		super('INT', 'BOOLEAN', '==');
	}

}

export default IntEqualsBlock;
