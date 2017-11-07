"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BaseComponent = exports.BaseController = exports.QueryableArray = exports.html = exports.hasClass = exports.toggleClass = exports.removeClass = exports.addClass = exports.attr = exports.$ = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

exports.walkDOM = walkDOM;
exports.toArray = toArray;
exports.fireEvent = fireEvent;
exports.extend = extend;

var _delegate = require("./delegate");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Modulor library
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @module modulor
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * */

/**
 *  Select nodes
 *  @param {String} selector Selector
 *  @param {HTMLElement} [element=window.document] Element
 *  @return {Array} Collection of nodes
 * */
function _$(selector) {
  var element = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;

  return toArray(element.querySelectorAll(selector));
}

/**
 *  Get/set element attribute
 *  @param {HTMLElement} element Element
 *  @param {String} key Attribute name
 *  @param {String} [value] Attribute value
 *  @return {String} Attribute value
 * */
exports.$ = _$;
function _attr(element, key, value) {
  if (value) {
    return element.setAttribute(key, value);
  }
  if (value === null) {
    return element.removeAttribute(key);
  }
  return element.getAttribute(key);
}

/**
 *  Add a class to the element
 *  @param {HTMLElement} element Element
 *  @param {String} className Class name
 * */
exports.attr = _attr;
function _addClass(element, className) {
  return element.classList.add(className);
}

/**
 *  Remove a class from the element
 *  @param {HTMLElement} element Element
 *  @param {String} className Class name
 * */
exports.addClass = _addClass;
function _removeClass(element, className) {
  return element.classList.remove(className);
}

/**
 *  Toggle a class at the element
 *  @param {HTMLElement} element Element
 *  @param {String} className Class name
 * */
exports.removeClass = _removeClass;
function _toggleClass(element, className) {
  return element.classList.toggle(className);
}

/**
 *  Check if the element has a class
 *  @param {HTMLElement} element Element
 *  @param {String} className Class name
 * */
exports.toggleClass = _toggleClass;
function _hasClass(element, className) {
  return element.classList.contains(className);
}

/**
 *  Traverse DOM node
 *  @param {HTMLElement} node Element
 *  @param {Function} filter Filter child nodes function
 *  @param {Function} skipNode Skip child nodes function
 *  @return {Array} Collection of nodes
 * */
exports.hasClass = _hasClass;
function walkDOM(node) {
  var filter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {
    return true;
  };
  var skipNode = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function () {
    return false;
  };

  var arr = new QueryableArray();
  var loop = function loop(node) {
    return toArray(node.children).forEach(function (child) {
      filter(child) && arr.push(child);
      !skipNode(child) && child.hasChildNodes() && loop(child);
    });
  };
  loop(node);
  return arr;
}

/**
 *  Converts NodeList to array
 *  @param {NodeList} nodes Elements collection
 *  @return {Array} Collection of nodes
 * */
