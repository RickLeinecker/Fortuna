//@flow strict

import UnaryOperationBlock from './UnaryOperationBlock.js';
import DoubleValue from '../interpreter/DoubleValue.js';
import {verifyInt} from '../interpreter/Value.js';

class IntToDoubleBlock extends UnaryOperationBlock {

	constructor() {
		super('INT', 'DOUBLE', 'to double');
	}

	evaluate(): DoubleValue {
		const rRes=verifyInt(this.rChild.evaluate());
		return rRes.toDoubleValue();
	}

}

export default IntToDoubleBlock;
