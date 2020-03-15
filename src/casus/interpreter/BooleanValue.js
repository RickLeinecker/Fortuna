//@flow strict

class BooleanValue {
	val: boolean;

	constructor(val: boolean) {
		this.val=val;
	}

	xor(o: BooleanValue): BooleanValue {
		return new BooleanValue(this.val !== o.val);
	}

	not(): BooleanValue {
		return new BooleanValue(!this.val);
	}

}

export default BooleanValue;
