//@flow strict

import BinaryOperationBlock from './BinaryOperationBlock.js';
import BooleanValue from '../interpreter/BooleanValue.js';
import {verifyBoolean} from '../interpreter/Value.js';

class XorBlock extends BinaryOperationBlock {

	constructor() {
		super('XorBlock', 'BOOLEAN', 'BOOLEAN', 'xor');
	}

	evaluate(): BooleanValue {
		const lRes=verifyBoolean(this.lChild.runEvaluate());
		const rRes=verifyBoolean(this.rChild.runEvaluate());
		return lRes.xor(rRes);
	}
}

export default XorBlock;
