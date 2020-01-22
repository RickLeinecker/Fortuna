/**
 *	Tests for styleconsole
 */

var style = require('../');

console.log('Styles');
console.log('------');

console.log( style.bold('Bold') );
console.log( style.italic('Italic') );
console.log( style.underline('Underline') );
console.log( style.inverse('Inverse') );
console.log( style.strikethough('Strikethough') );

console.log('');
console.log('Text colour');
console.log('-----------');

console.log( style.white('White') );
console.log( style.black('Black') );
console.log( style.blue('Blue') );
console.log( style.cyan('Cyan') );
console.log( style.green('Green') );
console.log( style.magenta('Magenta') );
console.log( style.red('Red') );
console.log( style.yellow('Yellow') );

console.log('');
console.log('Intense text colour');
console.log('------------------');

console.log( style.bold.white('White') );
console.log( style.bold.black('Black') );
console.log( style.bold.blue('Blue') );
console.log( style.bold.cyan('Cyan') );
console.log( style.bold.green('Green') );
console.log( style.bold.magenta('Magenta') );
console.log( style.bold.red('Red') );
console.log( style.bold.yellow('Yellow') );

console.log('');
console.log('Background colour');
console.log('-----------------');

console.log( style.whiteBG('White') );
console.log( style.blackBG('Black') );
console.log( style.blueBG('Blue') );
console.log( style.cyanBG('Cyan') );
console.log( style.greenBG('Green') );
console.log( style.magentaBG('Magenta') );
console.log( style.redBG('Red') );
console.log( style.yellowBG('Yellow') );

console.log('');
console.log('Intense background color');
console.log('------------------------');

console.log( style.bold.whiteBG('White') );
console.log( style.bold.blackBG('Black') );
console.log( style.bold.blueBG('Blue') );
console.log( style.bold.cyanBG('Cyan') );
console.log( style.bold.greenBG('Green') );
console.log( style.bold.magentaBG('Magenta') );
console.log( style.bold.redBG('Red') );
console.log( style.bold.yellowBG('Yellow') );

console.log('');
console.log('Chained');
console.log('-------');
console.log( style.bold.underline.yellowBG.red.inverse('Bold, underlined, red on yellow inversed') );

console.log('');
console.log('Objects');
console.log('-------');
console.log( style.bold.underline.cyanBG.red.inverse( [1,2,3], {foo:'bar'}, new Date() ) );

console.log('');
console.log('Placeholders');
console.log('-------');
console.log( style.bold.underline.cyanBG.red.inverse( '%s:%s', 'foo', 'bar' ) );

