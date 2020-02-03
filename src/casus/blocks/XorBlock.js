//@flow strict

import BinaryOperationBlock from './BinaryOperationBlock.js';
import BooleanValue from '../interpriter/BooleanValue.js';
import {verifyBoolean} from '../interpriter/Value.js';

class XorBlock extends BinaryOperationBlock {

	constructor() {
		super('BOOLEAN', 'BOOLEAN', 'xor');
	}

	evaluate(): BooleanValue {
		const lRes=verifyBoolean(this.lChild.evaluate());
		const rRes=verifyBoolean(this.rChild.evaluate());
		return lRes.xor(rRes);
	}
}

export default XorBlock;
