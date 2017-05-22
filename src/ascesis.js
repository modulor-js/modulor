/**
 * Ascesis library
 * @module ascesis
 * */


import { delegate } from './delegate'

/**
 *  Select nodes
 *  @param {String} selector Selector
 *  @param {HTMLElement} [element=window.document] Element
 *  @return {Array} Collection of nodes
 * */
export function $(selector, element = document){
  return toArray(element.querySelectorAll(selector));
}

/**
 *  Get/set element attribute
 *  @param {HTMLElement} element Element
 *  @param {String} key Attribute name
 *  @param {String} [value] Attribute value
 *  @return {String} Attribute value
 * */
export function attr(element, key, value){
  if(value){
    return element.setAttribute(key, value);
  }
  if(value === null){
    return element.removeAttribute(key);
  }
  return element.getAttribute(key);
}

/**
 *  Add a class to the element
 *  @param {HTMLElement} element Element
 *  @param {String} className Class name
 * */
export function addClass(element, className){
  return element.classList.add(className);
}

/**
 *  Remove a class from the element
 *  @param {HTMLElement} element Element
 *  @param {String} className Class name
 * */
export function removeClass(element, className){
  return element.classList.remove(className);
}

/**
 *  Toggle a class at the element
 *  @param {HTMLElement} element Element
 *  @param {String} className Class name
 * */
export function toggleClass(element, className){
  return element.classList.toggle(className);
}

/**
 *  Check if the element has a class
 *  @param {HTMLElement} element Element
 *  @param {String} className Class name
 * */
export function hasClass(element, className){
  return element.classList.contains(className);
}


/**
 *  Traverse DOM node
 *  @param {HTMLElement} node Element
 *  @param {Function} filter Filter child nodes function
 *  @param {Function} skipNode Skip child nodes function
 *  @return {Array} Collection of nodes
 * */
export function walkDOM(node, filter = () => true, skipNode = () => false) {
  let arr = new QueryableArray();
  let loop = (node) => toArray(node.children).forEach((child) => {
    filter(child) && arr.push(child);
    (!skipNode(child) && child.hasChildNodes()) && loop(child);
  });
  loop(node);
  return arr;
}

/**
 *  Converts NodeList to array
 *  @param {NodeList} nodes Elements collection
 *  @return {Array} Collection of nodes
 * */
export function toArray(nodes){
  let arr = [];
  for (let i = 0, ref = arr.length = nodes.length; i < ref; i++){
   arr[i] = nodes[i];
  }
  return arr;
}

/**
 *  Fires an event on element
 *  @param {String} eventName Event name
 *  @param {HTMLElement} target Element to trigger event on
 *  @param {*} [eventData] Data to attach to event
 * */
export function fireEvent(eventName, target, eventData = null){
  target = target || document.body;
  var event;
  try {
    event = new Event(eventName, { "bubbles": true, "cancelable": true });
  } catch(e) {
    event = document.createEvent('Event');
    event.initEvent(eventName, true, true);
  }
  event.eventData = eventData;
  target.dispatchEvent(event);
}

/**
 *  Set the HTML content of element, or generate DocumentFragment
 *  @param {String} htmlString HTML content string
 *  @param {HTMLElement} [target] Element to set content
 *  @return {HTMLElement|DocumentFragment}
 *    Target if target parameter is set or document fragment
 * */
export function html(htmlString, target){
  var fragment = document.createDocumentFragment();
  var temp_container = document.createElement('div');
  temp_container.innerHTML = htmlString;
  while(temp_container.firstChild){
    fragment.appendChild(temp_container.firstChild);
  }
  if(target){
    target.innerHTML = '';
    target.appendChild(fragment);
    return target;
  }
  return fragment;
}

/**
 *  Extend component class with ascesis methods
 *  @param {Class} baseClass Component class
 *  @return {AscesisComponent} Extended component class
 * */
