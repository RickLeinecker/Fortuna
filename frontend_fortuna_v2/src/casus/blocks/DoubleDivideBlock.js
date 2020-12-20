//@flow strict

import BinaryOperationBlock from './BinaryOperationBlock.js';
import DoubleValue from '../interpreter/DoubleValue.js';
import {verifyDouble} from '../interpreter/Value.js';

class DoubleDivideBlock extends BinaryOperationBlock {

	constructor() {
		super('DoubleDivideBlock', 'DOUBLE', 'DOUBLE', '/');
	}

	evaluate(): DoubleValue {
		const lRes=verifyDouble(this.lChild.runEvaluate());
		const rRes=verifyDouble(this.rChild.runEvaluate());
		return lRes.div(rRes);
	}

}

export default DoubleDivideBlock;
