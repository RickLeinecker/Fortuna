//@flow strict

import BinaryOperationBlock from './BinaryOperationBlock.js';
import BooleanValue from '../interpreter/BooleanValue.js';
import {verifyInt} from '../interpreter/Value.js';

class IntGreaterThanBlock extends BinaryOperationBlock {

	constructor() {
		super('IntGreaterThanBlock', 'INT', 'BOOLEAN', '>');
	}

	evaluate(): BooleanValue {
		const lRes=verifyInt(this.lChild.runEvaluate());
		const rRes=verifyInt(this.rChild.runEvaluate());
		return new BooleanValue(lRes.greaterThan(rRes));
	}

}

export default IntGreaterThanBlock;
