//@flow strict

import UnaryOperationBlock from './UnaryOperationBlock.js';
import type {DataType} from './DataType.js';
import {getInterpriterState} from '../interpreter/InterpriterState.js';
import IntValue from '../interpreter/IntValue.js';
import BooleanValue from '../interpreter/BooleanValue.js';
import DoubleValue from '../interpreter/DoubleValue.js';

class PrintBlock extends UnaryOperationBlock {

	constructor(paramType: DataType) {
		super('PrintBlock', paramType, 'VOID', 'print');
	}

	evaluate(): null {
		const res=this.rChild.runEvaluate();
		if (res==null) {
			throw new Error('Tried to print something that was null!');
		}
		if (res instanceof IntValue || res instanceof DoubleValue ) {
			getInterpriterState().printDebugLine(res.val + '');
		}
		if (res instanceof BooleanValue) {
			getInterpriterState().printDebugLine(res.val ? 'true': 'false');
		}
		return null;
	}
}

export default PrintBlock;
