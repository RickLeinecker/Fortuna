//@flow strict

import BinaryOperationBlock from './BinaryOperationBlock.js';

class DoubleMaxBlock extends BinaryOperationBlock {

	constructor() {
		super('DOUBLE', 'DOUBLE', ',', 'max');
	}

}

export default DoubleMaxBlock;