export function extend(baseClass){
  return class extends baseClass {
    /**
     *  @constructs AscesisComponent
     *  @inner
     * */
    constructor(){
      super();
    }

    get __isAscesis(){
      return true;
    }

    /**
     *  *Getter*.
     *  List of child components.
     *  **Use only for debug purposes due to low efficiency**
     *  @memberof AscesisComponent
     *  @instance
     *  @type {Array.<AscesisComponent>}
     *  @category debug
     */
    get childComponents(){
      return walkDOM(this, (node) => node.__isAscesis, (node) => node.__isAscesis);
    }

    /**
     *  *Getter*.
     *  Parent component.
     *  **Use only for debug purposes due to low efficiency**
     *  @memberof AscesisComponent
     *  @instance
     *  @type {AscesisComponent}
     *  @category debug
     */
    get parentComponent(){
      let parent = this;
      while(parent = parent.parentNode){
        if(parent.__isAscesis){
          break;
        }
      }
      return parent;
    }

    //debug highlighting
    /**
     *  Toggle debug class on component
     *  @memberof AscesisComponent
     *  @instance
     *  @category debug
     */
    toggleHighlight(){
      this.classList.toggle(this.componentType + '-highlighted');
    }

    /**
     *  Toggle debug class on component and child components
     *  @memberof AscesisComponent
     *  @instance
     *  @category debug
     */
    toggleHighlightAll(){
      this.toggleHighlight();
      this.childComponents.forEach(function(child){
        child.toggleHighlightAll();
      });
    }

    //DOM

    /**
     *  Select nodes
     *  @memberof AscesisComponent
     *  @instance
     *  @category DOM API
     *  @param {String} selector Selector
     *  @return {Array} Collection of nodes
     */
    $(selector){
      return $(selector, this);
    }

    /**
     *  Get/set element attribute
     *  @memberof AscesisComponent
     *  @instance
     *  @category DOM API
     *  @param {String} key Attribute name
     *  @param {String} [value] Attribute value
     *  @return {String} Attribute value
     * */
    attr(key, value){
      return attr(this, key, value);
    }

    /**
     *  Add a class to the element
     *  @memberof AscesisComponent
     *  @instance
     *  @category DOM API
     *  @param {String} className Class name
     * */
    addClass(className){
      return addClass(this, className);
    }

    /**
     *  Remove a class from the element
     *  @memberof AscesisComponent
     *  @instance
     *  @category DOM API
     *  @param {String} className Class name
     * */
    removeClass(className){
      return removeClass(this, className);
    }

    /**
     *  Toggle a class at the element
     *  @memberof AscesisComponent
     *  @instance
     *  @category DOM API
     *  @param {String} className Class name
     * */
    toggleClass(className){
      return toggleClass(this, className);
    }

    /**
     *  Check if the element has a class
     *  @memberof AscesisComponent
     *  @instance
     *  @category DOM API
     *  @param {String} className Class name
     * */
    hasClass(className){
      return hasClass(this, className);
    }

    /**
     *  Set the HTML content of element
     *  @memberof AscesisComponent
     *  @instance
     *  @category DOM API
     *  @param {String} htmlString HTML content string
     *  @param {HTMLElement} [$el] Target element
     *  @return {HTMLElement}
     *    Target if target parameter is set or document fragment
     * */
    html(html_string, $el = this){
      html(html_string, $el);
    }

    //events
    /**
     *  Subscribe an event
     *  @memberof AscesisComponent
     *  @instance
     *  @category events
     *  @param {String} eventName Event name
     *  @param {String} [selector] Selector
     *  @param {Function} callback Event name
     * */
    on(eventName, selector, callback){
      if(!callback){
        callback = selector;
        selector = null;
      }
      delegate.on(eventName, this, selector, callback);
    }

    /**
     *  Unsubscribe an event
     *  Unsibscribe all events when called without arguments
     *  Unsibscribe all events by selector when called without *selector* argument
     *  @memberof AscesisComponent
     *  @instance
     *  @category events
     *  @param {String} [eventName] Event name
     *  @param {String} [selector] Selector
     *  @param {Function} [callback] Event name
     * */
    off(eventName = null, selector, callback){
      if(!callback){
        callback = selector;
        selector = null;
      }
      delegate.off(eventName, this, selector, callback);
    }

    /**
     *  Fires an event on element
     *  @memberof AscesisComponent
     *  @instance
     *  @category events
     *  @param {String} eventName Event name
     *  @param {*} [eventData] Data to attach to event
     * */
    trigger(eventName, eventData){
      fireEvent(eventName, this, eventData);
    }

    //lifecycle callbacks

    connectedCallback(){
      this.trigger('component-attached');
      this.on('component-attached', (event) => {
        event.stopPropagation();
      });
      super.connectedCallback && super.connectedCallback();
    }

    disconnectedCallback(){
      this.off();
      super.disconnectedCallback && super.disconnectedCallback();
    }

    attributeChangedCallback(){}
  }
}

/**
 *  @class QueryableArray Extends array with querySelector(All) methods
 *  @extends Array
 *  @deprecated
 * */
export class QueryableArray extends Array {
   constructor(){
    super();
    this.querySelector = (selector) => {
      for(var index = 0; index < this.length; index++){
        if(this[index].matches(selector)){
          return this[index];
        }
      }
      return null;
    }
    this.querySelectorAll = (selector) => {
      var output = new QueryableArray();
      for(var index = 0; index < this.length; index++){
        this[index].matches(selector) && output.push(this[index]);
      }
      return output;
    }
  }
}

/**
 *  @class BaseController Base controller
 * */
export class BaseController extends extend(HTMLElement) {
  get componentType(){ return 'controller'; }
}

/**
 *  @class BaseComponent Base component
 * */
export class BaseComponent extends extend(HTMLElement) {
  get componentType(){ return 'component'; }
}

