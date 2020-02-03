//@flow strict

import IntValue from './IntValue.js';
import BooleanValue from './BooleanValue.js';
import DoubleValue from './DoubleValue.js';
import IntListValue from './IntListValue.js';
import BooleanListValue from './BooleanListValue.js';
import DoubleListValue from './DoubleListValue.js';
import type {DataType} from '../blocks/DataType.js';

type Value = IntValue | BooleanValue | DoubleValue | IntListValue | BooleanListValue | DoubleListValue;

function verifyInt(val: ?Value): IntValue {
	if (val == null) {
		throw 'Expected an int value, but got null!';
	}
	if (!(val instanceof IntValue)) {
		throw 'Expected a int value, but didnt find one!';
	}
	return val;
}

function verifyBoolean(val: ?Value): BooleanValue {
	if (val == null) {
		throw 'Expected a boolean value, but got null!';
	}
	if (!(val instanceof BooleanValue)) {
		throw 'Expected a boolean value, but didnt find one!';
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

function verifyIntList(val: ?Value): IntListValue {
	if (val == null) {
		throw 'Expected an int list, but got null!';
	}
	if (!(val instanceof IntListValue)) {
		throw 'Expected a int list, but didnt find one!';
	}
	return val;
}

function verifyBooleanList(val: ?Value): BooleanListValue {
	if (val == null) {
		throw 'Expected a boolean leist, but got null!';
	}
	if (!(val instanceof BooleanListValue)) {
		throw 'Expected a boolean list, but didnt find one!';
	}
	return val;
}

function verifyDoubleList(val: ?Value): DoubleListValue {
	if (val == null) {
		throw 'Expected a double list, but got null!';
	}
	if (!(val instanceof DoubleListValue)) {
		throw 'Expected a double list, but didnt find one!';
	}
	return val;
}

function defaultValueFor(type: DataType): ?Value {
	switch (type) {
		case 'INT':
			return new IntValue(0);
		case 'BOOLEAN':
			return new BooleanValue(false);
		case 'DOUBLE':
			return new DoubleValue(0.0);
		default:
			return null;
	}
}

export {
	verifyInt,
	verifyBoolean,
	verifyDouble,
	verifyIntList,
	verifyBooleanList,
	verifyDoubleList,
	defaultValueFor
};

export type {Value};
