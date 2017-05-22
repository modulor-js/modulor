/**
 * Ascesis router
 * @module router
 * */

import pathToRegexp from 'path-to-regexp';
import { fireEvent, walkDOM } from './ascesis';


/**
 *  @class Route
 * */
function Route(path = '*', callback = () => {}, router){
  this.path = path;
  this.router = router;

  this.callback = (result) => callback.apply(this, result.slice(1).concat(this.getParams()));
}

/**
 *  Get router instance
 *  @method
 * */
Route.prototype.getRouter = function(){
  return this.router;
}

/**
 *  @method
 *  @return {String} Relative path (global path without router base)
 * */
Route.prototype.getPath = function(){
  let router = this.getRouter();
  return router ? router.getPath() : null;
}

/**
 *  @method
 *  @return {Object} URL query parameters
 * */
Route.prototype.getParams = function(){
  let router = this.getRouter();
  return router ? router.getParams() : null;
}

/**
 *  Indicates if route matches path
 *  @method
 *  @return {Boolean}
 * */
Route.prototype.routeMatches = function(){
  let path = this.getPath();
  if(path === false){
    console.warn(`route ${this.getRouter().getRoot()}${this.path} doesn't match base`);
    return false;
  }
  let routeRegex = pathToRegexp(this.path);
  return path.match(routeRegex);
}

/**
 *  @method
 *  @return {String} Global path
 * */
Route.prototype.getGlobalPath = function(){
  return window.location.pathname;
}

/**
 *  Resolves route
 *  @method
 * */
Route.prototype.resolve = function(root){
  let result = this.routeMatches(root);
  return result ? this.callback(result) : null;
}





/**
 *  @class Router
 * */
export function Router(options = {}){
  this.options = options;

  if(options.container){
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

  this.onRouteChange = () => this.handleRouteChange();
  this.onRouterNavigated = (e) => {
    fireEvent('url-changed', window);
    e.stopPropagation(); //strange!
  };

  window.addEventListener('popstate', this.onRouteChange);
  window.addEventListener('url-changed', this.onRouteChange);
  this.container.addEventListener('router-navigated', this.onRouterNavigated);
}

/**
 *  @method
 * */
Router.prototype.handleRouteChange = function(){
  if(this.container.getAttribute('router-root')){
    try {
      this.resolve();
    } catch(e) {
      console.error(e)
    }
  }
}

/**
 *  Indicates if element is router node
 *  @method
 *  @param {HTMLElement}
 *  @return {Boolean}
 * */
Router.prototype.isRouter = function($el){
  return $el.hasAttribute('router-base') && $el.router;
}

/**
 *  @method
 *  @return {Array.<HTMLElement>} Child router nodes
 * */
Router.prototype.getChildRouters = function(){
  return walkDOM(
    this.container,
    (child) => this.isRouter(child) && child.router.rootMatches(),
    this.isRouter
  );
}

/**
 *  Resolves router
 *  @method
 * */
Router.prototype.resolve = function(){
  //down to up order
  let elements = this.getChildRouters();

  let routers = elements.map(($el) => $el.router.resolve());

  if(~routers.indexOf(false)){
    return false;
  }

  let routes = this.getRoutes().map((route) => route.resolve());

  return !~routes.indexOf(false);
}

/**
 *  @method
 *  @return {HTMLElement} Root router
 * */
Router.prototype.getRootRouter = function(){
  let $el = this.container;
  let part = [];
  do {
    if($el.hasAttribute('router-root')){
      break;
    }
    $el = $el.parentNode;
  } while($el);
  return $el;
}

/**
 *  @method
 *  @return {String} Path base
 * */
Router.prototype.getRoot = function(){
  let $el = this.container;
  let part = [];
  do {
    part.unshift($el.getAttribute('router-base') || '');
    if($el.hasAttribute('router-root')){
      break;
    }
    $el = $el.parentNode;
  } while($el);
  return part.join('').replace(/\/\//ig, '/');
}

/**
 *  @method
 *  @return {String} URL query string
 * */
Router.prototype.getQs = function(){
  return window.location.search === ''
         ? false
         : window.location.search.split('?')[1];
}

/**
 *  @method
 *  @return {Object} URL query parameters
 * */
Router.prototype.getParams = function(){
  return this.getQs()
         ? this.getQs().split('&').reduce((acc, param) => {
           let [key, value] = param.split('=');
           return Object.assign(acc, {
              [key]: value
           });
         }, {})
         : {}
}

/**
 *  Indicates if router uses hashbang
 *  @method
 *  @return {Boolean}
 * */
Router.prototype.useHash = function(){
  this.getRootRouter().hasAttribute('use-hash');
}

/**
 *  @method
 *  @return {String} Global path
 * */
Router.prototype.getGlobalPath = function(){
  return this.useHash()
         ? window.location.hash.replace(/^#/, '/')
         : window.location.pathname;
}

/**
 *  @method
 *  @return {String} Relative path (global path without router base)
 * */
Router.prototype.getPath = function(){
  let root = this.getRoot();
  let re = new RegExp(`^${root.replace(/\/$/, '')}(\/|$)`);
  let globalPath = this.getGlobalPath();
  if(!re.test(globalPath)){
    return false;
  }
  return globalPath.replace(re, '$1');
}

/**
 *  Indicates if router base matches current path
 *  @method
 *  @return {Boolean}
 * */
Router.prototype.rootMatches = function(){
  return this.getPath() !== false;
}

/**
 *  Add route
 *  @method
 *  @param {String} path Path
 *  @param {Function} callback Callback
 * */
Router.prototype.add = function(path, callback){
  if(typeof path === 'object'){
    Object.keys(path).forEach((path_item) => {
      this.add(path_item, path[path_item])
    });
    return;
  }
  let route = new Route(path, callback, this);
  this.routes.push(route);
}

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
Router.prototype.navigate = function(path, params = {}){
  if(!this.rootMatches()){
    return false;
  }
  let newPath = `${params.absolute ? '' : this.getRoot()}/${path}`.replace(/(\/{1,})/ig, '/'); //duplication with line 103. make common function `clean`
  if(this.useHash()){
    window.location.hash = newPath;
  } else {
    window.history[params.replace ? 'replaceState' : 'pushState'](null, null, newPath);
  }
  !params.silent && fireEvent('router-navigated', this.container);
}

/**
 *  Get routes
 *  @method
 *  @return {Array.<Route>}
 * */
Router.prototype.getRoutes = function(){
  return this.routes;
}

/**
 *  Mount another router on subpath of current one
 *  @method
 *  @param {String} path Path
 *  @param {Router} router Router
 * */
Router.prototype.mount = function(path, router){
  router.container.setAttribute('router-base', path);
  router.container.removeAttribute('router-root');
  this.container.appendChild(router.container);
}

/**
 *  Unmount child router
 *  @method
 *  @param {Router} router Router
 * */
Router.prototype.unmount = function(router){
  this.container.removeChild(router.container);
}

/**
 *  Destroy router
 *  @method
 * */
Router.prototype.destroy = function(){
  window.removeEventListener('popstate', this.onRouteChange);
  window.removeEventListener('url-changed', this.onRouteChange);
  this.container.removeEventListener('router-navigated', this.onRouterNavigated);
  delete this.container.router;
  this.routes = [];
}
