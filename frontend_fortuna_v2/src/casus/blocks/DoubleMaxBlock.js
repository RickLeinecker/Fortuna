//@flow strict

import BinaryOperationBlock from './BinaryOperationBlock.js';
import DoubleValue from '../interpreter/DoubleValue.js';
import {verifyDouble} from '../interpreter/Value.js';

class DoubleMaxBlock extends BinaryOperationBlock {

	constructor() {
		super('DoubleMaxBlock', 'DOUBLE', 'DOUBLE', ',', 'max');
	}

	evaluate(): DoubleValue {
		const lRes=verifyDouble(this.lChild.runEvaluate());
		const rRes=verifyDouble(this.rChild.runEvaluate());
		return lRes.maxWith(rRes);
	}

}

export default DoubleMaxBlock;
