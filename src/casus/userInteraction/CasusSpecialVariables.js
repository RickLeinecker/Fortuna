//@flow strict

// this file contains a list of all casus special variables names and their associated types

// ints

// booleans
const USE_MINE_VAR_NAME: string = 'useMine';
const USE_C4_VAR_NAME: string = 'useC4';

// doubles:
const FORWARD_MOVEMENT_VAR_NAME: string = 'forwardMovement';
const TARGET_DIRECTION_VAR_NAME: string = 'targetDirection';

const builtInIntVariables: Array<string> = [
];

const builtInBooleanVariables: Array<string> = [
	USE_MINE_VAR_NAME,
	USE_C4_VAR_NAME
];

const builtInDoubleVariables: Array<string> = [
	FORWARD_MOVEMENT_VAR_NAME,
	TARGET_DIRECTION_VAR_NAME
];

export {
	USE_MINE_VAR_NAME,
	USE_C4_VAR_NAME,

	FORWARD_MOVEMENT_VAR_NAME,
	TARGET_DIRECTION_VAR_NAME,

	builtInIntVariables,
	builtInBooleanVariables,
	builtInDoubleVariables
};

