'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * Ascesis router
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * @module router
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * */

exports.Router = Router;

var _pathToRegexp = require('path-to-regexp');

var _pathToRegexp2 = _interopRequireDefault(_pathToRegexp);

var _ascesis = require('./ascesis');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 *  @class Route
 * */
function Route() {
  var path = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '*';

  var _this = this;

  var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};
  var router = arguments[2];

  this.path = path;
  this.router = router;

  this.callback = function (result) {
    return callback.apply(_this, result.slice(1).concat(_this.getParams()));
  };
}

/**
 *  Get router instance
 *  @method
 * */
Route.prototype.getRouter = function () {
  return this.router;
};

/**
 *  @method
 *  @return {String} Relative path (global path without router base)
 * */
Route.prototype.getPath = function () {
  var router = this.getRouter();
  return router ? router.getPath() : null;
};

/**
 *  @method
 *  @return {Object} URL query parameters
 * */
Route.prototype.getParams = function () {
  var router = this.getRouter();
  return router ? router.getParams() : null;
};

/**
 *  Indicates if route matches path
 *  @method
 *  @return {Boolean}
 * */
Route.prototype.routeMatches = function () {
  var path = this.getPath();
  if (path === false) {
    console.warn('route ' + this.getRouter().getRoot() + this.path + ' doesn\'t match base');
    return false;
  }
  var routeRegex = (0, _pathToRegexp2.default)(this.path);
  return path.match(routeRegex);
};

/**
 *  @method
 *  @return {String} Global path
 * */
Route.prototype.getGlobalPath = function () {
  return window.location.pathname;
};

/**
 *  Resolves route
 *  @method
 * */
Route.prototype.resolve = function (root) {
  var result = this.routeMatches(root);
  return result ? this.callback(result) : null;
};

/**
 *  @class Router
 * */
