//@flow strict

import IntValue from './IntValue.js';
import DoubleValue from './DoubleValue.js';
import {verifyDouble, defaultValueFor} from './Value.js';

class DoubleListValue {
	list: Array<DoubleValue>;

	constructor() {
		this.list=[];
	}

	setAt(index: IntValue, to:DoubleValue): void {
		if (index.val<0 || index.val>this.list.length) {
			//just ignore it
		}
		else {
			this.list[index.val]=to;
		}
	}
	
	getAt(index: IntValue): DoubleValue {
		if (index.val<0 || index.val>=this.list.length) {
			return verifyDouble(defaultValueFor('INT'));
		}
		return this.list[index.val];
	}

	sizeOf(): IntValue {
		return new IntValue(this.list.length);
	}

	append(val: DoubleValue): void {
		this.list.push(val);
	}

}

export default DoubleListValue;
