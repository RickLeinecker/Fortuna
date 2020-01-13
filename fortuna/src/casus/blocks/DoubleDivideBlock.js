//@flow strict

import BinaryOperationBlock from './BinaryOperationBlock.js';

class DoubleDivideBlock extends BinaryOperationBlock {

	constructor() {
		super('DOUBLE', 'DOUBLE', '/');
	}

}

export default DoubleDivideBlock;
