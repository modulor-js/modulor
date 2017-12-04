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
