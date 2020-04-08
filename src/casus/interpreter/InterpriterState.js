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
import type DefineFunctionBlock from '../blocks/DefineFunctionBlock.js';

const MAX_STATEMENTS=5e4;
//crashes between 2e4 and 3e4. Set to 2e3 just to be safe
const MAX_RECURSION_DEPTH=2e3;

class InterpriterState {
	intVariables: Map<string, IntValue>;
	booleanVariables: Map<string, BooleanValue>;
	doubleVariables: Map<string, DoubleValue>;
	intListVariables: Map<string, IntListValue>;
	booleanListVariables: Map<string, BooleanListValue>;
	doubleListVariables: Map<string, DoubleListValue>;
	functionList: Map<string, DefineFunctionBlock>;

	statementsMade: number;
	recursionDepth: number;
	hitInstructionLimit: boolean;
	hitRecursionLimit: boolean;

	printedStatements: Array<string>;
	
	constructor() {
		this.intVariables = new Map<string, IntValue>();
		this.booleanVariables = new Map<string, BooleanValue>();
		this.doubleVariables = new Map<string, DoubleValue>();
		this.intListVariables = new Map<string, IntListValue>();
		this.booleanListVariables = new Map<string, BooleanListValue>();
		this.doubleListVariables = new Map<string, DoubleListValue>();
		this.functionList = new Map<string, DefineFunctionBlock>();

		this.statementsMade=0;
		this.recursionDepth=0;
		this.hitInstructionLimit=0;
		this.hitRecursionLimit=0;

		this.printedStatements=[];
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

	getFunction(functionName: string): ?DefineFunctionBlock {
		return this.functionList.get(functionName);
	}

	setFunction(functionName: string, defineFunctionBlock: DefineFunctionBlock): void {
		this.functionList.set(functionName, defineFunctionBlock);
	}

	incrementStatementsMade(): void {
		this.statementsMade++;
	}

	madeTooManyStatements(): boolean {
		const TLE=this.statementsMade > MAX_STATEMENTS;
		this.hitInstructionLimit|=TLE;
		return TLE;
	}

	incrementRecursionDepth(): void {
		this.recursionDepth++;
	}

	decrementRecursionDepth(): void {
		this.recursionDepth--;
	}

	inTooDeep(): boolean {
		//maybe we're just trying too hard
		//when really it's closer than it is too far
		const inTooDeep=this.recursionDepth>MAX_RECURSION_DEPTH;
		this.hitRecursionLimit |= inTooDeep;
		return inTooDeep;
	}

	resetStatementsMade(): void {
		this.hitInstructionLimit=false;
		this.hitRecursionLimit=false;
		this.statementsMade = 0;
		this.recursionDepth = 0;
	}

	printDebugLine(toPrint: string): void {
		this.printedStatements.push(toPrint);
	}

	resetDebug(): void {
		this.printedStatements =  [];
	}

	everHitInstructionLimit(): boolean {
		return this.hitInstructionLimit;
	}

	everHitRecursionLimit(): boolean {
		return this.hitRecursionLimit;
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
