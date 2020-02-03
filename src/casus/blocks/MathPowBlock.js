//@flow strict

import BinaryOperationBlock from './BinaryOperationBlock.js';

class MathPowBlock extends BinaryOperationBlock {

	constructor() {
		super('DOUBLE', 'DOUBLE', '^');
	}

}

export default MathPowBlock;
