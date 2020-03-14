//@flow strict

import UnaryOperationBlock from './UnaryOperationBlock.js';
import DoubleValue from '../interpreter/DoubleValue.js';
import {verifyDouble} from '../interpreter/Value.js';

class DoubleAbsBlock extends UnaryOperationBlock {

	constructor() {
		super('DoubleAbsBlock', 'DOUBLE', 'DOUBLE', 'abs');
	}

	evaluate(): DoubleValue {
		const childRes=verifyDouble(this.rChild.evaluate());
		return childRes.abs();
	}

}

export default DoubleAbsBlock;
