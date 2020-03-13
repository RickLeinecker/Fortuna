//@flow strict

import BinaryOperationBlock from './BinaryOperationBlock.js';
import BooleanValue from '../interpreter/BooleanValue.js';
import {verifyInt} from '../interpreter/Value.js';

class IntLessThanBlock extends BinaryOperationBlock {

	constructor() {
		super('IntLessThanBlock', 'INT', 'BOOLEAN', '<');
	}

	evaluate(): BooleanValue {
		const lRes=verifyInt(this.lChild.evaluate());
		const rRes=verifyInt(this.rChild.evaluate());
		return new BooleanValue(lRes.lessThan(rRes));
	}

}

export default IntLessThanBlock;
