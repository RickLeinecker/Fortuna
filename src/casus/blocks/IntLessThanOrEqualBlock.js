//@flow strict

import BinaryOperationBlock from './BinaryOperationBlock.js';

class IntLessThanOrEqualBlock extends BinaryOperationBlock {

	constructor() {
		super('INT', 'BOOLEAN', '<=');
	}

}

export default IntLessThanOrEqualBlock;
