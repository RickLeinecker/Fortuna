//@flow strict

import Value from './Value.js';
import type {DataType} from '../blocks/DataType.js';

class InterpriterState {
	
	getVariable(type: DataType, name: string): Value {
	}

	setVariable(type: DataType, name: string, value: Value) {
	}
}

export default InterpriterState;
