//@flow strict

import UnaryOperationBlock from './UnaryOperationBlock.js';
import IntValue from '../interpreter/IntValue.js';
import {verifyDouble} from '../interpreter/Value.js';

class DoubleRoundBlock extends UnaryOperationBlock {

	constructor() {
		super('DOUBLE', 'INT', 'truncate');
	}

	evaluate(): IntValue {
		const rRes=verifyDouble(this.rChild.evaluate());
		return rRes.truncate();
	}

}

export default DoubleRoundBlock;
