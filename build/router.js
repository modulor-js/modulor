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

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _ascesis = __webpack_require__(1);

	var _pathToRegexp = __webpack_require__(2);

	var _pathToRegexp2 = _interopRequireDefault(_pathToRegexp);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var default_options = {
	  root: '',
	  routes: {}
	};

	var Router = function () {
	  _createClass(Router, [{
	    key: 'root',
	    get: function get() {
	      return this._root || this.options.root;
	    },
	    set: function set(value) {
	      this._root = value;
	    }
	  }, {
	    key: 'prev_path',
	    get: function get() {
	      return this._prev_path;
	    },
	    set: function set(value) {
	      this._prev_path = value;
	    }
	  }, {
	    key: 'prev_qs',
	    get: function get() {
	      return this._prev_qs;
	    },
	    set: function set(value) {
	      this._prev_qs = value;
	    }
	  }, {
	    key: 'qs',
	    get: function get() {
	      return this.container.location.search === '' ? false : this.container.location.search.split('?')[1];
	    }
	  }, {
	    key: 'global_path',
	    get: function get() {
	      return this.container.location.pathname;
	    }
	  }, {
	    key: 'path',
	    get: function get() {
	      return this.root_matches ? this.global_path.replace(this.root, '') : false;
	    }
	  }, {
	    key: 'root_matches',
	    get: function get() {
	      return new RegExp('^' + this.root + '(/|$)').test(this.global_path);
	    }
	  }, {
	    key: 'params',
	    get: function get() {
	      return this.qs ? this.qs.split('&').reduce(function (acc, param) {
	        var _param$split = param.split('='),
	            _param$split2 = _slicedToArray(_param$split, 2),
	            key = _param$split2[0],
	            value = _param$split2[1];

	        return _extends(acc, _defineProperty({}, key, value));
	      }, {}) : {};
	    }
	  }]);

	  function Router() {
	    var _this = this;

	    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	    var container = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : window;

	    _classCallCheck(this, Router);

	    this.options = _extends({}, default_options, options);
	    this.listeners = [];
	    this.subrouters = [];
	    this.container = container;

	    Object.keys(this.options.routes).forEach(function (route) {
	      //add function should handle this
	      _this.add(route, _this.options.routes[route]);
	    });

	    this.container.addEventListener('popstate', function () {
	      return _this.resolve();
	    });
	    this.container.addEventListener('url-changed', function () {
	      return _this.resolve();
	    });
	  }

	  _createClass(Router, [{
	    key: 'add',
	    value: function add() {
	      var route = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : /(.*)/;
	      var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};

	      this.listeners.push({ route: (0, _pathToRegexp2.default)(route, []), callback: callback });
	    }
	  }, {
	    key: 'notify_listeners',
	    value: function notify_listeners() {
	      var _this2 = this;

	      this.listeners.forEach(function (_ref) {
	        var route = _ref.route,
	            callback = _ref.callback;

	        var match = _this2.path.match(route);
	        if (match) {
	          //first argument should not be here
	          callback.apply(_this2, match.concat(_this2.params));
	        }
	      });
	    }
	  }, {
	    key: 'trigger',
	    value: function trigger() {
	      (0, _ascesis.fireEvent)('url-changed', this.container);
	    }
	  }, {
	    key: 'resolve',
	    value: function resolve() {
	      if (!this.root_matches || this.prev_path === this.path && this.prev_qs === this.qs) {
	        return false;
	      }
	      //do not notify own listeners if subrouter matches root
	      if (this.subrouters.length) {
	        var _iteratorNormalCompletion = true;
	        var _didIteratorError = false;
	        var _iteratorError = undefined;

	        try {
	          for (var _iterator = this.subrouters[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	            var subrouter = _step.value;

	            if (subrouter.root_matches && subrouter.prevent) {
	              return false;
	            }
	          }
	        } catch (err) {
	          _didIteratorError = true;
	          _iteratorError = err;
	        } finally {
	          try {
	            if (!_iteratorNormalCompletion && _iterator.return) {
	              _iterator.return();
	            }
	          } finally {
	            if (_didIteratorError) {
	              throw _iteratorError;
	            }
	          }
	        }
	      }
	      this.prev_path = this.path;
	      this.prev_qs = this.qs;
	      this.notify_listeners();
	    }
	  }, {
	    key: 'navigate',
	    value: function navigate(path) {
	      var absolute = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
	      var replace = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
	      var silent = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;


	      var full_prev_path = [this.path].concat(this.qs || []).join('?');
	      if (!absolute && (!this.root_matches || path === full_prev_path)) {
	        return false;
	      }

	      var full_prev_global_path = [this.global_path].concat(this.qs || []).join('?');
	      if (absolute && path === full_prev_global_path) {
	        return false;
	      }

	      var _path = absolute ? path : this.root + path;
	      history[replace ? 'replaceState' : 'pushState'](null, null, _path);
	      !silent && this.trigger('url-changed');
	    }
	  }, {
	    key: 'destroy',
	    value: function destroy() {
	      var _this3 = this;

	      this.listeners = [];
	      this.container.removeEventListener('popstate', function () {
	        return _this3.resolve();
	      });
	      this.container.removeEventListener('url-changed', function () {
	        return _this3.resolve();
	      });
	    }
	  }, {
	    key: 'mount',
	    value: function mount(path, router) {
	      var prevent = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

	      router.root = this.root + path;
	      router.prevent = prevent;
	      this.subrouters.push(router);
	    }
	  }]);

	  return Router;
	}();

	exports.default = Router;

