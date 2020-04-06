//@flow strict

import UnaryOperationBlock from './UnaryOperationBlock.js';
import type {DataType} from './DataType.js';

class PrintBlock extends UnaryOperationBlock {

	constructor(paramType: DataType) {
		super('PrintBlock', paramType, 'VOID', 'print');
	}

	evaluate(): null {
		const res=this.rChild.runEvaluate();
		console.log(res);
		return null;
	}
}

export default PrintBlock;
