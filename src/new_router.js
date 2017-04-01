import { fireEvent, walkDOM } from './ascesis';

var pd = require('pretty-data').pd;

function Route(path, callback){
  this.container = document.createElement('script');
  this.container.setAttribute('path', path);

  this.container.route = this;

  this.callback = () => callback();
}

Route.prototype.getRoot = function(){
  let $el = this.container;
  let part = [];
  do {
    part.unshift($el.getAttribute('base'))
    $el = $el.parentNode;
  } while($el && !!$el.getAttribute('router-root'));
  return part.join('').replace(/\/\//ig, '/');
}

Route.prototype.getGlobalPath = function(){
  return this.container.location.pathname;
}

Route.prototype.notify = function(){
  return this.callback();
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
    let foo = this.notifyObservers();
    console.log(foo);
  });
}

Router.prototype.notifyObservers = function(){
  //down to up order
  let routers = walkDOM(
    this.container,
    (child) => !!child.getAttribute('base'),
    (child) => {
      //check if node matches root
      return false;
    }
  ).map(($el) => $el.router.notifyObservers());
  if(~routers.indexOf(false)){
    return false;
  }
  let routes = walkDOM(
    this.container,
    (child) => child.getAttribute('path'),
      (child) => !!child.getAttribute('base')
  ).map(($el) => $el.route.notify());
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

Router.prototype.resolve = function(){
  console.log('resolve!');
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
