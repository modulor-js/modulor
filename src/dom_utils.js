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
 *  Select nodes
 *  @param {HTMLElement} Element
 *  @param {String} [selector] Selector
 *  @return {Function|Array} Curried function (if selector is not provided) or collection of nodes
 * */
export function $(element, selector){
  const fn = (selector) => toArray(element.querySelectorAll(selector));
  return selector ? fn(selector) : fn;
}

/**
 *  Get/set element attribute
 *  @param {String} key Attribute name
 *  @param {String} [value] Attribute value
 *  @param {HTMLElement} [element] Element
 *  @return {Function|String|HTMLElement} Curried function (if element is not provided) or attribute value
 * */
export function attr(key, value, element){
  if(!element && value instanceof HTMLElement){
    element = value;
    value = undefined;
  }
  const fn = (element) => {
    if(value){
      element.setAttribute(key, value);
      return element;
    }
    if(value === null){
      return element.removeAttribute(key);
    }
    return element.getAttribute(key);
  }
  return element ? fn(element) : fn;
}

/**
 *  Add a class to the element
 *  @param {String} className Class name
 *  @param {HTMLElement} [element] Element
 *  @return {Function|HTMLElement} Curried function (if element is not provided) or element
 * */
export function addClass(className, element){
  const fn = (element) => {
    element.classList.add(className);
    return element;
  }
  return element ? fn(element) : fn;
}

/**
 *  Remove a class from the element
 *  @param {String} className Class name
 *  @param {HTMLElement} [element] Element
 *  @return {Function|HTMLElement} Curried function (if element is not provided) or element
 * */
export function removeClass(className, element){
  const fn = (element) => {
    element.classList.remove(className)
    return element;
  };
  return element ? fn(element) : fn;
}

/**
 *  Toggle a class at the element
 *  @param {String} className Class name
 *  @param {HTMLElement} [element] Element
 *  @return {Function|HTMLElement} Curried function (if element is not provided) or element
 * */
export function toggleClass(className, element){
  const fn = (element) => {
    element.classList.toggle(className);
    return element;
  }
  return element ? fn(element) : fn;
}

/**
 *  Check if the element has a class
 *  @param {String} className Class name
 *  @param {HTMLElement} element Element
 *  @return {Function|Boolean} Curried function (if element is not provided) or boolean
 * */
export function hasClass(className, element){
  const fn = (element) => element.classList.contains(className);
  return element ? fn(element) : fn;
}


/**
 *  Traverse DOM node
 *  @param {HTMLElement} node Element
 *  @param {Function} filter Filter child nodes function
 *  @param {Function} skipNode Skip child nodes function
 *  @return {Array} Collection of nodes
 * */
export function walkDOM(node, filter = () => true, skipNode = () => false) {
  let arr = [];
  let loop = (node) => toArray(node.children).forEach((child) => {
    filter(child) && arr.push(child);
    (!skipNode(child) && child.hasChildNodes()) && loop(child);
  });
  loop(node);
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
