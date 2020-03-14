//@flow strict

import BinaryOperationBlock from './BinaryOperationBlock.js';
import BooleanValue from '../interpreter/BooleanValue.js';
import {verifyDouble} from '../interpreter/Value.js';

class DoubleLessThanOrEqualBlock extends BinaryOperationBlock {

	constructor() {
		super('DoubleLessThanOrEqualBlock', 'DOUBLE', 'BOOLEAN', '<=');
	}

	evaluate(): BooleanValue {
		const lRes=verifyDouble(this.lChild.evaluate());
		const rRes=verifyDouble(this.rChild.evaluate());
		return new BooleanValue(lRes.equals(rRes) || lRes.lessThan(rRes));
	}

}

export default DoubleLessThanOrEqualBlock;
