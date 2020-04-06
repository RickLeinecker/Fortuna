//@flow strict

import BinaryOperationBlock from './BinaryOperationBlock.js';
import IntValue from '../interpreter/IntValue.js';
import {verifyInt} from '../interpreter/Value.js';

class IntAddBlock extends BinaryOperationBlock {

	constructor() {
		super('IntAddBlock', 'INT', 'INT', '+');
	}

	evaluate(): IntValue {
		const lRes=verifyInt(this.lChild.runEvaluate());
		const rRes=verifyInt(this.rChild.runEvaluate());
		return lRes.add(rRes);
	}

}

export default IntAddBlock;
