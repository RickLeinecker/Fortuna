//@flow strict

import BinaryOperationBlock from './BinaryOperationBlock.js';
import IntValue from '../interpreter/IntValue.js';
import {verifyInt} from '../interpreter/Value.js';

class IntDivideBlock extends BinaryOperationBlock {

	constructor() {
		super('INT', 'INT', '/');
	}

	evaluate(): IntValue {
		const lRes=verifyInt(this.lChild.evaluate());
		const rRes=verifyInt(this.rChild.evaluate());
		return lRes.div(rRes);
	}

}

export default IntDivideBlock;
