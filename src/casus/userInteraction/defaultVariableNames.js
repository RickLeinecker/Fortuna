//@flow strict

const DEFAULT_INT_VARIABLE_NAME = '[Int variable]';
const DEFAULT_DOUBLE_VARIABLE_NAME = '[Double variable]';
const DEFAULT_BOOLEAN_VARIABLE_NAME = '[Boolean variable]';

const DEFAULT_INT_VARIABLE_NAME_OR_CONST = '[Int variable or constant]';
const DEFAULT_DOUBLE_VARIABLE_NAME_OR_CONST = '[Double variable or constant]';
const DEFAULT_BOOLEAN_VARIABLE_NAME_OR_CONST = '[Boolean variable or constant]';

const DEFAULT_INT_LIST_NAME = '[Int list]';
const DEFAULT_DOUBLE_LIST_NAME = '[Double list]';
const DEFAULT_BOOLEAN_LIST_NAME = '[Boolean list]';

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
	isDefaultVariableName
};
