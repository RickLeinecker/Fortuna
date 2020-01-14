//@flow strict

import UnaryOperationBlock from './UnaryOperationBlock.js';

class MathSqrtBlock extends UnaryOperationBlock {

	constructor() {
		super('DOUBLE', 'DOUBLE', 'sqrt');
	}

}

export default MathSqrtBlock;
