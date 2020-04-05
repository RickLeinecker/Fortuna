//@flow strict

import BinaryOperationBlock from './BinaryOperationBlock.js';
import IntValue from '../interpreter/IntValue.js';
import {verifyInt} from '../interpreter/Value.js';

class IntMultiplyBlock extends BinaryOperationBlock {

	constructor() {
		super('IntMultiplyBlock', 'INT', 'INT', '*');
	}

	evaluate(): IntValue {
		const lRes=verifyInt(this.lChild.runEvaluate());
		const rRes=verifyInt(this.rChild.runEvaluate());
		return lRes.mul(rRes);
	}

}

export default IntMultiplyBlock;
