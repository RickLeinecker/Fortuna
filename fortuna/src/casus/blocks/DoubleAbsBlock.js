//@flow strict

import UnaryOperationBlock from './UnaryOperationBlock.js';

class DoubleAbsBlock extends UnaryOperationBlock {

	constructor() {
		super('DOUBLE', 'DOUBLE', 'abs');
	}

}

export default DoubleAbsBlock;
