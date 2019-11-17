//@flow strict

import BinaryOperationBlock from './BinaryOperationBlock.js';

import type DataType from './DataType.js'

class AndBlock extends BinaryOperationBlock {

	constructor() {
		super('BOOLEAN', 'BOOLEAN', 'and');
	}

}

export default AndBlock;
