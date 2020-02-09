//@flow strict

import BinaryOperationBlock from './BinaryOperationBlock.js';
import DoubleValue from '../interpreter/DoubleValue.js';
import {verifyDouble} from '../interpreter/Value.js';

class MathPowBlock extends BinaryOperationBlock {

	constructor() {
		super('DOUBLE', 'DOUBLE', '^');
	}

	evaluate(): DoubleValue {
		const lRes=verifyDouble(this.lChild.evaluate());
		const rRes=verifyDouble(this.rChild.evaluate());
		return lRes.pow(rRes);
	}

}

export default MathPowBlock;
