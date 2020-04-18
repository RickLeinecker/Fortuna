//@flow strict

// Converts camel case to title case.
function toTitleCase(str: string): string {
	let newStr = str.replace( /([A-Z])/g, " $1");
	return newStr.charAt(0).toUpperCase() + newStr.slice(1);
}

export {toTitleCase};