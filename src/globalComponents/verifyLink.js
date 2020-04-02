//@flow strict

import type { LinkType } from './typesAndClasses/LinkType.js';

// Short function that verifies linktype is being used correctly.
function verifyLink(linkName: LinkType): LinkType {
	return linkName;
}

export {verifyLink};