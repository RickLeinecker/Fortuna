//@flow strict

import UnaryOperationBlock from './UnaryOperationBlock.js';
import DoubleValue from '../interpriter/DoubleValue.js';
import {verifyDouble} from '../interpriter/Value.js';

class MathAtanBlock extends UnaryOperationBlock {

	constructor() {
		super('DOUBLE', 'DOUBLE', 'arctan');
	}

	evaluate(): DoubleValue {
		const res=verifyDouble(this.rChild.evaluate());
		return res.arctan();
	}


}

export default MathAtanBlock;
