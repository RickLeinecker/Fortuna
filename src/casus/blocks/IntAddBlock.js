//@flow strict

import BinaryOperationBlock from './BinaryOperationBlock.js';

class IntAddBlock extends BinaryOperationBlock {

	constructor() {
		super('INT', 'INT', '+');
	}

}

export default IntAddBlock;
