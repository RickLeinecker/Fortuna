//@flow strict

import UnaryOperationBlock from './UnaryOperationBlock.js';
import DoubleValue from '../interpriter/DoubleValue.js';
import {verifyDouble} from '../interpriter/Value.js';

class DoubleAbsBlock extends UnaryOperationBlock {

	constructor() {
		super('DOUBLE', 'DOUBLE', 'abs');
	}

	evaluate(): DoubleValue {
		const childRes=verifyDouble(this.rChild.evaluate());
		return childRes.abs();
	}

}

export default DoubleAbsBlock;
