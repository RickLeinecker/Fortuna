//@flow strict

import UnaryOperationBlock from './UnaryOperationBlock.js';
import type {DataType} from './DataType.js';

class PrintBlock extends UnaryOperationBlock {

	constructor(paramType: DataType) {
		super(paramType, 'VOID', 'print');
	}

	evaluate(): null {
		const res=this.rChild.evaluate();
		console.log(res);
		return null;
	}
}

export default PrintBlock;
