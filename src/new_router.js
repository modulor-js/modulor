import pathToRegexp from 'path-to-regexp';
import { fireEvent, walkDOM } from './ascesis';

var pd = require('pretty-data').pd;

function Route(path = '*', callback = () => {}){
  this.container = document.createElement('script');
  this.container.setAttribute('path', path);

  this.container.route = this;

  this.callback = (result) => callback.apply(this, result.slice(1));
}

Route.prototype.getRoot = function(){
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

Route.prototype.routeMatches = function(root = this.getRoot()){
  let globalPath = this.getGlobalPath();
  if(globalPath.indexOf(root) !== 0){
    return false;
  }
  let path = root === '/' ? globalPath : globalPath.replace(root, '');
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





function Router(options = {}){
  this.options = options;
  this.container = options.container || document.createElement('script');

  this.container.router = this;

  this.container.setAttribute('base', options.base || '/');
  this.container.setAttribute('router-root', true);

  window.addEventListener('popstate', () => {
    if(this.container.getAttribute('router-root')){
      fireEvent('url-changed', this.container);
    }
  });
  this.container.addEventListener('url-changed', () => {
    this.resolve();
  });
}

Router.prototype.resolve = function(){
  //down to up order
  let routers = walkDOM(
    this.container,
    (child) => !!child.getAttribute('base'),
    (child) => {
      //check if node matches root
      return false;
    }
  ).map(($el) => $el.router.resolve());
  if(~routers.indexOf(false)){
    return false;
  }
  let routes = walkDOM(
    this.container,
    (child) => child.getAttribute('path'),
      (child) => !!child.getAttribute('base')
  ).map(($el) => $el.route.resolve());
  return !!routes.indexOf(false);
}

Router.prototype.getRoot = function(){
  let $el = this.container;
  let part = [];
  do {
    part.unshift($el.getAttribute('base'))
    $el = $el.parentNode;
  } while($el && !!$el.getAttribute('router-root'));
  return part.join('').replace(/\/\//ig, '/');
}

Router.prototype.setRoot = () => {
}

Router.prototype.getPrevPath = () => {
}

Router.prototype.setPrevPath = () => {
}

Router.prototype.getQs = () => {
}

Router.prototype.getParams = () => {
}

Router.prototype.getGlobalPath = () => {
}

Router.prototype.getPath = () => {
}

Router.prototype.rootMatches = () => {
}

Router.prototype.add = function(path, callback){
  let route = new Route(path, callback);
  this.container.appendChild(route.container);
}

Router.prototype.notifyListeners = () => {
}

Router.prototype.trigger = () => {
}

Router.prototype.navigate = () => {
}

Router.prototype.mount = function(path, router){
  router.container.setAttribute('base', path);
  router.container.removeAttribute('router-root');
  this.container.appendChild(router.container);
}

Router.prototype.destroy = () => {
}

export { Router }