function toArray(nodes) {
  var arr = [];
  for (var i = 0, ref = arr.length = nodes.length; i < ref; i++) {
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
}

/**
 *  Set the HTML content of element, or generate DocumentFragment
 *  @param {String} htmlString HTML content string
 *  @param {HTMLElement} [target] Element to set content
 *  @return {HTMLElement|DocumentFragment}
 *    Target if target parameter is set or document fragment
 * */
function _html(htmlString, target) {
  var fragment = document.createDocumentFragment();
  var temp_container = document.createElement('div');
  temp_container.innerHTML = htmlString;
  while (temp_container.firstChild) {
    fragment.appendChild(temp_container.firstChild);
  }
  if (target) {
    target.innerHTML = '';
    target.appendChild(fragment);
    return target;
  }
  return fragment;
}

/**
 *  Extend component class with modulor methods
 *  @param {Class} baseClass Component class
 *  @return {ModulorComponent} Extended component class
 * */
exports.html = _html;
function extend(baseClass) {
  return function (_baseClass) {
    _inherits(_class, _baseClass);

    /**
     *  @constructs ModulorComponent
     *  @inner
     * */
    function _class() {
      _classCallCheck(this, _class);

      return _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this));
    }

    _createClass(_class, [{
      key: "toggleHighlight",


      //debug highlighting
      /**
       *  Toggle debug class on component
       *  @memberof ModulorComponent
       *  @instance
       *  @category debug
       */
      value: function toggleHighlight() {
        this.classList.toggle(this.componentType + '-highlighted');
      }

      /**
       *  Toggle debug class on component and child components
       *  @memberof ModulorComponent
       *  @instance
       *  @category debug
       */

    }, {
      key: "toggleHighlightAll",
      value: function toggleHighlightAll() {
        this.toggleHighlight();
        this.childComponents.forEach(function (child) {
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

    }, {
      key: "$",
      value: function $(selector) {
        return _$(selector, this);
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

    }, {
      key: "attr",
      value: function attr(key, value) {
        return _attr(this, key, value);
      }

      /**
       *  Add a class to the element
       *  @memberof ModulorComponent
       *  @instance
       *  @category DOM API
       *  @param {String} className Class name
       * */

    }, {
      key: "addClass",
      value: function addClass(className) {
        return _addClass(this, className);
      }

      /**
       *  Remove a class from the element
       *  @memberof ModulorComponent
       *  @instance
       *  @category DOM API
       *  @param {String} className Class name
       * */

    }, {
      key: "removeClass",
      value: function removeClass(className) {
        return _removeClass(this, className);
      }

      /**
       *  Toggle a class at the element
       *  @memberof ModulorComponent
       *  @instance
       *  @category DOM API
       *  @param {String} className Class name
       * */

    }, {
      key: "toggleClass",
      value: function toggleClass(className) {
        return _toggleClass(this, className);
      }

      /**
       *  Check if the element has a class
       *  @memberof ModulorComponent
       *  @instance
       *  @category DOM API
       *  @param {String} className Class name
       * */

    }, {
      key: "hasClass",
      value: function hasClass(className) {
        return _hasClass(this, className);
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

    }, {
      key: "html",
      value: function html(html_string) {
        var $el = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this;

        _html(html_string, $el);
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

    }, {
      key: "on",
      value: function on(eventName, selector, callback) {
        if (!callback) {
          callback = selector;
          selector = null;
        }
        _delegate.delegate.on(eventName, this, selector, callback);
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

    }, {
      key: "off",
      value: function off() {
        var eventName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
        var selector = arguments[1];
        var callback = arguments[2];

        if (!callback) {
          callback = selector;
          selector = null;
        }
        _delegate.delegate.off(eventName, this, selector, callback);
      }

      /**
       *  Fires an event on element
       *  @memberof ModulorComponent
       *  @instance
       *  @category events
       *  @param {String} eventName Event name
       *  @param {*} [eventData] Data to attach to event
       * */

    }, {
      key: "trigger",
      value: function trigger(eventName, eventData) {
        fireEvent(eventName, this, eventData);
      }

      //lifecycle callbacks

    }, {
      key: "connectedCallback",
      value: function connectedCallback() {
        this.trigger('component-attached');
        this.on('component-attached', function (event) {
          event.stopPropagation();
        });
        _get(_class.prototype.__proto__ || Object.getPrototypeOf(_class.prototype), "connectedCallback", this) && _get(_class.prototype.__proto__ || Object.getPrototypeOf(_class.prototype), "connectedCallback", this).call(this);
      }
    }, {
      key: "disconnectedCallback",
      value: function disconnectedCallback() {
        this.off();
        _get(_class.prototype.__proto__ || Object.getPrototypeOf(_class.prototype), "disconnectedCallback", this) && _get(_class.prototype.__proto__ || Object.getPrototypeOf(_class.prototype), "disconnectedCallback", this).call(this);
      }
    }, {
      key: "attributeChangedCallback",
      value: function attributeChangedCallback() {}
    }, {
      key: "__isModulor",
      get: function get() {
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

    }, {
      key: "childComponents",
      get: function get() {
        return walkDOM(this, function (node) {
          return node.__isModulor;
        }, function (node) {
          return node.__isModulor;
        });
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

    }, {
      key: "parentComponent",
      get: function get() {
        var parent = this;
        while (parent = parent.parentNode) {
          if (parent.__isModulor) {
            break;
          }
        }
        return parent;
      }
    }]);

    return _class;
  }(baseClass);
}

/**
 *  @class QueryableArray Extends array with querySelector(All) methods
 *  @extends Array
 *  @deprecated
 * */

var QueryableArray = exports.QueryableArray = function (_Array) {
  _inherits(QueryableArray, _Array);

  function QueryableArray() {
    _classCallCheck(this, QueryableArray);

    var _this2 = _possibleConstructorReturn(this, (QueryableArray.__proto__ || Object.getPrototypeOf(QueryableArray)).call(this));

    _this2.querySelector = function (selector) {
      for (var index = 0; index < _this2.length; index++) {
        if (_this2[index].matches(selector)) {
          return _this2[index];
        }
      }
      return null;
    };
    _this2.querySelectorAll = function (selector) {
      var output = new QueryableArray();
      for (var index = 0; index < _this2.length; index++) {
        _this2[index].matches(selector) && output.push(_this2[index]);
      }
      return output;
    };
    return _this2;
  }

  return QueryableArray;
}(Array);

/**
 *  @class BaseController Base controller
 * */


var BaseController = exports.BaseController = function (_extend) {
  _inherits(BaseController, _extend);

  function BaseController() {
    _classCallCheck(this, BaseController);

    return _possibleConstructorReturn(this, (BaseController.__proto__ || Object.getPrototypeOf(BaseController)).apply(this, arguments));
  }

  _createClass(BaseController, [{
    key: "componentType",
    get: function get() {
      return 'controller';
    }
  }]);

  return BaseController;
}(extend(HTMLElement));

/**
 *  @class BaseComponent Base component
 * */


var BaseComponent = exports.BaseComponent = function (_extend2) {
  _inherits(BaseComponent, _extend2);

  function BaseComponent() {
    _classCallCheck(this, BaseComponent);

    return _possibleConstructorReturn(this, (BaseComponent.__proto__ || Object.getPrototypeOf(BaseComponent)).apply(this, arguments));
  }

  _createClass(BaseComponent, [{
    key: "componentType",
    get: function get() {
      return 'component';
    }
  }]);

  return BaseComponent;
}(extend(HTMLElement));