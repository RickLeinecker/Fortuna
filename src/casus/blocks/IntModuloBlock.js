//@flow strict

import BinaryOperationBlock from './BinaryOperationBlock.js';
import IntValue from '../interpreter/IntValue.js';
import {verifyInt} from '../interpreter/Value.js';

class IntModuloBlock extends BinaryOperationBlock {

	constructor() {
		super('IntModuloBlock', 'INT', 'INT', '%');
	}

	evaluate(): IntValue {
		const lRes=verifyInt(this.lChild.evaluate());
		const rRes=verifyInt(this.rChild.evaluate());
		return lRes.mod(rRes);
	}

}

export default IntModuloBlock;
