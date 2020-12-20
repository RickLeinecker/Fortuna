//@flow strict

import BinaryOperationBlock from './BinaryOperationBlock.js';
import IntValue from '../interpreter/IntValue.js';
import {verifyInt} from '../interpreter/Value.js';

class IntDivideBlock extends BinaryOperationBlock {

	constructor() {
		super('IntDivideBlock', 'INT', 'INT', '/');
	}

	evaluate(): IntValue {
		const lRes=verifyInt(this.lChild.runEvaluate());
		const rRes=verifyInt(this.rChild.runEvaluate());
		return lRes.div(rRes);
	}

}

export default IntDivideBlock;
