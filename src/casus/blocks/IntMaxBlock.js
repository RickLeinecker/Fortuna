//@flow strict

import BinaryOperationBlock from './BinaryOperationBlock.js';
import IntValue from '../interpriter/IntValue.js';
import {verifyInt} from '../interpriter/Value.js';

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
