//@flow strict

import UnaryOperationBlock from './UnaryOperationBlock.js';
import DoubleValue from '../interpreter/DoubleValue.js';
import {verifyDouble} from '../interpreter/Value.js';

class MathSqrtBlock extends UnaryOperationBlock {

	constructor() {
		super('MathSqrtBlock', 'DOUBLE', 'DOUBLE', 'sqrt');
	}

	evaluate(): DoubleValue {
		const res=verifyDouble(this.rChild.evaluate());
		return res.sqrt();
	}

}

export default MathSqrtBlock;
