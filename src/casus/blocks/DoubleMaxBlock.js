//@flow strict

import BinaryOperationBlock from './BinaryOperationBlock.js';
import DoubleValue from '../interpriter/DoubleValue.js';
import {verifyDouble} from '../interpriter/Value.js';

class DoubleMaxBlock extends BinaryOperationBlock {

	constructor() {
		super('DOUBLE', 'DOUBLE', ',', 'max');
	}

	evaluate(): DoubleValue {
		const lRes=verifyDouble(this.lChild.evaluate());
		const rRes=verifyDouble(this.rChild.evaluate());
		return lRes.maxWith(rRes);
	}

}

export default DoubleMaxBlock;
