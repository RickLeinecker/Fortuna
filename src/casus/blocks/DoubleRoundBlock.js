//@flow strict

import UnaryOperationBlock from './UnaryOperationBlock.js';

class DoubleRoundBlock extends UnaryOperationBlock {

	constructor() {
		super('DOUBLE', 'INT', 'round');
	}

}

export default DoubleRoundBlock;
