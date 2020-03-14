//@flow strict

import UnaryOperationBlock from './UnaryOperationBlock.js';
import DoubleValue from '../interpreter/DoubleValue.js';
import {verifyDouble} from '../interpreter/Value.js';

class MathAsinBlock extends UnaryOperationBlock {

	constructor() {
		super('MathAsinBlock', 'DOUBLE', 'DOUBLE', 'arcsin');
	}

	evaluate(): DoubleValue {
		const res=verifyDouble(this.rChild.evaluate());
		return res.arcsin();
	}

}

export default MathAsinBlock;
