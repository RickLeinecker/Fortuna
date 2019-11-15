//@flow strict

import BinaryOperationBlock from './BinaryOperationBlock.js';

import type DataType from './DataType.js'

class OrBlock extends BinaryOperationBlock {

	constructor() {
		super('BOOLEAN', 'BOOLEAN', 'or');
	}

}

export default OrBlock;
