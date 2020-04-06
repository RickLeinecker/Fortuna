//@flow strict

import CasusBlock from './blocks/CasusBlock.js';
import reviveCasusBlock from './reviveCasusBlock.js';

// Creates a deep clone of this object.
// This is helpful for copy-pasting purposes, for example
function casusBlockDeepClone(toClone: CasusBlock): CasusBlock {
	const asJSON=JSON.stringify(toClone);
	const withoutMethods=JSON.parse(asJSON);
	const revived=reviveCasusBlock(withoutMethods);
	return revived;
}

export default casusBlockDeepClone;
