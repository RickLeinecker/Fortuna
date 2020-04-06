//@flow strict

import UnaryOperationBlock from './UnaryOperationBlock.js';
import BooleanValue from '../interpreter/BooleanValue.js';
import {verifyBoolean} from '../interpreter/Value.js';

class NotBlock extends UnaryOperationBlock {

	constructor() {
		super('NotBlock', 'BOOLEAN', 'BOOLEAN', 'not');
	}

	evaluate(): BooleanValue {
		const res=verifyBoolean(this.rChild.runEvaluate());
		return res.not();
	}

}

export default NotBlock;
