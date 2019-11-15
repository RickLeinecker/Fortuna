//@flow strict

import BinaryOperationBlock from './BinaryOperationBlock.js';

class OrBlock extends BinaryOperationBlock {

	constructor() {
		super('INT', 'BOOLEAN', '==');
	}

}

export default OrBlock;
