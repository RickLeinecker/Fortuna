//@flow strict

import UnaryOperationBlock from './UnaryOperationBlock.js';
import DoubleValue from '../interpriter/DoubleValue.js';
import {verifyDouble} from '../interpriter/Value.js';

class MathCosBlock extends UnaryOperationBlock {

	constructor() {
		super('DOUBLE', 'DOUBLE', 'cos');
	}

	evaluate(): DoubleValue {
		const res=verifyDouble(this.rChild.evaluate());
		return res.cos();
	}


}

export default MathCosBlock;
