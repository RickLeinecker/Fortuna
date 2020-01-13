//@flow strict

import UnaryOperationBlock from './UnaryOperationBlock.js';

class MathAsinBlock extends UnaryOperationBlock {

	constructor() {
		super('DOUBLE', 'DOUBLE', 'arcsin');
	}

}

export default MathAsinBlock;
