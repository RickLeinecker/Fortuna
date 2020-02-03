//@flow strict

import IntValue from './IntValue.js';
import type {Value} from './Value.js';
import type {DataType} from '../blocks/DataType.js';

class InterpriterState {
	
	getVariable(type: DataType, name: string): Value {
		return new IntValue(8675309);
	}

	setVariable(type: DataType, name: string, value: Value): void {
	}
}

export default InterpriterState;
