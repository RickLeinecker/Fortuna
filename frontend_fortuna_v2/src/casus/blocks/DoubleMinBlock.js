//@flow strict

import BinaryOperationBlock from './BinaryOperationBlock.js';
import DoubleValue from '../interpreter/DoubleValue.js';
import {verifyDouble} from '../interpreter/Value.js';

class DoubleMinBlock extends BinaryOperationBlock {

	constructor() {
		super('DoubleMinBlock', 'DOUBLE', 'DOUBLE', ',', 'min');
	}

	evaluate(): DoubleValue {
		const lRes=verifyDouble(this.lChild.runEvaluate());
		const rRes=verifyDouble(this.rChild.runEvaluate());
		return lRes.minWith(rRes);
	}

}

export default DoubleMinBlock;
