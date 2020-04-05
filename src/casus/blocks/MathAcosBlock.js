//@flow strict

import UnaryOperationBlock from './UnaryOperationBlock.js';
import DoubleValue from '../interpreter/DoubleValue.js';
import {verifyDouble} from '../interpreter/Value.js';

class MathAcosBlock extends UnaryOperationBlock {

	constructor() {
		super('MathAcosBlock', 'DOUBLE', 'DOUBLE', 'arccos');
	}

	evaluate(): DoubleValue {
		const res=verifyDouble(this.rChild.runEvaluate());
		return res.arccos();
	}

}

export default MathAcosBlock;
