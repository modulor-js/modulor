export const createDelegate = (root = document) => {
  let listeners = {};
  let counter = 0;
  function get_id(){
    return counter++;
  }
  function decorateEvent(event){
    let original = event.stopPropagation;
    event.stopPropagation = () => {
      event.cancelBubble = true;
      original.call(event);
    };
    return event;
  }
  function handleEvent(event){
    decorateEvent(event);

    let path = [];
    let listenersPool = [];
    let target = event.target;
    let level = 0;
    do {
      path.push(target);
      let targetListeners = (target.listeners || {})[event.type] || [];
      for(let i = 0; i < targetListeners.length; i++){
        let targetListener = targetListeners[i];
        listenersPool.push({
          callback: targetListener.callback,
          selector: targetListener.selector,
          id: targetListener.id,
          level: level
        });
      }
      if(target === root){
        break;
      }
      target = target.parentNode;
      level++;
    } while(target !== document);
    event.traverse = path.slice();
    listenersPool.sort((a, b) => a.id - b.id);
    let nextListenersPool = [];
    for(let l = 0; l < path.length; l++){
      let item = path[l];
      for(let i = 0; i < listenersPool.length; i++){
        let listener = listenersPool[i];
        if((listener.level === l && listener.selector === null) ||
           (listener.level > l && item.matches(listener.selector))){
          listener.callback.call(item, event, item);
          continue;
        }
        if(listener.level < l){
          continue;
        }
        nextListenersPool.push(listener);
      }
      if(event.cancelBubble){
        break;
      }
      listenersPool = nextListenersPool;
      nextListenersPool = [];
    }
  }
  function _createDelegate(){}
  _createDelegate.prototype.on = function(eventName, element = root, selector = null, callback){
    if(element instanceof HTMLElement){
      element.listeners || (element.listeners = {});
      element.listeners[eventName] || (element.listeners[eventName] = []);
      element.listeners[eventName].push({
        selector, callback, id: get_id()
      });
    }
    if(listeners[eventName]){
      return;
    }
    listeners[eventName] = true;
    root.addEventListener(eventName, handleEvent);
    return this;
  }
  _createDelegate.prototype.off = function(eventName, element, selector, callback){
    if(!eventName){
      delete element.listeners;
      return;
    }
    if(!element.listeners[eventName]){
      return;
    }
    if(callback){
      element.listeners[eventName] = element.listeners[eventName].reduce((acc, listener) => {
        if(selector === listener.selector && callback === listener.callback){
          return acc;
        }
        return acc.concat(listener);
      }, []);
    }
    if(selector && !callback){
      element.listeners[eventName] = element.listeners[eventName].reduce((acc, listener) => {
        if(selector === listener.selector){
          return acc;
        }
        return acc.concat(listener);
      }, []);
    }
    if(!callback && !selector){
      delete element.listeners[eventName];
    }
    if(element.listeners && !Object.keys(element.listeners).length){
      delete element.listeners;
    }
  }
  _createDelegate.prototype.setRoot = function(newRoot = null){
    if(!newRoot || newRoot === root){
      return false;
    }
    Object.keys(listeners).forEach((eventName) => {
      root.removeEventListener(eventName, handleEvent);
      newRoot.addEventListener(eventName, handleEvent);
    });
    root = newRoot;
  }
  _createDelegate.prototype.destroy = function(){
    Object.keys(listeners).forEach((eventName) => {
      root.removeEventListener(eventName, handleEvent);
    });
    listeners = {};
  }
  return new _createDelegate();
}

export const delegate = new createDelegate(document);
