//@flow strict

import BinaryOperationBlock from './BinaryOperationBlock.js';
import {listVersionOf} from './DataType.js';
import {
	verifyInt,
	verifyBoolean,
	verifyDouble,
	verifyIntList,
	verifyBooleanList,
	verifyDoubleList
} from '../interpreter/Value.js';

import type {DataType} from './DataType.js';

class ListAppendBlock extends BinaryOperationBlock {

	constructor(dataType: DataType) {
		super(dataType, 'VOID', 'to', 'append', listVersionOf(dataType));
	}

	evaluate(): null {
		const toAppend = this.lChild.evaluate();
		const list = this.rChild.evaluate();
		switch(this.paramType) {
			case 'INT':
				verifyIntList(list).append(verifyInt(toAppend));
				break;
			case 'BOOLEAN':
				verifyBooleanList(list).append(verifyBoolean(toAppend));
				break;
			case 'DOUBLE':
				verifyDoubleList(list).append(verifyDouble(toAppend));
				break;
			default:
				throw new Error('unexpected param type in ListAppendBlock!');
		}
		return null;
	}

}

export default ListAppendBlock;
