//@flow strict

import Value from './Value.js';

class IntVal extends Value {
	val: number;

	constructor(val: number) {
		super();
		this.val=this.normalize(val);
	}

	add(o: IntVal): IntVal {
		return new IntVal(this.val+o.val);
	}
	sub(o: IntVal): IntVal {
		return new IntVal(this.val-o.val);
	}
	mul(o: IntVal): IntVal {
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
		while (b!=0) {
			res=this.normalize(res*2);
			if (res%2!=0) {
				res=this.normalize(res+a);
			}
			b=Math.trunc(b/2);
		}
		return new IntVal(res);
	}
	div(o: IntVal): IntVal {
		//ignore divide by zeros
		if (o.val==0)
			return this;
		return new IntVal(Math.trunc(this.val/o.val));
	}
	mod(o: IntVal): IntVal {
		if (o.val==0)
			return new IntVal(0);
		return new IntVal(this.val%o.val);
	}
	
	equals(o: IntVal): boolean {
		return this.val==o.val;
	}

	normalize(input: number):number {
		//validate that this number is in the range [-2^31, 2^31), and put it in there if it isn't
		const minValue=-(2**31), maxValue=-minValue-1;
		const modSize=2**32;
		let x=input;

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

export default IntVal;
