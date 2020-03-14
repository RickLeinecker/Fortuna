//@flow strict

import BinaryOperationBlock from './BinaryOperationBlock.js';
import IntValue from '../interpreter/IntValue.js';
import {verifyInt} from '../interpreter/Value.js';

class IntSubtractBlock extends BinaryOperationBlock {

	constructor() {
		super('IntSubtractBlock', 'INT', 'INT', '-');
	}

	evaluate(): IntValue {
		const lRes=verifyInt(this.lChild.evaluate());
		const rRes=verifyInt(this.rChild.evaluate());
		return lRes.sub(rRes);
	}

}

export default IntSubtractBlock;
