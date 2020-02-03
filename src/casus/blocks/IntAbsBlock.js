//@flow strict

import UnaryOperationBlock from './UnaryOperationBlock.js';
import IntValue from '../interpriter/IntValue.js';
import {verifyInt} from '../interpriter/Value.js';

class IntAbsBlock extends UnaryOperationBlock {

	constructor() {
		super('INT', 'INT', 'abs');
	}

	evaluate(): IntValue {
		const childRes=verifyInt(this.rChild.evaluate());
		return childRes.abs();
	}

}

export default IntAbsBlock;
