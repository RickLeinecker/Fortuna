//@flow strict

import IntValue from './IntValue.js';
import BooleanValue from './BooleanValue.js';
import DoubleValue from './DoubleValue.js';

import IntListValue from './IntListValue.js';
import BooleanListValue from './BooleanListValue.js';
import DoubleListValue from './DoubleListValue.js';
import {
	verifyInt,
	verifyDouble,
	verifyBoolean,

	verifyIntList,
	verifyDoubleList,
	verifyBooleanList,

	defaultValueFor
} from './Value.js';

import type {Value} from './Value.js';
import type {DataType} from '../blocks/DataType.js';

class InterpriterState {
	intVariables: Map<string, IntValue>;
	booleanVariables: Map<string, BooleanValue>;
	doubleVariables: Map<string, DoubleValue>;
	intListVariables: Map<string, IntListValue>;
	booleanListVariables: Map<string, BooleanListValue>;
	doubleListVariables: Map<string, DoubleListValue>;
	
	getVariable(type: DataType, name: string): ?Value {
		switch(type) {
			case 'INT':
				return name in this.intVariables ?
					this.intVariables.get(name) :
					defaultValueFor('INT');
			case 'BOOLEAN':
				return name in this.booleanVariables ?
					this.booleanVariables.get(name) :
					defaultValueFor('BOOLEAN');
			case 'DOUBLE':
				return name in this.doubleVariables ?
					this.doubleVariables.get(name) :
					defaultValueFor('DOUBLE');
			case 'INT_LIST':
				if (!(name in this.intListVariables)) {
					this.intListVariables.set(name, new IntListValue());
				}
				return this.intListVariables.get(name);
			case 'BOOLEAN_LIST':
				if (!(name in this.booleanListVariables)) {
					this.booleanListVariables.set(name, new BooleanListValue());
				}
				return this.booleanListVariables.get(name);
			case 'DOUBLE_LIST':
				if (!(name in this.doubleListVariables)) {
					this.doubleListVariables.set(name, new DoubleListValue());
				}
				return this.booleanListVariables.get(name);
		}
	}

	setVariable(type: DataType, name: string, value: Value): void {
		switch(type) {
			case 'INT':
				this.intVariables.set(name, verifyInt(value));
				break;
			case 'BOOLEAN':
				this.booleanVariables.set(name, verifyBoolean(value));
				break;
			case 'DOUBLE':
				this.doubleVariables.set(name, verifyDouble(value));
				break;
			case 'INT_LIST':
				this.intListVariables.set(name, verifyIntList(value));
				break;
			case 'BOOLEAN_LIST':
				this.booleanListVariables.set(name, verifyBooleanList(value));
				break;
			case 'DOUBLE_LIST':
				this.doubleListVariables.set(name, verifyDoubleList(value));
				break;
		}
	}
}

let curInterpreterState = new InterpriterState();
function setInterpriterState(newState: InterpriterState): void {
	curInterpreterState = newState;
}
function getInterpriterState(): InterpriterState {
	return curInterpreterState;
}

export {
	setInterpriterState,
	getInterpriterState
};

export default InterpriterState;
