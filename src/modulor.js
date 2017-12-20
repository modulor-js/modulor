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
export const $ = (selector, element) => domUtils.$(element, selector);


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
export const attr = (element, key, value) => domUtils.attr(key, value, element);

/**
 *  Set the HTML content of element, or generate DocumentFragment
 *  @param {String} htmlString HTML content string
 *  @param {HTMLElement} [target] Element to set content
 *  @return {HTMLElement|DocumentFragment}
 *    Target if target parameter is set or document fragment
 * */
export const html = (htmlString, target) => domUtils.html(target, htmlString)[0];

/**
 *  Add a class to the element
 *  @param {HTMLElement} element Element
 *  @param {String} className Class name
 * */
export const addClass = (element, className) =>
  domUtils.addClass(className, element);

/**
 *  Remove a class from the element
 *  @param {HTMLElement} element Element
 *  @param {String} className Class name
 * */
export const removeClass = (element, className) =>
  domUtils.removeClass(className, element);

/**
 *  Toggle a class at the element
 *  @param {HTMLElement} element Element
 *  @param {String} className Class name
 * */
export const toggleClass = (element, className) =>
  domUtils.toggleClass(className, element);

/**
 *  Check if the element has a class
 *  @param {HTMLElement} element Element
 *  @param {String} className Class name
 * */
export const hasClass = (element, className) => domUtils.hasClass(className, element);

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
 * @class BaseComponent
 * */
export class BaseComponent extends HTMLElement {

  get __isModulor(){
    return true;
  }

  /**
   * @category properties
   * @property {String} componentType="component" - Component type
   */
  get componentType(){ return 'component'; }

  /**
   * @category properties
   * @property {Object.<String, Function>} proxyAttributes={} - Proxy attributes to properties
   */
  get proxyAttributes(){ return {}; }

  /**
   *  *Getter*.
   *  List of child components.
   *  **Use only for debug purposes due to low efficiency**
   *  @category debug
   *  @return {Array.<BaseComponent>}
   */
  get childComponents(){
    return domUtils.walkDOM(this, (node) => node.__isModulor, (node) => node.__isModulor);
  }

  /**
   *  *Getter*.
   *  Parent component.
   *  **Use only for debug purposes due to low efficiency**
   *  @category debug
   *  @return {BaseComponent}
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

  /**
   *  Toggle debug class on component
   *  @category debug
   */
  toggleHighlight(){
    this.toggleClass(this.componentType + '-highlighted');
  }

  /**
   *  Toggle debug class on component and child components
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
   *  @category DOM API
   *  @param {String} selector Selector
   *  @return {Array} Collection of nodes
   */
  $(selector){
    return domUtils.$(this, selector);
  }

  /**
   *  Get/set element attribute
   *  @category DOM API
   *  @param {String} key Attribute name
   *  @param {String} [value] Attribute value
   *  @return {String} Attribute value
   * */
  attr(key, value){
    return domUtils.attr(key, value, this);
  }

  /**
   *  Add a class to the element
   *  @category DOM API
   *  @param {String} className Class name
   * */
  addClass(className){
    return domUtils.addClass(className, this);
  }

  /**
   *  Remove a class from the element
   *  @category DOM API
   *  @param {String} className Class name
   * */
  removeClass(className){
    return domUtils.removeClass(className, this);
  }

  /**
   *  Toggle a class at the element
   *  @category DOM API
   *  @param {String} className Class name
   * */
  toggleClass(className){
    return domUtils.toggleClass(className, this);
  }

  /**
   *  Check if the element has a class
   *  @category DOM API
   *  @param {String} className Class name
   *  @return {Boolean}
   * */
  hasClass(className){
    return domUtils.hasClass(className, this);
  }

  /**
   * Set the HTML content of element
   * @category DOM API
   * @param {String} htmlString HTML content string
   * @param {HTMLElement} [$el] Target element
   * @return {Object} refs
   *
   * @example
   * // set content
   * this.html(`<div></div>`);
   *
   * @example
   * // set content of another element
   * this.html(`<div></div>`, <HTMLElement>);
   *
   * @example
   * // get refs
   * const refs = this.html(`
   *   <div id="some_id" ref="some_ref">
   *     <span refs="span_elements" id="span_1"></span>
   *     <span refs="span_elements" id="span_2"></span>
   *   </div>
   * `) //=> { some_ref: <HTMLElement#some_id>, span_elements: [<HTMLElement#span_1>, <HTMLElement#span_2>] }
   *
   * @example
   * // await child elements (only when instance of modulor component)
   * const refs = this.html(`
   *   <child-component ref="$childComponent"></child-component>
   *   <div ref="$someDiv"></div>
   * `);
   * refs['$childComponent'].whenComponentConnected.then(($childComponent) => ...);
   * refs['$someDiv'].whenComponentConnected.then(...never resolves...);
   *
   * */
  html(html_string, $el = this){
    return domUtils.html($el, html_string)[1];
  }

  //events
  /**
   *  Subscribe an event
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
    this.__whenConnectedResolver && this.__whenConnectedResolver();
  }

  disconnectedCallback(){
    this.off();
  }

  attributeChangedCallback(name, oldValue, newValue){
    if(this.proxyAttributes[name]){
      this[name] = this.proxyAttributes[name](newValue, oldValue);
    }
  }
}

/**
 *  @deprecated
 *  @class BaseController
 *  @extends BaseComponent
 * */
export class BaseController extends BaseComponent {
  /**
   * @category properties
   * @property {String} componentType="controller" - Component type
   */
  get componentType(){ return 'controller'; }
}

