//@flow strict

import UnaryOperationBlock from './UnaryOperationBlock.js';
import type {DataType} from './DataType.js';

class PrintBlock extends UnaryOperationBlock {

	constructor(paramType: DataType) {
		super(paramType, 'VOID', 'print');
	}
}

export default PrintBlock;
