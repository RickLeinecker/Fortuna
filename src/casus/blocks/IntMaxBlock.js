//@flow strict

import BinaryOperationBlock from './BinaryOperationBlock.js';
import IntValue from '../interpreter/IntValue.js';
import {verifyInt} from '../interpreter/Value.js';

class IntMaxBlock extends BinaryOperationBlock {

	constructor() {
		super('INT', 'INT', ',', 'max');
	}

	evaluate(): IntValue {
		const lRes=verifyInt(this.lChild.evaluate());
		const rRes=verifyInt(this.rChild.evaluate());
		return lRes.maxWith(rRes);
	}

}

export default IntMaxBlock;
