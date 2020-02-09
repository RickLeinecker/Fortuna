//@flow strict

import IntValue from './IntValue.js';

class DoubleValue {
	val: number;

	constructor(val: number) {
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
		if (o.val === 0)
			return this;
		return new DoubleValue(this.val/o.val);
	}

	equals(o: DoubleValue): boolean {
		return this.val===o.val;
	}

	greaterThan(o: DoubleValue): boolean {
		return this.val > o.val;
	}

	lessThan(o: DoubleValue): boolean {
		return this.val < o.val;
	}

	maxWith(o: DoubleValue): DoubleValue {
		return new DoubleValue(Math.max(this.val, o.val));
	}

	minWith(o: DoubleValue): DoubleValue {
		return new DoubleValue(Math.min(this.val, o.val));
	}

	round(): IntValue {
		// TODO: this has the potential to be an insanely expensive call
		// https://github.com/RickLeinecker/Fortuna/issues/81
		return new IntValue(Math.round(this.val));
	}

	truncate(): IntValue {
		// TODO: this has the potential to be an insanely expensive call
		// https://github.com/RickLeinecker/Fortuna/issues/81
		return new IntValue(Math.trunc(this.val));
	}

	abs(): DoubleValue {
		return new DoubleValue(Math.abs(this.val));
	}

	arccos(): DoubleValue {
		if (this.val<-1 || this.val>1) {
			return new DoubleValue(0);
		}
		return new DoubleValue(Math.acos(this.val));
	}

	arcsin(): DoubleValue {
		if (this.val<-1 || this.val>1) {
			return new DoubleValue(0);
		}
		return new DoubleValue(Math.asin(this.val));
	}

	arctan(): DoubleValue {
		return new DoubleValue(Math.atan(this.val));
	}

	sin(): DoubleValue {
		return new DoubleValue(Math.sin(this.val));
	}

	cos(): DoubleValue {
		return new DoubleValue(Math.cos(this.val));
	}

	tan(): DoubleValue {
		return new DoubleValue(Math.tan(this.val));
	}

	pow(o: DoubleValue): DoubleValue {
		if (this.val===0 && o.val === 0) {
			return new DoubleValue(0);
		}
		return new DoubleValue(Math.pow(this.val, o.val));
	}

	sqrt(): DoubleValue {
		return new DoubleValue(Math.sqrt(Math.abs(this.val)));
	}

}

export default DoubleValue;
