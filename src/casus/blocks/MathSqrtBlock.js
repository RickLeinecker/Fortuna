//@flow strict

import UnaryOperationBlock from './UnaryOperationBlock.js';
import DoubleValue from '../interpriter/DoubleValue.js';
import {verifyDouble} from '../interpriter/Value.js';

class MathSqrtBlock extends UnaryOperationBlock {

	constructor() {
		super('DOUBLE', 'DOUBLE', 'sqrt');
	}

	evaluate(): DoubleValue {
		const res=verifyDouble(this.rChild.evaluate());
		return res.sqrt();
	}

}

export default MathSqrtBlock;
