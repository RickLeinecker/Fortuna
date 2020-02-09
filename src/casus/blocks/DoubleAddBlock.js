//@flow strict

import BinaryOperationBlock from './BinaryOperationBlock.js';
import DoubleValue from '../interpreter/DoubleValue.js';
import {verifyDouble} from '../interpreter/Value.js';

class DoubleAddBlock extends BinaryOperationBlock {

	constructor() {
		super('DOUBLE', 'DOUBLE', '+');
	}

	evaluate(): DoubleValue {
		const lRes=verifyDouble(this.lChild.evaluate());
		const rRes=verifyDouble(this.rChild.evaluate());
		return lRes.add(rRes);
	}

}

export default DoubleAddBlock;
