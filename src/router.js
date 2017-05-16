import pathToRegexp from 'path-to-regexp';
import { fireEvent, walkDOM } from './ascesis';


function Route(path = '*', callback = () => {}, router){
  this.path = path;
  this.router = router;

  this.callback = (result) => callback.apply(this, result.slice(1).concat(this.getParams()));
}

Route.prototype.getRouter = function(){
  return this.router;
}

Route.prototype.getPath = function(){
  let router = this.getRouter();
  return router ? router.getPath() : null;
}

Route.prototype.getParams = function(){
  let router = this.getRouter();
  return router ? router.getParams() : null;
}

Route.prototype.routeMatches = function(){
  let path = this.getPath();
  if(!path){
    console.warn(`route doesn't match base`);
    return false;
  }
  let routeRegex = pathToRegexp(this.path);
  return path.match(routeRegex);
}

Route.prototype.getGlobalPath = function(){
  return window.location.pathname;
}

Route.prototype.resolve = function(root){
  let result = this.routeMatches(root);
  return result ? this.callback(result) : null;
}





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

Router.prototype.handleRouteChange = function(){
  if(this.container.getAttribute('router-root')){
    try {
      this.resolve();
    } catch(e) {
      console.error(e)
    }
  }
}

Router.prototype.isRouter = function($el){
  return $el.getAttribute('router-base') && $el.router;
}

Router.prototype.getChildRouters = function(){
  return walkDOM(
    this.container,
    (child) => this.isRouter(child) && child.router.rootMatches(),
    this.isRouter
  );
}

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

Router.prototype.getQs = function(){
  return window.location.search === ''
         ? false
         : window.location.search.split('?')[1];
}

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

Router.prototype.useHash = function(){
  this.getRootRouter().hasAttribute('use-hash');
}

Router.prototype.getGlobalPath = function(){
  return this.useHash()
         ? window.location.hash.replace(/^#/, '/')
         : window.location.pathname;
}

Router.prototype.getPath = function(){
  let root = this.getRoot();
  let re = new RegExp(`^${root === '/' ? '' : root}(\/|$)`)
  let globalPath = this.getGlobalPath();
  if(!re.test(globalPath)){
    return false;
  }
  return globalPath.replace(re, '$1');
}

Router.prototype.rootMatches = function(){
  return this.getPath() !== false;
}

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

Router.prototype.getRoutes = function(){
  return this.routes;
}

Router.prototype.mount = function(path, router){
  router.container.setAttribute('router-base', path);
  router.container.removeAttribute('router-root');
  this.container.appendChild(router.container);
}

Router.prototype.unmount = function(router){
  this.container.removeChild(router.container);
}

Router.prototype.destroy = function(){
  window.removeEventListener('popstate', this.onRouteChange);
  window.removeEventListener('url-changed', this.onRouteChange);
  this.container.removeEventListener('router-navigated', this.onRouterNavigated);
  delete this.container.router;
  this.routes = [];
}
