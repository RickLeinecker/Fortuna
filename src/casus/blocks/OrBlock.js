//@flow strict

import BinaryOperationBlock from './BinaryOperationBlock.js';
import BooleanValue from '../interpriter/BooleanValue.js';
import {verifyBoolean} from '../interpriter/Value.js';

class OrBlock extends BinaryOperationBlock {

	constructor() {
		super('BOOLEAN', 'BOOLEAN', 'or');
	}

	evaluate(): BooleanValue {
		const lRes=verifyBoolean(this.lChild.evaluate());
		if (!lRes.val) {
			return lRes;
		}

		const rRes=verifyBoolean(this.rChild.evaluate());
		return rRes;
	}

}

export default OrBlock;
