//@flow strict

import BinaryOperationBlock from './BinaryOperationBlock.js';
import DoubleValue from '../interpreter/DoubleValue.js';
import {verifyDouble} from '../interpreter/Value.js';

class MathPowBlock extends BinaryOperationBlock {

	constructor() {
		super('MathPowBlock', 'DOUBLE', 'DOUBLE', '^');
	}

	evaluate(): DoubleValue {
		const lRes=verifyDouble(this.lChild.runEvaluate());
		const rRes=verifyDouble(this.rChild.runEvaluate());
		return lRes.pow(rRes);
	}

}

export default MathPowBlock;
