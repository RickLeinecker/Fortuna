//@flow strict

import BinaryOperationBlock from './BinaryOperationBlock.js';
import DoubleValue from '../interpreter/DoubleValue.js';
import {verifyDouble} from '../interpreter/Value.js';

class DoubleAddBlock extends BinaryOperationBlock {

	constructor() {
		super('DoubleAddBlock', 'DOUBLE', 'DOUBLE', '+');
	}

	evaluate(): DoubleValue {
		const lRes=verifyDouble(this.lChild.runEvaluate());
		const rRes=verifyDouble(this.rChild.runEvaluate());
		return lRes.add(rRes);
	}

}

export default DoubleAddBlock;