function Router() {
  var _this2 = this;

  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  this.options = options;

  if (options.container) {
    this.container = options.container;
    options.isRoot && this.container.setAttribute('router-root', true);
    options.base && this.container.setAttribute('router-base', options.base);
  } else {
    this.container = document.createElement('script');
    this.container.setAttribute('router-base', options.base || '/');
    this.container.setAttribute('router-root', true);
  }

  this.routes = [];

  this.container.router = this;

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

/**
 *  @method
 * */
Router.prototype.handleRouteChange = function () {
  if (this.container.getAttribute('router-root')) {
    try {
      this.resolve();
    } catch (e) {
      console.error(e);
    }
  }
};

/**
 *  Indicates if element is router node
 *  @method
 *  @param {HTMLElement}
 *  @return {Boolean}
 * */
Router.prototype.isRouter = function ($el) {
  return $el.hasAttribute('router-base') && $el.router;
};

/**
 *  @method
 *  @return {Array.<HTMLElement>} Child router nodes
 * */
Router.prototype.getChildRouters = function () {
  var _this3 = this;

  return (0, _ascesis.walkDOM)(this.container, function (child) {
    return _this3.isRouter(child) && child.router.rootMatches();
  }, this.isRouter);
};

/**
 *  Resolves router
 *  @method
 * */
Router.prototype.resolve = function () {
  //down to up order
  var elements = this.getChildRouters();

  var routers = elements.map(function ($el) {
    return $el.router.resolve();
  });

  if (~routers.indexOf(false)) {
    return false;
  }

  var routes = this.getRoutes().map(function (route) {
    return route.resolve();
  });

  return !~routes.indexOf(false);
};

/**
 *  @method
 *  @return {HTMLElement} Root router
 * */
Router.prototype.getRootRouter = function () {
  var $el = this.container;
  var part = [];
  do {
    if ($el.hasAttribute('router-root')) {
      break;
    }
    $el = $el.parentNode;
  } while ($el);
  return $el;
};

/**
 *  @method
 *  @return {String} Path base
 * */
Router.prototype.getRoot = function () {
  var $el = this.container;
  var part = [];
  do {
    part.unshift($el.getAttribute('router-base') || '');
    if ($el.hasAttribute('router-root')) {
      break;
    }
    $el = $el.parentNode;
  } while ($el);
  return part.join('').replace(/\/\//ig, '/');
};

/**
 *  @method
 *  @return {String} URL query string
 * */
Router.prototype.getQs = function () {
  return window.location.search === '' ? false : window.location.search.split('?')[1];
};

/**
 *  @method
 *  @return {Object} URL query parameters
 * */
Router.prototype.getParams = function () {
  return this.getQs() ? this.getQs().split('&').reduce(function (acc, param) {
    var _param$split = param.split('='),
        _param$split2 = _slicedToArray(_param$split, 2),
        key = _param$split2[0],
        value = _param$split2[1];

    return _extends(acc, _defineProperty({}, decodeURIComponent(key), value ? decodeURIComponent(value) : value));
  }, {}) : {};
};

/**
 *  Set new query parameters. Leave only provided parameters in query string
 *  @method
 *  @param {Object} queryParams URL query parameters
 *  @param {NavigationParams} navigationParams Navigation params
 * */
Router.prototype.setParams = function (queryParams) {
  var navigationParams = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var paramsString = Object.keys(queryParams).map(function (key) {
    return [encodeURIComponent(key), encodeURIComponent(queryParams[key])].join('=');
  }).join('&');
  return this.navigate('?' + paramsString, navigationParams);
};

/**
 *  Update query parameters. Overwrite if param exists, add if not
 *  @method
 *  @param {Object} queryParams URL query parameters
 *  @param {NavigationParams} navigationParams Navigation params
 * */
Router.prototype.updateParams = function (queryParams) {
  var navigationParams = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  return this.setParams(_extends({}, this.getParams(), queryParams), navigationParams);
};

/**
 *  Indicates if router uses hashbang
 *  @method
 *  @return {Boolean}
 * */
Router.prototype.useHash = function () {
  this.getRootRouter().hasAttribute('use-hash');
};

/**
 *  @method
 *  @return {String} Global path
 * */
Router.prototype.getGlobalPath = function () {
  return this.useHash() ? window.location.hash.replace(/^#/, '/') : window.location.pathname;
};

/**
 *  @method
 *  @return {String} Relative path (global path without router base)
 * */
Router.prototype.getPath = function () {
  var root = this.getRoot();
  var re = new RegExp('^' + root.replace(/\/$/, '') + '(/|$)');
  var globalPath = this.getGlobalPath();
  if (!re.test(globalPath)) {
    return false;
  }
  return globalPath.replace(re, '$1');
};

/**
 *  Indicates if router base matches current path
 *  @method
 *  @return {Boolean}
 * */
Router.prototype.rootMatches = function () {
  return this.getPath() !== false;
};

/**
 *  Add route
 *  @method
 *  @param {String} path Path
 *  @param {Function} callback Callback
 * */
Router.prototype.add = function (path, callback) {
  var _this4 = this;

  if ((typeof path === 'undefined' ? 'undefined' : _typeof(path)) === 'object') {
    Object.keys(path).forEach(function (path_item) {
      _this4.add(path_item, path[path_item]);
    });
    return;
  }
  var route = new Route(path, callback, this);
  this.routes.push(route);
};

/**
 *  @typedef {Object} NavigationParams
 *  @property {boolean} [absolute=false] Use absolute path instead of relative by default
 *  @property {boolean} [silent=false] Do not resolve routers after navigation
 *  @property {boolean} [replace=false] Replace history state instead of push
 * */

/**
 *  Navigate to path
 *  @method
 *  @param {String} path Path relative to router base
 *  @param {NavigationParams} params Navigation params
 * */
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

/**
 *  Get routes
 *  @method
 *  @return {Array.<Route>}
 * */
Router.prototype.getRoutes = function () {
  return this.routes;
};

/**
 *  Mount another router on subpath of current one
 *  @method
 *  @param {String} path Path
 *  @param {Router} router Router
 * */
Router.prototype.mount = function (path, router) {
  router.container.setAttribute('router-base', path);
  router.container.removeAttribute('router-root');
  this.container.appendChild(router.container);
};

/**
 *  Unmount child router
 *  @method
 *  @param {Router} router Router
 * */
Router.prototype.unmount = function (router) {
  this.container.removeChild(router.container);
};

/**
 *  Destroy router
 *  @method
 * */
Router.prototype.destroy = function () {
  window.removeEventListener('popstate', this.onRouteChange);
  window.removeEventListener('url-changed', this.onRouteChange);
  this.container.removeEventListener('router-navigated', this.onRouterNavigated);
  delete this.container.router;
  this.routes = [];
};