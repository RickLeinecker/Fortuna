//@flow strict

import BinaryOperationBlock from './BinaryOperationBlock.js';
import BooleanValue from '../interpreter/BooleanValue.js';
import {verifyInt} from '../interpreter/Value.js';

class IntEqualsBlock extends BinaryOperationBlock {

	constructor() {
		super('IntEqualsBlock', 'INT', 'BOOLEAN', '==');
	}

	evaluate(): BooleanValue {
		const lRes=verifyInt(this.lChild.runEvaluate());
		const rRes=verifyInt(this.rChild.runEvaluate());
		return new BooleanValue(lRes.equals(rRes));
	}

}

export default IntEqualsBlock;
