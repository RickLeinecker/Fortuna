//@flow strict

const DEFAULT_INT_VARIABLE_NAME = '[Int variable]';
const DEFAULT_DOUBLE_VARIABLE_NAME = '[Double variable]';
const DEFAULT_BOOLEAN_VARIABLE_NAME = '[Boolean variable]';

function isDefaultVariableName(candidateName: string): boolean {
	if (candidateName === DEFAULT_INT_VARIABLE_NAME ||
			candidateName === DEFAULT_DOUBLE_VARIABLE_NAME ||
			candidateName === DEFAULT_BOOLEAN_VARIABLE_NAME) {
		return true;
	}
	return false;
}

export {
	DEFAULT_INT_VARIABLE_NAME,
	DEFAULT_DOUBLE_VARIABLE_NAME,
	DEFAULT_BOOLEAN_VARIABLE_NAME,
	isDefaultVariableName
};
