//@flow strict

import BinaryOperationBlock from './BinaryOperationBlock.js';

class AndBlock extends BinaryOperationBlock {

	constructor() {
		super('BOOLEAN', 'BOOLEAN', 'and');
	}

}

export default AndBlock;
