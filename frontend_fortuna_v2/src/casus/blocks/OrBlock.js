//@flow strict

import BinaryOperationBlock from './BinaryOperationBlock.js';
import BooleanValue from '../interpreter/BooleanValue.js';
import {verifyBoolean} from '../interpreter/Value.js';

class OrBlock extends BinaryOperationBlock {

	constructor() {
		super('OrBlock', 'BOOLEAN', 'BOOLEAN', 'or');
	}

	evaluate(): BooleanValue {
		const lRes=verifyBoolean(this.lChild.runEvaluate());
		if (lRes.val) {
			return lRes;
		}

		const rRes=verifyBoolean(this.rChild.runEvaluate());
		return rRes;
	}

}

export default OrBlock;
