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
 *  appends one HTML Element to another HTML Element
 *  @param {HTMLElement} parent element to attach to
 *  @param {HTMLElement} [element] new node
 *  @return {HTMLElement|Function} parent
 * */
export function append(parent, element){
  const fn = (element) => {
    parent.appendChild(element);
    return parent;
  };
  return element ? fn(element) : fn;
};

/**
 *  prepends one HTML Element to another HTML Element
 *  @param {HTMLElement} parent element to attach to
 *  @param {HTMLElement} [element] new node
 *  @return {HTMLElement|Function} parent
 * */
export function prepend(parent, element){
  const fn = (element) => {
    parent.insertBefore(element, parent.firstChild);
    return parent;
  };
  return element ? fn(element) : fn;
};


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
};

/**
 *  Set the HTML content of element, or generate DocumentFragment
 *  @param {HTMLElement} [target] Element to set content
 *  @param {String} [htmlString] HTML content string
 *  @return {Array|Function} tuple [target || DocumentFragment, refs object] or render function
 * */
export function html(target, htmlString){
  const fn = (htmlString) => {
    const fragment = isNode(htmlString) ? htmlString : toArray(
      createElement('div', {}, htmlString).childNodes
    ).reduce(append, document.createDocumentFragment());
    const refs = getRefs(fragment);
    return [
      target ? append(empty(target), fragment) : fragment,
      refs
    ];
  }
  if(typeof htmlString === 'undefined' && !isNode(target)){
    htmlString = target;
    target = undefined;
  }
  return htmlString ? fn(htmlString) : fn;
};


/**
 *  Check if element is HTMLElement or DocumentFragment
 *  @param {HTMLElement} element Element to check
 *  @return {Boolean}
 * */
export function isNode(element){
  return element instanceof HTMLElement || element instanceof DocumentFragment;
};

/**
 *  Empty element
 *  @param {HTMLElement} element Element to empty
 *  @return {HTMLElement} element
 * */
export function empty(element){
  element.innerHTML = '';
  return element;
};

/**
 *  Find refs
 *  @param {HTMLElement} element Element to empty
 *  @return {HTMLElement} element
 * */
export function getRefs(element){
  const refGetter = attr('ref');
  const refsGetter = attr('refs');
  return walkDOM(
    element,
    ($el) => refGetter($el) || refsGetter($el),
    ($el) => $el.__isModulor
  ).reduce((accum, $el) => {
    const ref = refGetter($el);
    const refs = refsGetter($el);
    if(refs){
      return Object.assign(accum, {
        [refs]: (accum[refs] || []).concat($el)
      });
    }
    return Object.assign(accum, {
      [ref]: $el
    });
  }, {})
};


/**
 *  creates HTML Element
 *  @param {String} name tag name
 *  @param {Object} [attributes] element attributes
 *  @return {HTMLElement} created element
 * */
export function createElement(name, attributes, content){
  const $el = document.createElement(name);
  Object.keys(attributes).forEach((attr) => {
    if (attr in $el) {
      $el[attr] = attributes[attr];
    } else {
      $el.setAttribute(attr, attributes[attr]);
    }
  });
  content && ($el.innerHTML = content);
  return $el;
};
