//@flow strict

import UnaryOperationBlock from './UnaryOperationBlock.js';

class MathSinBlock extends UnaryOperationBlock {

	constructor() {
		super('DOUBLE', 'DOUBLE', 'sin');
	}

}

export default MathSinBlock;
