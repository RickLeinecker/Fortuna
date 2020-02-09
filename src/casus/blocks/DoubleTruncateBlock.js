//@flow strict

import UnaryOperationBlock from './UnaryOperationBlock.js';
import IntValue from '../interpriter/IntValue.js';
import {verifyDouble} from '../interpriter/Value.js';

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
