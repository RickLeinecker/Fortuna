//@flow strict

import BinaryOperationBlock from './BinaryOperationBlock.js';

class DoubleMinBlock extends BinaryOperationBlock {

	constructor() {
		super('DOUBLE', 'DOUBLE', ',', 'min');
	}

}

export default DoubleMinBlock;
