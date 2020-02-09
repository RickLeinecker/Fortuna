//@flow strict

import BinaryOperationBlock from './BinaryOperationBlock.js';
import BooleanValue from '../interpreter/BooleanValue.js';
import {verifyInt} from '../interpreter/Value.js';

class IntLessThanOrEqualBlock extends BinaryOperationBlock {

	constructor() {
		super('INT', 'BOOLEAN', '<=');
	}

	evaluate(): BooleanValue {
		const lRes=verifyInt(this.lChild.evaluate());
		const rRes=verifyInt(this.rChild.evaluate());
		return new BooleanValue(lRes.equals(rRes) || lRes.lessThan(rRes));
	}

}

export default IntLessThanOrEqualBlock;
