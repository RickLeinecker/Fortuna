//@flow strict

import BinaryOperationBlock from './BinaryOperationBlock.js';
import DoubleValue from '../interpreter/DoubleValue.js';
import {verifyDouble} from '../interpreter/Value.js';

class DoubleSubtractBlock extends BinaryOperationBlock {

	constructor() {
		super('DoubleSubtractBlock', 'DOUBLE', 'DOUBLE', '-');
	}

	evaluate(): DoubleValue {
		const lRes=verifyDouble(this.lChild.evaluate());
		const rRes=verifyDouble(this.rChild.evaluate());
		return lRes.sub(rRes);
	}

}

export default DoubleSubtractBlock;
