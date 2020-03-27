//@flow strict

import type { LinkType } from './LinkType.js';

// Short function that verifies linktype is being used correctly.
function verifyLink(linkName: LinkType): LinkType {
	return linkName;
}

export {verifyLink};