//@flow strict

import Value from './Value.js';

class BooleanValue extends Value {
	val: boolean;

	constructor(val: boolean) {
		super();
		this.val=val;
	}
}

export default BooleanValue;
