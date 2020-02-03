//@flow strict

import UnaryOperationBlock from './UnaryOperationBlock.js';
import DoubleValue from '../interpriter/DoubleValue.js';
import {verifyDouble} from '../interpriter/Value.js';

class MathAsinBlock extends UnaryOperationBlock {

	constructor() {
		super('DOUBLE', 'DOUBLE', 'arcsin');
	}

	evaluate(): DoubleValue {
		const res=verifyDouble(this.rChild.evaluate());
		return res.arcsin();
	}

}

export default MathAsinBlock;
