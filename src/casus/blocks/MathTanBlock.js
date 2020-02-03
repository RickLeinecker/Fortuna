//@flow strict

import UnaryOperationBlock from './UnaryOperationBlock.js';

class MathTanBlock extends UnaryOperationBlock {

	constructor() {
		super('DOUBLE', 'DOUBLE', 'tan');
	}

}

export default MathTanBlock;
