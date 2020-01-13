//@flow strict

import BinaryOperationBlock from './BinaryOperationBlock.js';

class IntSubtractBlock extends BinaryOperationBlock {

	constructor() {
		super('INT', 'INT', '-');
	}

}

export default IntSubtractBlock;
