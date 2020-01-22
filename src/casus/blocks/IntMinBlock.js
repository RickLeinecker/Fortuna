//@flow strict

import BinaryOperationBlock from './BinaryOperationBlock.js';

class IntMinBlock extends BinaryOperationBlock {

	constructor() {
		super('INT', 'INT', ',', 'min');
	}

}

export default IntMinBlock;
