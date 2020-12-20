//@flow strict

import UnaryOperationBlock from './UnaryOperationBlock.js';
import IntValue from '../interpreter/IntValue.js';
import {verifyDouble} from '../interpreter/Value.js';

class DoubleRoundBlock extends UnaryOperationBlock {

	constructor() {
		super('DoubleRoundBlock', 'DOUBLE', 'INT', 'round');
	}

	evaluate(): IntValue {
		const rRes=verifyDouble(this.rChild.runEvaluate());
		return rRes.round();
	}

}

export default DoubleRoundBlock;
