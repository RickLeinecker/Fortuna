//@flow strict

import Value from './Value.js';

class DoubleValue extends Value {
	val: number;

	constructor(val: number) {
		super();
		this.val=val;
	}

	add(o: DoubleValue): DoubleValue {
		return new DoubleValue(this.val+o.val);
	}
	sub(o: DoubleValue): DoubleValue {
		return new DoubleValue(this.val+o.val);
	}
	mul(o: DoubleValue): DoubleValue {
		return new DoubleValue(this.val*o.val);
	}
	div(o: DoubleValue): DoubleValue {
		//ignore divide by zeros
		if (o.val==0)
			return this;
		return new DoubleValue(this.val/o.val);
	}
	equals(o: DoubleValue): boolean {
		return this.val==o.val;
	}
}

export default DoubleValue;
