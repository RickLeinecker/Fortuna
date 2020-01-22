# Add colour to the console

[![npm version](https://badge.fury.io/js/console-style.svg)](http://badge.fury.io/js/console-style)

Add colours and style to the node.js console output.

## Alternatives

https://www.npmjs.org/package/colors, but it modifies `String.prototype` and is therefore wrong. 

## Intallation

```bash
$ npm install console-style
```
## Usage

```js
var style = require('console-style');

// Output bold, underlined and red text
console.log( style.bold.underline.red('Hello world') );
```

The arguments applied to the style are passed to [`util.format`](http://nodejs.org/api/util.html#util_util_format_format).  This means objects will be inspected, and placeholders can be used.

```js
// Alternative syntax
console.log( style( 'Hello world',  [ 'bold', 'underline', 'red' ] ) );
```

This syntax does not use `util.format`.

## Options

See http://en.wikipedia.org/wiki/ANSI_colors#Colors

* bold
* italic - _not widely supported_
* underline
* inverse
* strikethough - _not widely supported_
* white
* black
* blue
* cyan
* green
* magenta
* red
* yellow
* whiteBG
* blackBG
* blueBG
* cyanBG
* greenBG
* magentaBG
* redBG
* yellowBG

