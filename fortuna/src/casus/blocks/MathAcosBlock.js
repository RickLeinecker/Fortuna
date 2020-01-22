//@flow strict

import UnaryOperationBlock from './UnaryOperationBlock.js';

class MathAcosBlock extends UnaryOperationBlock {

	constructor() {
		super('DOUBLE', 'DOUBLE', 'arccos');
	}

}

export default MathAcosBlock;
