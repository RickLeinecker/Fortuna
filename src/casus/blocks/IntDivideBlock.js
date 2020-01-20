//@flow strict

import BinaryOperationBlock from './BinaryOperationBlock.js';

class IntDivideBlock extends BinaryOperationBlock {

	constructor() {
		super('INT', 'INT', '/');
	}

}

export default IntDivideBlock;
