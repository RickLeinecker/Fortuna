//@flow strict

import BinaryOperationBlock from './BinaryOperationBlock.js';

class IntMultiplyBlock extends BinaryOperationBlock {

	constructor() {
		super('INT', 'INT', '*');
	}

}

export default IntMultiplyBlock;
