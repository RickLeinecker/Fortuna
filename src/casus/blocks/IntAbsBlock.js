//@flow strict

import UnaryOperationBlock from './UnaryOperationBlock.js';
import IntValue from '../interpreter/IntValue.js';
import {verifyInt} from '../interpreter/Value.js';

class IntAbsBlock extends UnaryOperationBlock {

	constructor() {
		super('IntAbsBlock', 'INT', 'INT', 'abs');
	}

	evaluate(): IntValue {
		const childRes=verifyInt(this.rChild.runEvaluate());
		return childRes.abs();
	}

}

export default IntAbsBlock;
