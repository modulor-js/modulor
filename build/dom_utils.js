"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.toArray = toArray;
exports.$ = $;
exports.attr = attr;
exports.addClass = addClass;
exports.removeClass = removeClass;
exports.toggleClass = toggleClass;
exports.hasClass = hasClass;
exports.append = append;
exports.prepend = prepend;
exports.walkDOM = walkDOM;
exports.fireEvent = fireEvent;
exports.html = html;
exports.isNode = isNode;
exports.empty = empty;
exports.getRefs = getRefs;
exports.createElement = createElement;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function isUndefined(value) {
  return typeof value === 'undefined';
}

/**
 *  Converts NodeList to array
 *  @param {NodeList} nodes Elements collection
 *  @return {Array} Collection of nodes
 *
 *  @example
 *  toArray(document.querySelectorAll('body')) //=> [document.body]
 * */
function toArray() {
  var nodes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

  var arr = [];
  for (var i = 0, ref = arr.length = nodes.length; i < ref; i++) {
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
function $(element, selector) {
  var fn = function fn(selector) {
    return toArray(element.querySelectorAll(selector));
  };
  return selector ? fn(selector) : fn;
}

/**
 *  Get/set element attribute
 *  @param {String} key Attribute name
 *  @param {String} [value] Attribute value
 *  @param {HTMLElement} [element] Element
 *  @return {Function|String|HTMLElement} Curried function (if element is not provided) or attribute value
 * */
function attr(key, value, element) {
  if (!element && value instanceof HTMLElement) {
    element = value;
    value = undefined;
  }
  var fn = function fn(element) {
    if (value) {
      element.setAttribute(key, value);
      return element;
    }
    if (value === null) {
      return element.removeAttribute(key);
    }
    return element.getAttribute(key);
  };
  return element ? fn(element) : fn;
}

/**
 *  Add a class to the element
 *  @param {String} className Class name
 *  @param {HTMLElement} [element] Element
 *  @return {Function|HTMLElement} Curried function (if element is not provided) or element
 * */
function addClass(className, element) {
  var fn = function fn(element) {
    element.classList.add(className);
    return element;
  };
  return element ? fn(element) : fn;
}

/**
 *  Remove a class from the element
 *  @param {String} className Class name
 *  @param {HTMLElement} [element] Element
 *  @return {Function|HTMLElement} Curried function (if element is not provided) or element
 * */
function removeClass(className, element) {
  var fn = function fn(element) {
    element.classList.remove(className);
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
function toggleClass(className, element) {
  var fn = function fn(element) {
    element.classList.toggle(className);
    return element;
  };
  return element ? fn(element) : fn;
}

/**
 *  Check if the element has a class
 *  @param {String} className Class name
 *  @param {HTMLElement} element Element
 *  @return {Function|Boolean} Curried function (if element is not provided) or boolean
 * */
function hasClass(className, element) {
  var fn = function fn(element) {
    return element.classList.contains(className);
  };
  return element ? fn(element) : fn;
}

/**
 *  appends one HTML Element to another HTML Element
 *  @param {HTMLElement} parent element to attach to
 *  @param {HTMLElement} [element] new node
 *  @return {HTMLElement|Function} parent
 * */
function append(parent, element) {
  var fn = function fn(element) {
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
function prepend(parent, element) {
  var fn = function fn(element) {
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
function walkDOM(node) {
  var filter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {
    return true;
  };
  var skipNode = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function () {
    return false;
  };

  var arr = [];
  var loop = function loop(node) {
    return toArray(node.childNodes).filter(function (child) {
      return child.nodeType === 1;
    }).forEach(function (child) {
      filter(child) && arr.push(child);
      !skipNode(child) && child.hasChildNodes() && loop(child);
    });
  };
  loop(node);
  return arr;
}

/**
 *  Fires an event on element
 *  @param {String} eventName Event name
 *  @param {HTMLElement} target Element to trigger event on
 *  @param {*} [eventData] Data to attach to event
 * */
function fireEvent(eventName, target) {
  var eventData = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

  target = target || document.body;
  var event;
  try {
    event = new Event(eventName, { "bubbles": true, "cancelable": true });
  } catch (e) {
    event = document.createEvent('Event');
    event.initEvent(eventName, true, true);
  }
  event.eventData = eventData;
  target.dispatchEvent(event);
};

var patchRefs = function patchRefs(refs) {
  var promises = Object.keys(refs).reduce(function (acc, key) {
    return acc.concat(refs[key]);
  }, []).map(function ($el) {
    return $el.whenComponentConnected = new Promise(function (resolve, reject) {
      $el.__whenConnectedResolver = function (arg) {
        return resolve(arg || $el);
      };
    });
  });

  return refs;
};

/**
 * Set the HTML content of element, or generate DocumentFragment
 * @param {HTMLElement|String} target Element to set content or html string
 * @param {String|HTMLElement|DocumentFragment} [content] HTML content string
 * @return {Array|Function} tuple [target || DocumentFragment, refs object] or render function
 *
 * @example
 * // set content of element
 * const $el = document.createElement('div');
 * const result = html($el, `<div></div>`); //=> [$el, {}];
 *
 * @example
 * // create element renderer
 * const $el = document.createElement('div');
 * const render = html($el);
 * const result = render(`<div></div>`); //=> [$el, {}];
 *
 * @example
 * // generate document fragment from string
 * const result = html(`<div id="some_id"></div>`) //=> [<HTMLElement#some_id>, {}]
 *
 * @example
 * // get refs
 * const refs = html(`
 *   <div id="some_id" ref="some_ref">
 *     <span refs="span_elements" id="span_1"></span>
 *     <span refs="span_elements" id="span_2"></span>
 *   </div>
 * `)[1] //=> { some_ref: <HTMLElement#some_id>, span_elements: [<HTMLElement#span_1>, <HTMLElement#span_2>] }
 * */
function html(target, content) {
  var fn = function fn(content) {
    var fragment = isNode(content) ? content : toArray(createElement('div', {}, content).childNodes).reduce(append, document.createDocumentFragment());
    var refs = patchRefs(getRefs(fragment));
    return [target ? append(empty(target), fragment) : fragment, refs];
  };
  if (isUndefined(content) && !isNode(target)) {
    content = target;
    target = undefined;
  }
  return !isUndefined(content) ? fn(content) : fn;
};

/**
 *  Check if element is HTMLElement or DocumentFragment
 *  @param {HTMLElement} element Element to check
 *  @return {Boolean}
 * */
function isNode(element) {
  return element instanceof HTMLElement || element instanceof DocumentFragment;
};

/**
 *  Empty element
 *  @param {HTMLElement} element Element to empty
 *  @return {HTMLElement} element
 * */
function empty(element) {
  element.innerHTML = '';
  return element;
};

/**
 *  Find refs
 *  @param {HTMLElement} element Element to find refs on
 *  @return {Object} refs object
 * */
function getRefs(element) {
  var refGetter = attr('ref');
  var refsGetter = attr('refs');
  return walkDOM(element, function ($el) {
    return refGetter($el) || refsGetter($el);
  }, function ($el) {
    return $el.__isModulor;
  }).reduce(function (accum, $el) {
    var ref = refGetter($el);
    var refs = refsGetter($el);
    if (refs) {
      return _extends(accum, _defineProperty({}, refs, (accum[refs] || []).concat($el)));
    }
    return _extends(accum, _defineProperty({}, ref, $el));
  }, {});
};

/**
 *  creates HTML Element
 *  @param {String} name tag name
 *  @param {Object} [attributes] element attributes
 *  @param {String} [content] element content
 *  @return {HTMLElement} created element
 * */
function createElement(name) {
  var attributes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var content = arguments[2];

  var $el = document.createElement(name);
  Object.keys(attributes).forEach(function (attr) {
    if (attr in $el) {
      $el[attr] = attributes[attr];
    } else {
      $el.setAttribute(attr, attributes[attr]);
    }
  });
  content && ($el.innerHTML = content);
  return $el;
};