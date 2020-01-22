//@flow strict

import UnaryOperationBlock from './UnaryOperationBlock.js';

class IntToDoubleBlock extends UnaryOperationBlock {

	constructor() {
		super('INT', 'DOUBLE', 'to double');
	}

}

export default IntToDoubleBlock;
