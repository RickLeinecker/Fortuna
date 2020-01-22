(function avoid_caching() {
	delete require.cache[module.id];
})();

if(!global._babelPolyfill)
	require('babel-polyfill');


var _load = function (calling_module) { 
	var _when = require('./dist/when').default;
	_when.calling_module = calling_module;
	return _when;
}
module.exports = {
	load: _load
};

