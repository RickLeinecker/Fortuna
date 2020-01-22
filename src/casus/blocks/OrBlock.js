//@flow strict

import BinaryOperationBlock from './BinaryOperationBlock.js';

class OrBlock extends BinaryOperationBlock {

	constructor() {
		super('BOOLEAN', 'BOOLEAN', 'or');
	}

}

export default OrBlock;
