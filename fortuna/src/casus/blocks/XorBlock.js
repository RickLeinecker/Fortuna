//@flow strict

import BinaryOperationBlock from './BinaryOperationBlock.js';

class XorBlock extends BinaryOperationBlock {

	constructor() {
		super('BOOLEAN', 'BOOLEAN', 'xor');
	}

}

export default XorBlock;
