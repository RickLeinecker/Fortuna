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

const MAX_STATEMENTS=5e4;

class InterpriterState {
	intVariables: Map<string, IntValue>;
	booleanVariables: Map<string, BooleanValue>;
	doubleVariables: Map<string, DoubleValue>;
	intListVariables: Map<string, IntListValue>;
	booleanListVariables: Map<string, BooleanListValue>;
	doubleListVariables: Map<string, DoubleListValue>;
	statementsMade: number;
	
	constructor() {
		this.intVariables = new Map<string, IntValue>();
		this.booleanVariables = new Map<string, BooleanValue>();
		this.doubleVariables = new Map<string, DoubleValue>();
		this.intListVariables = new Map<string, IntListValue>();
		this.booleanListVariables = new Map<string, BooleanListValue>();
		this.doubleListVariables = new Map<string, DoubleListValue>();
	}

	getVariable(type: DataType, name: string): ?Value {
		switch(type) {
			case 'INT':
				return this.intVariables.has(name) ?
					this.intVariables.get(name) :
					defaultValueFor('INT');
			case 'BOOLEAN':
				return this.booleanVariables.has(name) ?
					this.booleanVariables.get(name) :
					defaultValueFor('BOOLEAN');
			case 'DOUBLE':
				return this.doubleVariables.has(name) ?
					this.doubleVariables.get(name) :
					defaultValueFor('DOUBLE');
			case 'INT_LIST':
				if (!this.intListVariables.has(name)) {
					this.intListVariables.set(name, new IntListValue());
				}
				return this.intListVariables.get(name);
			case 'BOOLEAN_LIST':
				if (!this.booleanListVariables.has(name)) {
					this.booleanListVariables.set(name, new BooleanListValue());
				}
				return this.booleanListVariables.get(name);
			case 'DOUBLE_LIST':
				if (!this.doubleListVariables.has(name)) {
					this.doubleListVariables.set(name, new DoubleListValue());
				}
				return this.doubleListVariables.get(name);
			default:
				console.log('Unexpected variable type '+type+' in InterpreterState.getVariable!');
				return null;
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
			default:
				console.log('Unexpected variable type '+type+' in InterpreterState.setVariable!');
		}
	}

	incrementStatementsMade(): void {
		this.statementsMade++;
	}

	madeTooManyStatements(): boolean {
		return this.statementsMade > MAX_STATEMENTS;
	}

	resetStatementsMade(): void {
		this.statementsMade = 0;
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
