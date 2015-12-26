this["firenze"] = this["firenze"] || {}; this["firenze"]["TimestampBehavior"] =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/* eslint-disable new-cap */

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _firenze = __webpack_require__(1);

	var _firenze2 = _interopRequireDefault(_firenze);

	var _moment = __webpack_require__(2);

	var _moment2 = _interopRequireDefault(_moment);

	var Behavior = _firenze2['default'].Behavior;
	var P = _firenze2['default'].Promise;

	// ## What it does
	//
	// When saving a new model, it will automatically populate timestamp as value on speficied field(s).
	//
	// For example, when saving a post:
	//
	// ```js
	// var posts = new Posts();
	// var post = posts.model({
	//   title: 'Hello World'
	// });
	//
	// post.save().then(function (model) {
	//   var created = model.get('created'); // `2015-01-01 12:00:00`
	// });
	// ```
	//
	// It will automatically save the value of current timestamp in `created` field.
	//
	// ## Usage
	//
	// ### Node.js
	//
	// With [npm](https://npmjs.com):
	//
	// ```
	// $ npm install --save firenze-behavior-timestamp
	// ```
	//
	// Now you can require it as follows:
	//
	// ```js
	// var TimestampBehavior = require('firenze-behavior-timestamp');
	//
	// // create your Database instance...
	//
	// db.createCollection({
	//   behaviors: [
	//     {
	//       'class': TimestampBehavior,
	//       options: {
	//         created: {
	//           on: 'create'                  // 'create', 'update', or 'always'
	//           format: 'YYYY-MM-DD HH:mm:ss' // 'object' for Date object, or moment.js format
	//         }
	//       }
	//     }
	//   ]
	// });
	// ```
	//
	// ### Browser
	//
	// Or [Bower](http://bower.io):
	//
	// ```
	// $ bower installl --save firenze-behavior-timestamp
	// ```
	//
	// Can be loaded in your HTML page as follows:
	//
	// ```js
	// <script src="bower_components/firenze/dist/firenze.full.min.js"></script>
	// <script src="bower_components/moment/min/moment.min.js"></script>
	// <script src="bower_components/firenze-behavior-timestamp/dist/firenze-behavior-timestamp.min.js"></script>
	//
	// <script>
	//   // Timestamp behavior is available in `firenze.TimestampBehavior`
	// </script>
	// ```
	//

	var Timestamp = (function (_Behavior) {
	  _inherits(Timestamp, _Behavior);

	  function Timestamp() {
	    _classCallCheck(this, Timestamp);

	    _get(Object.getPrototypeOf(Timestamp.prototype), 'constructor', this).apply(this, arguments);
	  }

	  _createClass(Timestamp, [{
	    key: 'beforeSave',
	    value: function beforeSave(model) {
	      var allowedOn = ['create', 'update', 'always'];
	      var defaultOn = 'always';

	      var isNew = model.isNew();
	      for (var field in this.options) {
	        var fieldOptions = this.options[field];

	        var on = undefined;
	        if (typeof fieldOptions.on === 'undefined' || allowedOn.indexOf(fieldOptions.on)) {
	          on = defaultOn;
	        } else {
	          on = fieldOptions.on;
	        }

	        if (!isNew && on === 'create') {
	          continue;
	        }

	        var format = 'YYYY-MM-DD HH:mm:ss';
	        if (typeof fieldOptions.format !== 'undefined' && fieldOptions.format === 'object') {
	          format = fieldOptions.format;
	        }

	        if (format === 'object') {
	          model.set(field, new Date());
	          continue;
	        }

	        model.set(field, (0, _moment2['default'])().format(format));
	      }

	      return new P.resolve(true);
	    }
	  }]);

	  return Timestamp;
	})(Behavior);

	exports['default'] = Timestamp;
	module.exports = exports['default'];

/***/ },
/* 1 */
/***/ function(module, exports) {

	(function() { module.exports = this["firenze"]; }());

/***/ },
/* 2 */
/***/ function(module, exports) {

	(function() { module.exports = this["moment"]; }());

/***/ }
/******/ ]);