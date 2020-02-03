//@flow strict

import UnaryOperationBlock from './UnaryOperationBlock.js';

class MathAtanBlock extends UnaryOperationBlock {

	constructor() {
		super('DOUBLE', 'DOUBLE', 'arctan');
	}

}

export default MathAtanBlock;
