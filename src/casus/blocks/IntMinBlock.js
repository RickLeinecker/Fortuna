//@flow strict

import BinaryOperationBlock from './BinaryOperationBlock.js';
import IntValue from '../interpreter/IntValue.js';
import {verifyInt} from '../interpreter/Value.js';

class IntMinBlock extends BinaryOperationBlock {

	constructor() {
		super('IntMinBlock', 'INT', 'INT', ',', 'min');
	}

	evaluate(): IntValue {
		const lRes=verifyInt(this.lChild.runEvaluate());
		const rRes=verifyInt(this.rChild.runEvaluate());
		return lRes.minWith(rRes);
	}

}

export default IntMinBlock;
