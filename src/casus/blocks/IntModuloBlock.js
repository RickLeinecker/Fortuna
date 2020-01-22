//@flow strict

import BinaryOperationBlock from './BinaryOperationBlock.js';

class IntModuloBlock extends BinaryOperationBlock {

	constructor() {
		super('INT', 'INT', '%');
	}

}

export default IntModuloBlock;
