'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ascesis = require('./ascesis');

var _pathToRegexp = require('path-to-regexp');

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