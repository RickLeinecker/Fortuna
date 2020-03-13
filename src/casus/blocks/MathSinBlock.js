//@flow strict

import UnaryOperationBlock from './UnaryOperationBlock.js';
import DoubleValue from '../interpreter/DoubleValue.js';
import {verifyDouble} from '../interpreter/Value.js';

class MathSinBlock extends UnaryOperationBlock {

	constructor() {
		super('MathSinBlock', 'DOUBLE', 'DOUBLE', 'sin');
	}

	evaluate(): DoubleValue {
		const res=verifyDouble(this.rChild.evaluate());
		return res.sin();
	}

}

export default MathSinBlock;
