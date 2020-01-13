//@flow strict

import BinaryOperationBlock from './BinaryOperationBlock.js';

class DoubleLessThanOrEqualBlock extends BinaryOperationBlock {

	constructor() {
		super('DOUBLE', 'BOOLEAN', '<=');
	}

}

export default DoubleLessThanOrEqualBlock;
