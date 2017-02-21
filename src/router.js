import { fireEvent } from './ascesis';
import pathToRegexp from 'path-to-regexp';

const default_options = {
  root: '',
  routes: {}
}

export default class Router {
  get root(){
    return this._root || this.options.root;
  }
  set root(value){
    this._root = value;
  }

  get prev_path(){
    return this._prev_path;
  }
  set prev_path(value){
    this._prev_path = value;
  }

  get prev_qs(){
    return this._prev_qs;
  }
  set prev_qs(value){
    this._prev_qs = value;
  }

  get qs(){
    return this.container.location.search === ''
           ? false
           : this.container.location.search.split('?')[1];
  }

  get global_path(){
    return this.container.location.pathname;
  }

  get path(){
    return this.root_matches ? this.global_path.replace(this.root, '') : false;
  }

  get root_matches(){
    return (new RegExp(`^${this.root}(/|$)`)).test(this.global_path);
  }

  get params(){
    return this.qs
           ? this.qs.split('&').reduce((acc, param) => {
             let [key, value] = param.split('=');
             return Object.assign(acc, {
                [key]: value
             });
           }, {})
           : {}
  }

  constructor(options = {}, container = window){

    this.options = Object.assign({}, default_options, options);
    this.listeners = [];
    this.subrouters = [];
    this.container = container;

    Object.keys(this.options.routes).forEach((route) => {
      //add function should handle this
      this.add(route, this.options.routes[route]);
    });

    this.container.addEventListener('popstate', () => this.resolve());
    this.container.addEventListener('url-changed', () => this.resolve());

  }

  add(route = /(.*)/, callback = () => {}){
    this.listeners.push({ route: pathToRegexp(route, []), callback });
  }

  notify_listeners(){
    this.listeners.forEach(({ route, callback }) => {
      let match = this.path.match(route);
      if(match){
        //first argument should not be here
        callback.apply(this, match.concat(this.params));
      }
    })
  }

  trigger(){
    fireEvent('url-changed', this.container);
  }

  resolve(){
    if(!this.root_matches || (this.prev_path === this.path && this.prev_qs === this.qs)){
      return false;
    }
    //do not notify own listeners if subrouter matches root
    if(this.subrouters.length){
      for(let subrouter of this.subrouters){
        if(subrouter.root_matches && subrouter.prevent){
          return false;
        }
      }
    }
    this.prev_path = this.path;
    this.prev_qs = this.qs;
    this.notify_listeners();
  }

  navigate(path, absolute = false, replace = false, silent = false){

    let full_prev_path = [this.path].concat(this.qs || []).join('?');
    if(!absolute && (!this.root_matches || (path === full_prev_path))){
      return false;
    }

    let full_prev_global_path = [this.global_path].concat(this.qs || []).join('?');
    if(absolute && path === full_prev_global_path){
      return false;
    }

    let _path = absolute ? path : this.root + path;
    window.history[replace ? 'replaceState' : 'pushState'](null, null, _path);
    !silent && this.trigger('url-changed');
  }

  destroy(){
    this.listeners = [];
    this.container.removeEventListener('popstate', () => this.resolve());
    this.container.removeEventListener('url-changed', () => this.resolve());
  }

  mount(path, router, prevent = false){
    router.root = this.root + path;
    router.prevent = prevent;
    this.subrouters.push(router);
  }

}
