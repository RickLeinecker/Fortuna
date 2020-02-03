//@flow strict

import IntValue from './IntValue.js';
import BooleanValue from './BooleanValue.js';
import DoubleValue from './DoubleValue.js';

type Value = IntValue | BooleanValue | DoubleValue;

function verifyBoolean(val: ?Value): BooleanValue {
	if (val == null) {
		throw 'Expected a boolean value, but got null!';
	}
	if (!(val instanceof BooleanValue)) {
		throw 'Expected a boolean value, but didnt find one!';
	}
	return val;
}

function verifyInt(val: ?Value): IntValue {
	if (val == null) {
		throw 'Expected an int value, but got null!';
	}
	if (!(val instanceof IntValue)) {
		throw 'Expected a int value, but didnt find one!';
	}
	return val;
}

function verifyDouble(val: ?Value): DoubleValue {
	if (val == null) {
		throw 'Expected a double value, but got null!';
	}
	if (!(val instanceof DoubleValue)) {
		throw 'Expected a double value, but didnt find one!';
	}
	return val;
}

export {
	verifyInt,
	verifyBoolean,
	verifyDouble,
};

export type {Value};
