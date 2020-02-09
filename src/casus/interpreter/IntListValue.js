//@flow strict

import IntValue from './IntValue.js';
import {verifyInt, defaultValueFor} from './Value.js';

class IntListValue {
	list: Array<IntValue>;

	constructor() {
		this.list=[];
	}

	setAt(index: IntValue, to:IntValue): void {
		if (index.val>=0 || index.val<this.list.length) {
			this.list[index.val]=to;
		}
		//otherwise just ignore it
	}
	
	getAt(index: IntValue): IntValue {
		if (index.val<0 || index.val>=this.list.length) {
			return verifyInt(defaultValueFor('INT'));
		}
		return this.list[index.val];
	}

	sizeOf(): IntValue {
		return new IntValue(this.list.length);
	}

	append(val: IntValue): void {
		this.list.push(val);
	}

}

export default IntListValue;
