//@flow strict

import type {DataType} from '../blocks/DataType.js';

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
	isLegalConstant
};
