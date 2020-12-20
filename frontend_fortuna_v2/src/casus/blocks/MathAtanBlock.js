//@flow strict

import UnaryOperationBlock from './UnaryOperationBlock.js';
import DoubleValue from '../interpreter/DoubleValue.js';
import {verifyDouble} from '../interpreter/Value.js';

class MathAtanBlock extends UnaryOperationBlock {

	constructor() {
		super('MathAtanBlock', 'DOUBLE', 'DOUBLE', 'arctan');
	}

	evaluate(): DoubleValue {
		const res=verifyDouble(this.rChild.runEvaluate());
		return res.arctan();
	}


}

export default MathAtanBlock;
