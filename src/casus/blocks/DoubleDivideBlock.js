//@flow strict

import BinaryOperationBlock from './BinaryOperationBlock.js';
import DoubleValue from '../interpreter/DoubleValue.js';
import {verifyDouble} from '../interpreter/Value.js';

class DoubleDivideBlock extends BinaryOperationBlock {

	constructor() {
		super('DOUBLE', 'DOUBLE', '/');
	}

	evaluate(): DoubleValue {
		const lRes=verifyDouble(this.lChild.evaluate());
		const rRes=verifyDouble(this.rChild.evaluate());
		return lRes.div(rRes);
	}

}

export default DoubleDivideBlock;
