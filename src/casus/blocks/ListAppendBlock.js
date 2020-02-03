//@flow strict

import BinaryOperationBlock from './BinaryOperationBlock.js';
import {listVersionOf} from './DataType.js';
import type {DataType} from './DataType.js';

class ListAppendBlock extends BinaryOperationBlock {

	constructor(dataType: DataType) {
		super(dataType, listVersionOf(dataType), 'to', 'append');
	}

}

export default ListAppendBlock;