/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	exports.fireEvent = fireEvent;
	exports.extend = extend;

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	function fireEvent(eventName, target, eventData) {
	  target = target || document.body;
	  var event;
	  if (window.Event) {
	    event = new Event(eventName, { "bubbles": true, "cancelable": true });
	  } else {
	    event = document.createEvent('Event');
	    event.initEvent(eventName, true, true);
	  }
	  event.eventData = eventData || null;
	  target.dispatchEvent(event);
	}

	var ChildComponents = function (_Array) {
	  _inherits(ChildComponents, _Array);

	  function ChildComponents() {
	    _classCallCheck(this, ChildComponents);

	    var _this = _possibleConstructorReturn(this, (ChildComponents.__proto__ || Object.getPrototypeOf(ChildComponents)).call(this));

	    _this.querySelector = function (selector) {
	      for (var index = 0; index < _this.length; index++) {
	        if (_this[index].matches(selector)) {
	          return _this[index];
	        }
	      }
	      return null;
	    };
	    _this.querySelectorAll = function (selector) {
	      var output = [];
	      for (var index = 0; index < _this.length; index++) {
	        _this[index].matches(selector) && output.push(_this[index]);
	      }
	      return output;
	    };
	    return _this;
	  }

	  return ChildComponents;
	}(Array);

	var BaseController = exports.BaseController = function (_extend) {
	  _inherits(BaseController, _extend);

	  function BaseController() {
	    _classCallCheck(this, BaseController);

	    return _possibleConstructorReturn(this, (BaseController.__proto__ || Object.getPrototypeOf(BaseController)).apply(this, arguments));
	  }

	  _createClass(BaseController, [{
	    key: "componentType",
	    get: function get() {
	      return 'controller';
	    }
	  }]);

	  return BaseController;
	}(extend(HTMLElement));

	var BaseComponent = exports.BaseComponent = function (_extend2) {
	  _inherits(BaseComponent, _extend2);

	  function BaseComponent() {
	    _classCallCheck(this, BaseComponent);

	    return _possibleConstructorReturn(this, (BaseComponent.__proto__ || Object.getPrototypeOf(BaseComponent)).apply(this, arguments));
	  }

	  _createClass(BaseComponent, [{
	    key: "componentType",
	    get: function get() {
	      return 'component';
	    }
	  }]);

	  return BaseComponent;
	}(extend(HTMLElement));

	function extend(baseClass) {
	  return function (_baseClass) {
	    _inherits(_class, _baseClass);

	    function _class() {
	      _classCallCheck(this, _class);

	      return _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this));
	    }

	    _createClass(_class, [{
	      key: "toggleHighlight",
	      value: function toggleHighlight() {
	        this.classList.toggle(this.componentType + '-highlighted');
	      }
	    }, {
	      key: "toggleHighlightAll",
	      value: function toggleHighlightAll() {
	        this.toggleHighlight();
	        this.childComponents.forEach(function (child) {
	          child.toggleHighlightAll();
	        });
	      }
	    }, {
	      key: "removeChildComponent",
	      value: function removeChildComponent(childComponent) {
	        var index = this.childComponents.indexOf(childComponent);
	        this.childComponents.splice(index, 1);
	      }
	    }, {
	      key: "trigger",
	      value: function trigger(eventName, eventData) {
	        fireEvent(eventName, this, eventData);
	      }
	    }, {
	      key: "html",
	      value: function html(html_string) {
	        var fragment = document.createDocumentFragment();
	        var temp_container = document.createElement('div');
	        temp_container.innerHTML = html_string;
	        while (temp_container.firstChild) {
	          fragment.appendChild(temp_container.firstChild);
	        }
	        this.innerHTML = "";
	        this.appendChild(fragment);
	      }
	    }, {
	      key: "addDisconnectListener",
	      value: function addDisconnectListener(callback) {
	        this.disconnectListeners.push(callback);
	      }
	    }, {
	      key: "connectedCallback",
	      value: function connectedCallback() {
	        var _this5 = this;

	        this.disconnectListeners = [];
	        this.childComponents = new ChildComponents();
	        this.trigger('component-attached');
	        this.addEventListener('component-attached', function (event) {
	          event.stopPropagation();
	          event.target.parentComponent = _this5;
	          _this5.childComponents.push(event.target);
	          event.target.addDisconnectListener(function (target) {
	            _this5.removeChildComponent(target);
	          });
	        });
	        _get(_class.prototype.__proto__ || Object.getPrototypeOf(_class.prototype), "connectedCallback", this) && _get(_class.prototype.__proto__ || Object.getPrototypeOf(_class.prototype), "connectedCallback", this).call(this);
	      }
	    }, {
	      key: "disconnectedCallback",
	      value: function disconnectedCallback() {
	        var _this6 = this;

	        this.disconnectListeners.forEach(function (listener) {
	          listener(_this6);
	        });
	        _get(_class.prototype.__proto__ || Object.getPrototypeOf(_class.prototype), "disconnectedCallback", this) && _get(_class.prototype.__proto__ || Object.getPrototypeOf(_class.prototype), "disconnectedCallback", this).call(this);
	      }
	    }, {
	      key: "attributeChangedCallback",
	      value: function attributeChangedCallback() {}
	    }]);

	    return _class;
	  }(baseClass);
	}

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var isarray = __webpack_require__(3)

	/**
	 * Expose `pathToRegexp`.
	 */
	module.exports = pathToRegexp
	module.exports.parse = parse
	module.exports.compile = compile
	module.exports.tokensToFunction = tokensToFunction
	module.exports.tokensToRegExp = tokensToRegExp

	/**
	 * The main path matching regexp utility.
	 *
	 * @type {RegExp}
	 */
	var PATH_REGEXP = new RegExp([
	  // Match escaped characters that would otherwise appear in future matches.
	  // This allows the user to escape special characters that won't transform.
	  '(\\\\.)',
	  // Match Express-style parameters and un-named parameters with a prefix
	  // and optional suffixes. Matches appear as:
	  //
	  // "/:test(\\d+)?" => ["/", "test", "\d+", undefined, "?", undefined]
	  // "/route(\\d+)"  => [undefined, undefined, undefined, "\d+", undefined, undefined]
	  // "/*"            => ["/", undefined, undefined, undefined, undefined, "*"]
	  '([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?|(\\*))'
	].join('|'), 'g')

	/**
	 * Parse a string for the raw tokens.
	 *
	 * @param  {string}  str
	 * @param  {Object=} options
	 * @return {!Array}
	 */
	function parse (str, options) {
	  var tokens = []
	  var key = 0
	  var index = 0
	  var path = ''
	  var defaultDelimiter = options && options.delimiter || '/'
	  var res

	  while ((res = PATH_REGEXP.exec(str)) != null) {
	    var m = res[0]
	    var escaped = res[1]
	    var offset = res.index
	    path += str.slice(index, offset)
	    index = offset + m.length

	    // Ignore already escaped sequences.
	    if (escaped) {
	      path += escaped[1]
	      continue
	    }

	    var next = str[index]
	    var prefix = res[2]
	    var name = res[3]
	    var capture = res[4]
	    var group = res[5]
	    var modifier = res[6]
	    var asterisk = res[7]

	    // Push the current path onto the tokens.
	    if (path) {
	      tokens.push(path)
	      path = ''
	    }

	    var partial = prefix != null && next != null && next !== prefix
	    var repeat = modifier === '+' || modifier === '*'
	    var optional = modifier === '?' || modifier === '*'
	    var delimiter = res[2] || defaultDelimiter
	    var pattern = capture || group

	    tokens.push({
	      name: name || key++,
	      prefix: prefix || '',
	      delimiter: delimiter,
	      optional: optional,
	      repeat: repeat,
	      partial: partial,
	      asterisk: !!asterisk,
	      pattern: pattern ? escapeGroup(pattern) : (asterisk ? '.*' : '[^' + escapeString(delimiter) + ']+?')
	    })
	  }

	  // Match any characters still remaining.
	  if (index < str.length) {
	    path += str.substr(index)
	  }

	  // If the path exists, push it onto the end.
	  if (path) {
	    tokens.push(path)
	  }

	  return tokens
	}

	/**
	 * Compile a string to a template function for the path.
	 *
	 * @param  {string}             str
	 * @param  {Object=}            options
	 * @return {!function(Object=, Object=)}
	 */
	function compile (str, options) {
	  return tokensToFunction(parse(str, options))
	}

	/**
	 * Prettier encoding of URI path segments.
	 *
	 * @param  {string}
	 * @return {string}
	 */
	function encodeURIComponentPretty (str) {
	  return encodeURI(str).replace(/[\/?#]/g, function (c) {
	    return '%' + c.charCodeAt(0).toString(16).toUpperCase()
	  })
	}

	/**
	 * Encode the asterisk parameter. Similar to `pretty`, but allows slashes.
	 *
	 * @param  {string}
	 * @return {string}
	 */
	function encodeAsterisk (str) {
	  return encodeURI(str).replace(/[?#]/g, function (c) {
	    return '%' + c.charCodeAt(0).toString(16).toUpperCase()
	  })
	}

	/**
	 * Expose a method for transforming tokens into the path function.
	 */
	function tokensToFunction (tokens) {
	  // Compile all the tokens into regexps.
	  var matches = new Array(tokens.length)

	  // Compile all the patterns before compilation.
	  for (var i = 0; i < tokens.length; i++) {
	    if (typeof tokens[i] === 'object') {
	      matches[i] = new RegExp('^(?:' + tokens[i].pattern + ')$')
	    }
	  }

	  return function (obj, opts) {
	    var path = ''
	    var data = obj || {}
	    var options = opts || {}
	    var encode = options.pretty ? encodeURIComponentPretty : encodeURIComponent

	    for (var i = 0; i < tokens.length; i++) {
	      var token = tokens[i]

	      if (typeof token === 'string') {
	        path += token

	        continue
	      }

	      var value = data[token.name]
	      var segment

	      if (value == null) {
	        if (token.optional) {
	          // Prepend partial segment prefixes.
	          if (token.partial) {
	            path += token.prefix
	          }

	          continue
	        } else {
	          throw new TypeError('Expected "' + token.name + '" to be defined')
	        }
	      }

	      if (isarray(value)) {
	        if (!token.repeat) {
	          throw new TypeError('Expected "' + token.name + '" to not repeat, but received `' + JSON.stringify(value) + '`')
	        }

	        if (value.length === 0) {
	          if (token.optional) {
	            continue
	          } else {
	            throw new TypeError('Expected "' + token.name + '" to not be empty')
	          }
	        }

	        for (var j = 0; j < value.length; j++) {
	          segment = encode(value[j])

	          if (!matches[i].test(segment)) {
	            throw new TypeError('Expected all "' + token.name + '" to match "' + token.pattern + '", but received `' + JSON.stringify(segment) + '`')
	          }

	          path += (j === 0 ? token.prefix : token.delimiter) + segment
	        }

	        continue
	      }

	      segment = token.asterisk ? encodeAsterisk(value) : encode(value)

	      if (!matches[i].test(segment)) {
	        throw new TypeError('Expected "' + token.name + '" to match "' + token.pattern + '", but received "' + segment + '"')
	      }

	      path += token.prefix + segment
	    }

	    return path
	  }
	}

	/**
	 * Escape a regular expression string.
	 *
	 * @param  {string} str
	 * @return {string}
	 */
	function escapeString (str) {
	  return str.replace(/([.+*?=^!:${}()[\]|\/\\])/g, '\\$1')
	}

	/**
	 * Escape the capturing group by escaping special characters and meaning.
	 *
	 * @param  {string} group
	 * @return {string}
	 */
	function escapeGroup (group) {
	  return group.replace(/([=!:$\/()])/g, '\\$1')
	}

	/**
	 * Attach the keys as a property of the regexp.
	 *
	 * @param  {!RegExp} re
	 * @param  {Array}   keys
	 * @return {!RegExp}
	 */
	function attachKeys (re, keys) {
	  re.keys = keys
	  return re
	}

	/**
	 * Get the flags for a regexp from the options.
	 *
	 * @param  {Object} options
	 * @return {string}
	 */
	function flags (options) {
	  return options.sensitive ? '' : 'i'
	}

	/**
	 * Pull out keys from a regexp.
	 *
	 * @param  {!RegExp} path
	 * @param  {!Array}  keys
	 * @return {!RegExp}
	 */
	function regexpToRegexp (path, keys) {
	  // Use a negative lookahead to match only capturing groups.
	  var groups = path.source.match(/\((?!\?)/g)

	  if (groups) {
	    for (var i = 0; i < groups.length; i++) {
	      keys.push({
	        name: i,
	        prefix: null,
	        delimiter: null,
	        optional: false,
	        repeat: false,
	        partial: false,
	        asterisk: false,
	        pattern: null
	      })
	    }
	  }

	  return attachKeys(path, keys)
	}

	/**
	 * Transform an array into a regexp.
	 *
	 * @param  {!Array}  path
	 * @param  {Array}   keys
	 * @param  {!Object} options
	 * @return {!RegExp}
	 */
	function arrayToRegexp (path, keys, options) {
	  var parts = []

	  for (var i = 0; i < path.length; i++) {
	    parts.push(pathToRegexp(path[i], keys, options).source)
	  }

	  var regexp = new RegExp('(?:' + parts.join('|') + ')', flags(options))

	  return attachKeys(regexp, keys)
	}

	/**
	 * Create a path regexp from string input.
	 *
	 * @param  {string}  path
	 * @param  {!Array}  keys
	 * @param  {!Object} options
	 * @return {!RegExp}
	 */
	function stringToRegexp (path, keys, options) {
	  return tokensToRegExp(parse(path, options), keys, options)
	}

	/**
	 * Expose a function for taking tokens and returning a RegExp.
	 *
	 * @param  {!Array}          tokens
	 * @param  {(Array|Object)=} keys
	 * @param  {Object=}         options
	 * @return {!RegExp}
	 */
	function tokensToRegExp (tokens, keys, options) {
	  if (!isarray(keys)) {
	    options = /** @type {!Object} */ (keys || options)
	    keys = []
	  }

	  options = options || {}

	  var strict = options.strict
	  var end = options.end !== false
	  var route = ''

	  // Iterate over the tokens and create our regexp string.
	  for (var i = 0; i < tokens.length; i++) {
	    var token = tokens[i]

	    if (typeof token === 'string') {
	      route += escapeString(token)
	    } else {
	      var prefix = escapeString(token.prefix)
	      var capture = '(?:' + token.pattern + ')'

	      keys.push(token)

	      if (token.repeat) {
	        capture += '(?:' + prefix + capture + ')*'
	      }

	      if (token.optional) {
	        if (!token.partial) {
	          capture = '(?:' + prefix + '(' + capture + '))?'
	        } else {
	          capture = prefix + '(' + capture + ')?'
	        }
	      } else {
	        capture = prefix + '(' + capture + ')'
	      }

	      route += capture
	    }
	  }

	  var delimiter = escapeString(options.delimiter || '/')
	  var endsWithDelimiter = route.slice(-delimiter.length) === delimiter

	  // In non-strict mode we allow a slash at the end of match. If the path to
	  // match already ends with a slash, we remove it for consistency. The slash
	  // is valid at the end of a path match, not in the middle. This is important
	  // in non-ending mode, where "/test/" shouldn't match "/test//route".
	  if (!strict) {
	    route = (endsWithDelimiter ? route.slice(0, -delimiter.length) : route) + '(?:' + delimiter + '(?=$))?'
	  }

	  if (end) {
	    route += '$'
	  } else {
	    // In non-ending mode, we need the capturing groups to match as much as
	    // possible by using a positive lookahead to the end or next path segment.
	    route += strict && endsWithDelimiter ? '' : '(?=' + delimiter + '|$)'
	  }

	  return attachKeys(new RegExp('^' + route, flags(options)), keys)
	}

	/**
	 * Normalize the given path string, returning a regular expression.
	 *
	 * An empty array can be passed in for the keys, which will hold the
	 * placeholder key descriptions. For example, using `/user/:id`, `keys` will
	 * contain `[{ name: 'id', delimiter: '/', optional: false, repeat: false }]`.
	 *
	 * @param  {(string|RegExp|Array)} path
	 * @param  {(Array|Object)=}       keys
	 * @param  {Object=}               options
	 * @return {!RegExp}
	 */
	function pathToRegexp (path, keys, options) {
	  if (!isarray(keys)) {
	    options = /** @type {!Object} */ (keys || options)
	    keys = []
	  }

	  options = options || {}

	  if (path instanceof RegExp) {
	    return regexpToRegexp(path, /** @type {!Array} */ (keys))
	  }

	  if (isarray(path)) {
	    return arrayToRegexp(/** @type {!Array} */ (path), /** @type {!Array} */ (keys), options)
	  }

	  return stringToRegexp(/** @type {string} */ (path), /** @type {!Array} */ (keys), options)
	}


/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = Array.isArray || function (arr) {
	  return Object.prototype.toString.call(arr) == '[object Array]';
	};


/***/ }
/******/ ]);