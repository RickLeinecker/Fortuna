//@flow strict

import BinaryOperationBlock from './BinaryOperationBlock.js';

class IntMaxBlock extends BinaryOperationBlock {

	constructor() {
		super('INT', 'INT', ',', 'max');
	}

}

export default IntMaxBlock;
