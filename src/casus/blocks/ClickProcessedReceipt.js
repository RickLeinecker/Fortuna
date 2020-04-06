//@flow strict

import CasusBlock from './CasusBlock.js';

// this is a temporary class used to signify that a click should
// be ingored because it was processed by a function expand/contract.
//
// This is only used in the CasusBlock.removeBlockAt dfs.

class ClickProcessedReceipt extends CasusBlock {
	constructor() {
		super('ClickProcessedReceipt');
	}
}

export default ClickProcessedReceipt;
