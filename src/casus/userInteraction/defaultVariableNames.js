//@flow strict

import type {DataType} from '../blocks/DataType.js';
import type {Value} from '../interpreter/Value.js';
import IntValue from '../interpreter/IntValue.js';
import BooleanValue from '../interpreter/BooleanValue.js';
import DoubleValue from '../interpreter/DoubleValue.js';
import {
	builtInIntVariables, 
	builtInBooleanVariables, 
	builtInDoubleVariables, 
	builtInDoubleListVariables
} from './CasusSpecialVariables.js';

const DEFAULT_INT_VARIABLE_NAME = '[Int variable]';
const DEFAULT_DOUBLE_VARIABLE_NAME = '[Double variable]';
const DEFAULT_BOOLEAN_VARIABLE_NAME = '[Boolean variable]';

const DEFAULT_INT_VARIABLE_NAME_OR_CONST = '[Int variable or constant]';
const DEFAULT_DOUBLE_VARIABLE_NAME_OR_CONST = '[Double variable or constant]';
const DEFAULT_BOOLEAN_VARIABLE_NAME_OR_CONST = '[Boolean variable or constant]';

const DEFAULT_INT_LIST_NAME = '[Int list]';
const DEFAULT_DOUBLE_LIST_NAME = '[Double list]';
const DEFAULT_BOOLEAN_LIST_NAME = '[Boolean list]';

const TRUE_KEYWORD = 'true';
const FALSE_KEYWORD = 'false';


function isDefaultVariableName(candidateName: string): boolean {
	if (candidateName === DEFAULT_INT_VARIABLE_NAME ||
			candidateName === DEFAULT_DOUBLE_VARIABLE_NAME ||
			candidateName === DEFAULT_BOOLEAN_VARIABLE_NAME ||

			candidateName === DEFAULT_INT_VARIABLE_NAME_OR_CONST ||
			candidateName === DEFAULT_DOUBLE_VARIABLE_NAME_OR_CONST ||
			candidateName === DEFAULT_BOOLEAN_VARIABLE_NAME_OR_CONST ||

			candidateName === DEFAULT_INT_LIST_NAME ||
			candidateName === DEFAULT_DOUBLE_LIST_NAME ||
			candidateName === DEFAULT_BOOLEAN_LIST_NAME) {
		return true;
	}
	return false;
}

//requirements for a variable name: start with upper/lower/underscore, 
//contains only upper/lower/underscore/numbers
function isLegalVariableName(name: string): boolean {
	if (isDefaultVariableName(name) || _isIllegalKeyword(name)) {
		return false;
	}
	return /^[A-Za-z_][A-Za-z0-9_]*$/.test(name);
}

function isLegalConstant(constant: string, expectedType: DataType):boolean {
	if (expectedType === 'INT') {
		return /^-?[0-9]+$/.test(constant);
	}
	else if (expectedType === 'DOUBLE') {
		return /^-?(([0-9]+[.][0-9]*)|([0-9]+))$/.test(constant);
	}
	else if (expectedType === 'BOOLEAN') {
		return constant === TRUE_KEYWORD || constant === FALSE_KEYWORD;
	}

	//no constants for lists
	return false;
}

function _isIllegalKeyword(name: string): boolean {
	if (name === TRUE_KEYWORD || name === FALSE_KEYWORD) {
		return true;
	}
	return false;
}

function getNameAsConstant(name: string, expectedType: DataType): ?Value {
	if (expectedType === 'BOOLEAN') {
		if (name === TRUE_KEYWORD) {
			return new BooleanValue(true);
		}
		if (name === FALSE_KEYWORD) {
			return new BooleanValue(false);
		}
		console.log('expected a boolean constant but found: ' + name);
		return null;
	}
	else if (expectedType === 'INT') {
		return new IntValue(Number(name));
	}
	else if (expectedType === 'DOUBLE') {
		return new DoubleValue(Number(name));
	}
	console.log('tried to get the constant equivalent of type '+expectedType+" which isn't supported!");
	return null;
}

function isBuiltInVariable(name: string, expectedType: DataType): boolean {
	if (expectedType === 'BOOLEAN') {
		return builtInBooleanVariables.includes(name);
	}
	else if (expectedType === 'INT') {
		return builtInIntVariables.includes(name);
	}
	else if (expectedType === 'DOUBLE') {
		return builtInDoubleVariables.includes(name);
	}
	else if (expectedType === 'DOUBLE_LIST') {
		return builtInDoubleListVariables.includes(name);
	}
	else {
		return false;
	}
}

export {
	DEFAULT_INT_VARIABLE_NAME,
	DEFAULT_DOUBLE_VARIABLE_NAME,
	DEFAULT_BOOLEAN_VARIABLE_NAME,

	DEFAULT_INT_VARIABLE_NAME_OR_CONST,
	DEFAULT_DOUBLE_VARIABLE_NAME_OR_CONST,
	DEFAULT_BOOLEAN_VARIABLE_NAME_OR_CONST,

	DEFAULT_INT_LIST_NAME,
	DEFAULT_DOUBLE_LIST_NAME,
	DEFAULT_BOOLEAN_LIST_NAME,

	TRUE_KEYWORD,
	FALSE_KEYWORD,

	isDefaultVariableName,
	isLegalVariableName,
	isLegalConstant,
	getNameAsConstant,
	isBuiltInVariable,
};
