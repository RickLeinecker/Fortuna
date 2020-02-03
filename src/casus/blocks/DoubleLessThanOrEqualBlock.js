//@flow strict

import BinaryOperationBlock from './BinaryOperationBlock.js';
import BooleanValue from '../interpriter/BooleanValue.js';
import {verifyDouble} from '../interpriter/Value.js';

class DoubleLessThanOrEqualBlock extends BinaryOperationBlock {

	constructor() {
		super('DOUBLE', 'BOOLEAN', '<=');
	}

	evaluate(): BooleanValue {
		const lRes=verifyDouble(this.lChild.evaluate());
		const rRes=verifyDouble(this.rChild.evaluate());
		return new BooleanValue(lRes.equals(rRes) || lRes.lessThan(rRes));
	}

}

export default DoubleLessThanOrEqualBlock;
