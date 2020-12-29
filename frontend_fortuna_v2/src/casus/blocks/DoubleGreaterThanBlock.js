//@flow strict

import BinaryOperationBlock from './BinaryOperationBlock.js';
import BooleanValue from '../interpreter/BooleanValue.js';
import {verifyDouble} from '../interpreter/Value.js';

class DoubleGreaterThanBlock extends BinaryOperationBlock {

	constructor() {
		super('DoubleGreaterThanBlock', 'DOUBLE', 'BOOLEAN', '>');
	}

	evaluate(): BooleanValue {
		const lRes=verifyDouble(this.lChild.runEvaluate());
		const rRes=verifyDouble(this.rChild.runEvaluate());
		return new BooleanValue(lRes.greaterThan(rRes));
	}

}

export default DoubleGreaterThanBlock;
