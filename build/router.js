'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.Router = Router;

var _pathToRegexp = require('path-to-regexp');

var _pathToRegexp2 = _interopRequireDefault(_pathToRegexp);

var _ascesis = require('./ascesis');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function Route() {
  var _this = this;

  var path = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '*';
  var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};

  this.container = document.createElement('script');
  this.container.setAttribute('path', path);

  this.container.route = this;

  this.callback = function (result) {
    return callback.apply(_this, result.slice(1).concat(_this.getParams()));
  };
}

Route.prototype.getRouter = function () {
  var $el = this.container;
  while ($el && !$el.hasAttribute('base')) {
    $el = $el.parentNode;
  }
  return ($el || {}).router;
};

Route.prototype.getPath = function () {
  var router = this.getRouter();
  return router ? router.getPath() : null;
};

Route.prototype.getParams = function () {
  var router = this.getRouter();
  return router ? router.getParams() : null;
};

Route.prototype.routeMatches = function () {
  var path = this.getPath();
  var routeRegex = (0, _pathToRegexp2.default)(this.container.getAttribute('path'));
  return path.match(routeRegex);
};

Route.prototype.getGlobalPath = function () {
  return window.location.pathname;
};

Route.prototype.resolve = function (root) {
  var result = this.routeMatches(root);
  return result ? this.callback(result) : null;
};

function Router() {
  var _this2 = this;

  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  this.options = options;
  this.container = options.container || document.createElement('script');

  this.container.router = this;

  this.container.setAttribute('base', options.base || '/');
  this.container.setAttribute('router-root', true);
  options.useHash && this.container.setAttribute('use-hash', true);

  options.routes && this.add(options.routes);

  this.onRouteChange = function () {
    return _this2.handleRouteChange();
  };
  this.onRouterNavigated = function (e) {
    (0, _ascesis.fireEvent)('url-changed', window);
    e.stopPropagation(); //strange!
  };

  window.addEventListener('popstate', this.onRouteChange);
  window.addEventListener('url-changed', this.onRouteChange);
  this.container.addEventListener('router-navigated', this.onRouterNavigated);
}

Router.prototype.handleRouteChange = function () {
  if (this.container.getAttribute('router-root')) {
    try {
      this.resolve();
    } catch (e) {
      console.error(e);
    }
  }
};

Router.prototype.getChildrenElements = function () {
  return (0, _ascesis.walkDOM)(this.container, function (child) {
    return true;
  }, function (child) {
    return child.getAttribute('base');
  }).reduce(function (acc, $el) {
    if ($el.getAttribute('base') && $el.router.rootMatches()) {
      acc.routers.push($el);
    }
    if ($el.getAttribute('path')) {
      acc.routes.push($el);
    }
    return acc;
  }, {
    routers: [],
    routes: []
  });
};

Router.prototype.resolve = function () {
  //down to up order
  var elements = this.getChildrenElements();

  var routers = elements.routers.map(function ($el) {
    return $el.router.resolve();
  });

  if (~routers.indexOf(false)) {
    return false;
  }

  var routes = this.getRoutes(elements).map(function ($el) {
    return $el.route.resolve();
  });

  return !~routes.indexOf(false);
};

Router.prototype.getRoot = function () {
  var $el = this.container;
  var part = [];
  do {
    part.unshift($el.getAttribute('base'));
    if (!!$el.getAttribute('router-root')) {
      break;
    }
    $el = $el.parentNode;
  } while ($el);
  return part.join('').replace(/\/\//ig, '/');
};

Router.prototype.getQs = function () {
  return window.location.search === '' ? false : window.location.search.split('?')[1];
};

Router.prototype.getParams = function () {
  return this.getQs() ? this.getQs().split('&').reduce(function (acc, param) {
    var _param$split = param.split('='),
        _param$split2 = _slicedToArray(_param$split, 2),
        key = _param$split2[0],
        value = _param$split2[1];

    return _extends(acc, _defineProperty({}, key, value));
  }, {}) : {};
};

Router.prototype.useHash = function () {
  this.container.hasAttribute('use-hash');
};

Router.prototype.getGlobalPath = function () {
  return this.useHash() ? window.location.hash.replace(/^#/, '/') : window.location.pathname;
};

Router.prototype.getPath = function () {
  var root = this.getRoot();
  var re = new RegExp('^' + (root === '/' ? '' : root) + '(/|$)');
  var globalPath = this.getGlobalPath();
  if (!re.test(globalPath)) {
    return false;
  }
  return globalPath.replace(re, '$1');
};

Router.prototype.rootMatches = function () {
  return this.getPath() !== false;
};

Router.prototype.add = function (path, callback) {
  var _this3 = this;

  if ((typeof path === 'undefined' ? 'undefined' : _typeof(path)) === 'object') {
    Object.keys(path).forEach(function (path_item) {
      _this3.add(path_item, path[path_item]);
    });
    return;
  }
  var route = new Route(path, callback);
  this.container.appendChild(route.container);
};

Router.prototype.navigate = function (path) {
  var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  if (!this.rootMatches()) {
    return false;
  }
  var newPath = ((params.absolute ? '' : this.getRoot()) + '/' + path).replace(/(\/{1,})/ig, '/'); //duplication with line 103. make common function `clean`
  if (this.useHash()) {
    window.location.hash = newPath;
  } else {
    window.history[params.replace ? 'replaceState' : 'pushState'](null, null, newPath);
  }
  !params.silent && (0, _ascesis.fireEvent)('router-navigated', this.container);
};

Router.prototype.getRoutes = function () {
  var childrenElements = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.getChildrenElements();

  return childrenElements.routes;
};

Router.prototype.mount = function (path, router) {
  router.container.setAttribute('base', path);
  router.container.removeAttribute('router-root');
  this.container.appendChild(router.container);
};

Router.prototype.destroy = function () {
  window.removeEventListener('popstate', this.onRouteChange);
  window.removeEventListener('url-changed', this.onRouteChange);
  this.container.removeEventListener('router-navigated', this.onRouterNavigated);
  delete this.container.router;
  this.getRoutes().forEach(function (route) {
    return route.remove();
  });
};