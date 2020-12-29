//@flow strict

import BinaryOperationBlock from './BinaryOperationBlock.js';
import BooleanValue from '../interpreter/BooleanValue.js';
import {verifyBoolean} from '../interpreter/Value.js';

class AndBlock extends BinaryOperationBlock {

	constructor() {
		super('AndBlock', 'BOOLEAN', 'BOOLEAN', 'and');
	}

	evaluate(): BooleanValue {
		const lRes=verifyBoolean(this.lChild.runEvaluate());
		if (!lRes.val) {
			return lRes;
		}

		const rRes=verifyBoolean(this.rChild.runEvaluate());
		return rRes;
	}

}

export default AndBlock;
