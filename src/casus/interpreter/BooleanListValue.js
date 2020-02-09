//@flow strict

import IntValue from './IntValue.js';
import BooleanValue from './BooleanValue.js';
import {verifyBoolean, defaultValueFor} from './Value.js';

class BooleanListValue {
	list: Array<BooleanValue>;

	constructor() {
		this.list=[];
	}

	setAt(index: IntValue, to:BooleanValue): void {
		if (index.val>=0 || index.val<this.list.length) {
			this.list[index.val]=to;
		}
		//otherwise just ignore it
	}
	
	getAt(index: IntValue): BooleanValue {
		if (index.val<0 || index.val>=this.list.length) {
			return verifyBoolean(defaultValueFor('BOOLEAN'));
		}
		return this.list[index.val];
	}

	sizeOf(): IntValue {
		return new IntValue(this.list.length);
	}

	append(val: BooleanValue): void {
		this.list.push(val);
	}

}

export default BooleanListValue;
