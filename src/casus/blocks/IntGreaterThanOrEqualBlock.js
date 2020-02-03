//@flow strict

import BinaryOperationBlock from './BinaryOperationBlock.js';
import BooleanValue from '../interpriter/BooleanValue.js';
import {verifyInt} from '../interpriter/Value.js';

class IntGreaterThanOrEqualBlock extends BinaryOperationBlock {

	constructor() {
		super('INT', 'BOOLEAN', '>=');
	}

	evaluate(): BooleanValue {
		const lRes=verifyInt(this.lChild.evaluate());
		const rRes=verifyInt(this.rChild.evaluate());
		return new BooleanValue(lRes.equals(rRes) || lRes.greaterThan(rRes));
	}

}

export default IntGreaterThanOrEqualBlock;
