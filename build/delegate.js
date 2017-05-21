"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 *  @module delegate
 * */

/**
 *  @param {HTMLElement} root Delegate root
 *  @return {Delegate}
 * */
var createDelegate = exports.createDelegate = function createDelegate() {
  var root = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window.document;

  var listeners = {};
  var counter = 0;
  function get_id() {
    return counter++;
  }
  function decorateEvent(event) {
    var original = event.stopPropagation;
    event.stopPropagation = function () {
      event.cancelBubble = true;
      original.call(event);
    };
    return event;
  }
  function handleEvent(event) {
    decorateEvent(event);

    var path = [];
    var listenersPool = [];
    var target = event.target;
    var level = 0;
    do {
      path.push(target);
      var targetListeners = (target.listeners || {})[event.type] || [];
      for (var i = 0; i < targetListeners.length; i++) {
        var targetListener = targetListeners[i];
        listenersPool.push({
          callback: targetListener.callback,
          selector: targetListener.selector,
          id: targetListener.id,
          level: level
        });
      }
      if (target === root) {
        break;
      }
      target = target.parentNode;
      level++;
    } while (target !== document);
    event.traverse = path.slice();
    listenersPool.sort(function (a, b) {
      return a.id - b.id;
    });
    var nextListenersPool = [];
    for (var l = 0; l < path.length; l++) {
      var item = path[l];
      for (var _i = 0; _i < listenersPool.length; _i++) {
        var listener = listenersPool[_i];
        if (listener.level === l && listener.selector === null || listener.level > l && item.matches(listener.selector)) {
          listener.callback.call(item, event, item);
          continue;
        }
        if (listener.level < l) {
          continue;
        }
        nextListenersPool.push(listener);
      }
      if (event.cancelBubble) {
        break;
      }
      listenersPool = nextListenersPool;
      nextListenersPool = [];
    }
  }
  /**
   *  @constructs Delegate
   * */
  function _createDelegate() {}

  /**
   * Subscribe an event
   * @param {String} eventName Event name
   * @param {HTMLElement} element Delegate node
   * @param {String|Null} selector Selector
   * @param {Function} callback Callback
   * */
  _createDelegate.prototype.on = function (eventName) {
    var element = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : root;
    var selector = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
    var callback = arguments[3];

    if (element instanceof HTMLElement) {
      element.listeners || (element.listeners = {});
      element.listeners[eventName] || (element.listeners[eventName] = []);
      element.listeners[eventName].push({
        selector: selector, callback: callback, id: get_id()
      });
    }
    if (listeners[eventName]) {
      return;
    }
    listeners[eventName] = true;
    root.addEventListener(eventName, handleEvent);
    return this;
  };

  /**
   * Unsubscribe an event
   * @param {String} [eventName] Event name
   * @param {HTMLElement} [element] Delegate node
   * @param {String|Null} [selector] Selector
   * @param {Function} [callback] Callback
   * */
  _createDelegate.prototype.off = function (eventName, element, selector, callback) {
    if (!eventName) {
      delete element.listeners;
      return;
    }
    if (!element.listeners[eventName]) {
      return;
    }
    if (callback) {
      element.listeners[eventName] = element.listeners[eventName].reduce(function (acc, listener) {
        if (selector === listener.selector && callback === listener.callback) {
          return acc;
        }
        return acc.concat(listener);
      }, []);
    }
    if (selector && !callback) {
      element.listeners[eventName] = element.listeners[eventName].reduce(function (acc, listener) {
        if (selector === listener.selector) {
          return acc;
        }
        return acc.concat(listener);
      }, []);
    }
    if (!callback && !selector) {
      delete element.listeners[eventName];
    }
    if (element.listeners && !Object.keys(element.listeners).length) {
      delete element.listeners;
    }
  };

  /**
   * Set delegate root
   * @param {HTMLElement} newRoot Delegate root
   * */
  _createDelegate.prototype.setRoot = function () {
    var newRoot = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

    if (!newRoot || newRoot === root) {
      return false;
    }
    Object.keys(listeners).forEach(function (eventName) {
      root.removeEventListener(eventName, handleEvent);
      newRoot.addEventListener(eventName, handleEvent);
    });
    root = newRoot;
  };

  /**
   * Destroy delegate
   * */
  _createDelegate.prototype.destroy = function () {
    Object.keys(listeners).forEach(function (eventName) {
      root.removeEventListener(eventName, handleEvent);
    });
    listeners = {};
  };
  return new _createDelegate();
};

/**
 *  Delegate instance with root of window.document
 *  @type Delegate
 * */
var delegate = exports.delegate = new createDelegate(window.document);