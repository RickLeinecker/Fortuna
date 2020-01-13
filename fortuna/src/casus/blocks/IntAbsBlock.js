//@flow strict

import UnaryOperationBlock from './UnaryOperationBlock.js';

class IntAbsBlock extends UnaryOperationBlock {

	constructor() {
		super('INT', 'INT', 'abs');
	}

}

export default IntAbsBlock;
