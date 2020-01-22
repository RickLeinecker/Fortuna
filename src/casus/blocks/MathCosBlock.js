//@flow strict

import UnaryOperationBlock from './UnaryOperationBlock.js';

class MathCosBlock extends UnaryOperationBlock {

	constructor() {
		super('DOUBLE', 'DOUBLE', 'cos');
	}

}

export default MathCosBlock;
