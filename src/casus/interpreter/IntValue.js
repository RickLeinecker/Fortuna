//@flow strict

import DoubleValue from './DoubleValue.js';

class IntValue {
	val: number;

	constructor(val: number) {
		this.val=this.normalize(val);
	}

	add(o: IntValue): IntValue {
		return new IntValue(this.val+o.val);
	}

	sub(o: IntValue): IntValue {
		return new IntValue(this.val-o.val);
	}

	mul(o: IntValue): IntValue {
		// we can't just multiply these numbers because we will lose precision on lower digits.
		// As a demo, run the following JS:
		//
		//	a=1000000001;
		//
		//	a*a
		//	//evaulates to 100000002000000000
		//
		//	But clearly this is wrong because an odd number times an odd number should be odd.
		//
		//	This is a problem because we need to keep track of all 18 digits at the same time,
		//	which double-precision floating point variables can't do. The solution used here
		//	is to evaluate a*b in the runtime O(log2(b)): we will precompute all a*2^x, and then can
		//	handle the multiplication with just log additions

		let a=this.val;
		let b=o.val;
		if (b<0) {
			a*=-1;
			b*=-1;
		}

		//now b is nonnegative
		let res=0;
		let toAdd=a;
		while (b!==0) {
			if (b%2!==0) {
				res=this.normalize(res+toAdd);
			}
			b=Math.trunc(b/2);
			toAdd=this.normalize(toAdd*2);
		}
		return new IntValue(res);
	}

	div(o: IntValue): IntValue {
		//ignore divide by zeros
		if (o.val===0)
			return this;
		return new IntValue(Math.trunc(this.val/o.val));
	}

	mod(o: IntValue): IntValue {
		if (o.val===0)
			return new IntValue(0);
		return new IntValue(this.val%o.val);
	}
	
	equals(o: IntValue): boolean {
		return this.val===o.val;
	}

	greaterThan(o: IntValue): boolean {
		return this.val>o.val;
	}

	lessThan(o: IntValue): boolean {
		return this.val<o.val;
	}

	abs(): IntValue {
		return new IntValue(Math.abs(this.val));
	}

	maxWith(o: IntValue): IntValue {
		return new IntValue(Math.max(this.val, o.val));
	}

	minWith(o: IntValue): IntValue {
		return new IntValue(Math.min(this.val, o.val));
	}

	toDoubleValue(): DoubleValue {
		return new DoubleValue(this.val);
	}

	normalize(input: number):number {
		//validate that this number is in the range [-2^31, 2^31), and put it in there if it isn't
		const minValue=-(2**31), maxValue=-minValue-1;
		const modSize=2**32;
		let x=input%modSize;

		//these should each run at most once since the numbers stay small in intermediate calculations
		while (x<minValue) {
			x+=modSize;
		}
		while (x>maxValue) {
			x-=modSize;
		}
		return x;
	}

}

export default IntValue;
