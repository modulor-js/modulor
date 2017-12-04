/**
 * Modulor library
 * @module modulor
 * */


import { delegate } from './delegate';
import * as domUtils from './dom_utils';

/**
 *  dom utils proxy functions
 *  @deprecated use dom_utils.js directly instead
 * */

/**
 *  Select nodes
 *  @param {String} selector Selector
 *  @param {HTMLElement} [element=window.document] Element
 *  @return {Array} Collection of nodes
 * */
export const $ = (selector, element) => domUtils.$(selector, element);


/**
 *  Converts NodeList to array
 *  @param {NodeList} nodes Elements collection
 *  @return {Array} Collection of nodes
 * */
export const toArray = (nodes) => domUtils.toArray(nodes);

/**
 *  Get/set element attribute
 *  @param {HTMLElement} element Element
 *  @param {String} key Attribute name
 *  @param {String} [value] Attribute value
 *  @return {String} Attribute value
 * */
export const attr = (element, key, value) => domUtils.attr(element, key, value);

/**
 *  Set the HTML content of element, or generate DocumentFragment
 *  @param {String} htmlString HTML content string
 *  @param {HTMLElement} [target] Element to set content
 *  @return {HTMLElement|DocumentFragment}
 *    Target if target parameter is set or document fragment
 * */
export const html = (htmlString, target) => domUtils.html(htmlString, target);

/**
 *  Add a class to the element
 *  @param {HTMLElement} element Element
 *  @param {String} className Class name
 * */
export const addClass = (element, className) =>
  domUtils.addClass(element, className);

/**
 *  Remove a class from the element
 *  @param {HTMLElement} element Element
 *  @param {String} className Class name
 * */
export const removeClass = (element, className) =>
  domUtils.removeClass(element, className);

/**
 *  Toggle a class at the element
 *  @param {HTMLElement} element Element
 *  @param {String} className Class name
 * */
export const toggleClass = (element, className) =>
  domUtils.toggleClass(element, className);

/**
 *  Check if the element has a class
 *  @param {HTMLElement} element Element
 *  @param {String} className Class name
 * */
export const hasClass = (element, className) => domUtils.hasClass(element, className);

/**
 *  Fires an event on element
 *  @param {String} eventName Event name
 *  @param {HTMLElement} target Element to trigger event on
 *  @param {*} [eventData] Data to attach to event
 * */
export const fireEvent = (eventName, target, eventData) =>
  domUtils.fireEvent(eventName, target, eventData);

/**
 *  Traverse DOM node
 *  @param {HTMLElement} node Element
 *  @param {Function} filter Filter child nodes function
 *  @param {Function} skipNode Skip child nodes function
 *  @return {Array} Collection of nodes
 * */
export const walkDOM = (node, filter, skipNode) =>
  domUtils.walkDOM(node, filter, skipNode);


/**
 *  Extend component class with modulor methods
 *  @param {Class} baseClass Component class
 *  @return {ModulorComponent} Extended component class
 * */
export function extend(baseClass){
  return class extends baseClass {
    /**
     *  @constructs ModulorComponent
     *  @inner
     * */
    constructor(){
      super();
    }

    get __isModulor(){
      return true;
    }

    /**
     *  *Getter*.
     *  List of child components.
     *  **Use only for debug purposes due to low efficiency**
     *  @memberof ModulorComponent
     *  @instance
     *  @type {Array.<ModulorComponent>}
     *  @category debug
     */
    get childComponents(){
      return domUtils.walkDOM(this, (node) => node.__isModulor, (node) => node.__isModulor);
    }

    /**
     *  *Getter*.
     *  Parent component.
     *  **Use only for debug purposes due to low efficiency**
     *  @memberof ModulorComponent
     *  @instance
     *  @type {ModulorComponent}
     *  @category debug
     */
    get parentComponent(){
      let parent = this;
      while(parent = parent.parentNode){
        if(parent.__isModulor){
          break;
        }
      }
      return parent;
    }

    //debug highlighting
    /**
     *  Toggle debug class on component
     *  @memberof ModulorComponent
     *  @instance
     *  @category debug
     */
    toggleHighlight(){
      this.classList.toggle(this.componentType + '-highlighted');
    }

    /**
     *  Toggle debug class on component and child components
     *  @memberof ModulorComponent
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
     *  @memberof ModulorComponent
     *  @instance
     *  @category DOM API
     *  @param {String} selector Selector
     *  @return {Array} Collection of nodes
     */
    $(selector){
      return domUtils.$(selector, this);
    }

    /**
     *  Get/set element attribute
     *  @memberof ModulorComponent
     *  @instance
     *  @category DOM API
     *  @param {String} key Attribute name
     *  @param {String} [value] Attribute value
     *  @return {String} Attribute value
     * */
    attr(key, value){
      return domUtils.attr(this, key, value);
    }

    /**
     *  Add a class to the element
     *  @memberof ModulorComponent
     *  @instance
     *  @category DOM API
     *  @param {String} className Class name
     * */
    addClass(className){
      return domUtils.addClass(this, className);
    }

    /**
     *  Remove a class from the element
     *  @memberof ModulorComponent
     *  @instance
     *  @category DOM API
     *  @param {String} className Class name
     * */
    removeClass(className){
      return domUtils.removeClass(this, className);
    }

    /**
     *  Toggle a class at the element
     *  @memberof ModulorComponent
     *  @instance
     *  @category DOM API
     *  @param {String} className Class name
     * */
    toggleClass(className){
      return domUtils.toggleClass(this, className);
    }

    /**
     *  Check if the element has a class
     *  @memberof ModulorComponent
     *  @instance
     *  @category DOM API
     *  @param {String} className Class name
     * */
    hasClass(className){
      return domUtils.hasClass(this, className);
    }

    /**
     *  Set the HTML content of element
     *  @memberof ModulorComponent
     *  @instance
     *  @category DOM API
     *  @param {String} htmlString HTML content string
     *  @param {HTMLElement} [$el] Target element
     *  @return {HTMLElement}
     *    Target if target parameter is set or document fragment
     * */
    html(html_string, $el = this){
      domUtils.html(html_string, $el);
    }

    //events
    /**
     *  Subscribe an event
     *  @memberof ModulorComponent
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
     *  @memberof ModulorComponent
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
     *  @memberof ModulorComponent
     *  @instance
     *  @category events
     *  @param {String} eventName Event name
     *  @param {*} [eventData] Data to attach to event
     * */
    trigger(eventName, eventData){
      domUtils.fireEvent(eventName, this, eventData);
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

