/**
 *	Console styles
 */

var util = require('util');

// See inspect in https://github.com/joyent/node/blob/master/lib/util.js
// See http://en.wikipedia.org/wiki/ANSI_colors#Colors
var styleDefinitions = {
	bold: [1,22],
	italic: [3,23],
	underline: [4,24],
	inverse: [7,27],
	strikethough: [9,29],
	white: [37,39],
	black: [30,39],
	blue: [34,39],
	cyan: [36,39],
	green: [32,39],
	magenta: [35,39],
	red: [31,39],
	yellow: [33,39],
	whiteBG: [47,49],
	blackBG: [40,49],
	blueBG: [44,49],
	cyanBG: [46,49],
	greenBG: [42,49],
	magentaBG: [45,49],
	redBG: [41,49],
	yellowBG: [43,49]
};

function getStartStyle(name) {
	return styleDefinitions[name][0];
}

function getEndStyle(name) {
	return styleDefinitions[name][1];
}

function style( str, styles ) {
	return	'\u001b[' + styles.map(getStartStyle).join(';') + 'm' +
			str +
			'\u001b[' + styles.map(getEndStyle).join(';') + 'm';
}

function StyleConsole() {}

// This just exists so the prototype can be copied
var styleConsole;

for ( var i in styleDefinitions ) {

	/* jshint -W083 */
	( function(name) {
		
		var getter = function() {
			
			// List of previous added styles
			var styles = this._styles || [];

			// Will apply the styles to the string
			var styler = function() {
				return style( util.format.apply(this, arguments), styles );
			};

			Object.defineProperty( styler, '_styles', {
				value: styles
			} );

			// Add the new style in the getter
			styles.push(name);

			// Copy style name properties across
			// This is seriously weird and is not a pattern that should be repeated
			if ( Object.setPrototypeOf ) {
				Object.setPrototypeOf( styler, Object.getPrototypeOf(styleConsole) );
			} else {
				styler.__proto__ = Object.getPrototypeOf(styleConsole);
			}
			
			return styler;
		};

		Object.defineProperty( StyleConsole.prototype, name, {
			enumerable: true,
			get: getter
		} );

		Object.defineProperty( style, name, {
			enumerable: true,
			get: getter
		} );

	}(i) );
	/* jshint +W083 */

}

styleConsole = new StyleConsole();

module.exports = style;