import pathToRegexp from 'path-to-regexp';
import { fireEvent, walkDOM } from './ascesis';


function Route(path = '*', callback = () => {}){
  this.container = document.createElement('script');
  this.container.setAttribute('path', path);

  this.container.route = this;

  this.callback = (result) => callback.apply(this, result.slice(1).concat(this.getParams()));
}

Route.prototype.getRouter = function(){
  let $el = this.container;
  while($el && !$el.hasAttribute('base')){
    $el = $el.parentNode;
  }
  return ($el || {}).router;
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
  let routeRegex = pathToRegexp(this.container.getAttribute('path'));
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
  this.container = options.container || document.createElement('script');

  this.container.router = this;

  this.container.setAttribute('base', options.base || '/');
  this.container.setAttribute('router-root', true);
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

Router.prototype.getChildrenElements = function(){
  return walkDOM(
    this.container,
    (child) => true,
    (child) => child.getAttribute('base')
  ).reduce((acc, $el) => {
    if($el.getAttribute('base') && $el.router && $el.router.rootMatches()){
      acc.routers.push($el);
    }
    if($el.getAttribute('path')){
      acc.routes.push($el);
    }
    return acc;
  }, {
    routers: [],
    routes: []
  });
}

Router.prototype.resolve = function(){
  //down to up order
  let elements = this.getChildrenElements();

  let routers = elements.routers.map(($el) => $el.router.resolve());

  if(~routers.indexOf(false)){
    return false;
  }

  let routes = this.getRoutes(elements).map(($el) => $el.route.resolve());

  return !~routes.indexOf(false);
}

Router.prototype.getRoot = function(){
  let $el = this.container;
  let part = [];
  do {
    part.unshift($el.getAttribute('base'))
    if(!!$el.getAttribute('router-root')){
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
  this.container.hasAttribute('use-hash');
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
  let route = new Route(path, callback);
  this.container.appendChild(route.container);
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

Router.prototype.getRoutes = function(childrenElements = this.getChildrenElements()){
  return childrenElements.routes;
}

Router.prototype.mount = function(path, router){
  router.container.setAttribute('base', path);
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
  this.getRoutes().forEach((route) => route.remove());
  this.container.remove();
}
