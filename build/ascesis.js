"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BaseComponent = exports.BaseController = exports.html = exports.hasClass = exports.toggleClass = exports.removeClass = exports.addClass = exports.attr = exports.$ = undefined;

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.walkDOM = walkDOM;
exports.toArray = toArray;
exports.fireEvent = fireEvent;
exports.extend = extend;

var _delegate = require("./delegate");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _$(selector) {
  var element = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;

  return toArray(element.querySelectorAll(selector));
}

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

exports.attr = _attr;
function _addClass(element, className) {
  return element.classList.add(className);
}

exports.addClass = _addClass;
function _removeClass(element, className) {
  return element.classList.remove(className);
}

exports.removeClass = _removeClass;
function _toggleClass(element, className) {
  return element.classList.toggle(className);
}

exports.toggleClass = _toggleClass;
function _hasClass(element, className) {
  return element.classList.contains(className);
}

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

function toArray(nodes) {
  var arr = [];
  for (var i = 0, ref = arr.length = nodes.length; i < ref; i++) {
    arr[i] = nodes[i];
  }
  return arr;
}

function fireEvent(eventName, target, eventData) {
  target = target || document.body;
  var event;
  try {
    event = new Event(eventName, { "bubbles": true, "cancelable": true });
  } catch (e) {
    event = document.createEvent('Event');
    event.initEvent(eventName, true, true);
  }
  event.eventData = eventData || null;
  target.dispatchEvent(event);
}

function _html(html_string, target) {
  var fragment = document.createDocumentFragment();
  var temp_container = document.createElement('div');
  temp_container.innerHTML = html_string;
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

//deprecated
exports.html = _html;

var QueryableArray = function (_Array) {
  _inherits(QueryableArray, _Array);

  function QueryableArray() {
    _classCallCheck(this, QueryableArray);

    var _this = _possibleConstructorReturn(this, (QueryableArray.__proto__ || Object.getPrototypeOf(QueryableArray)).call(this));

    _this.querySelector = function (selector) {
      for (var index = 0; index < _this.length; index++) {
        if (_this[index].matches(selector)) {
          return _this[index];
        }
      }
      return null;
    };
    _this.querySelectorAll = function (selector) {
      var output = new QueryableArray();
      for (var index = 0; index < _this.length; index++) {
        _this[index].matches(selector) && output.push(_this[index]);
      }
      return output;
    };
    return _this;
  }

  return QueryableArray;
}(Array);

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

function extend(baseClass) {
  return function (_baseClass) {
    _inherits(_class, _baseClass);

    function _class() {
      _classCallCheck(this, _class);

      return _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this));
    }

    _createClass(_class, [{
      key: "toggleHighlight",


      //debug highlighting

      value: function toggleHighlight() {
        this.classList.toggle(this.componentType + '-highlighted');
      }
    }, {
      key: "toggleHighlightAll",
      value: function toggleHighlightAll() {
        this.toggleHighlight();
        this.childComponents.forEach(function (child) {
          child.toggleHighlightAll();
        });
      }

      //DOM

    }, {
      key: "$",
      value: function $(selector) {
        return _$(selector, this);
      }
    }, {
      key: "attr",
      value: function attr(key, value) {
        return _attr(this, key, value);
      }
    }, {
      key: "addClass",
      value: function addClass(className) {
        return _addClass(this, className);
      }
    }, {
      key: "removeClass",
      value: function removeClass(className) {
        return _removeClass(this, className);
      }
    }, {
      key: "toggleClass",
      value: function toggleClass(className) {
        return _toggleClass(this, className);
      }
    }, {
      key: "hasClass",
      value: function hasClass(className) {
        return _hasClass(this, className);
      }
    }, {
      key: "html",
      value: function html(html_string) {
        _html(html_string, this);
      }

      //events

    }, {
      key: "on",
      value: function on(eventName, selector, callback) {
        if (!callback) {
          callback = selector;
          selector = null;
        }
        _delegate.delegate.on(eventName, this, selector, callback);
      }
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
      key: "__isAscesis",
      get: function get() {
        return true;
      }
    }, {
      key: "childComponents",
      get: function get() {
        return walkDOM(this, function (node) {
          return node.__isAscesis;
        }, function (node) {
          return node.__isAscesis;
        });
      }
    }, {
      key: "parentComponent",
      get: function get() {
        var parent = this;
        while (parent = parent.parentNode) {
          if (parent.__isAscesis) {
            break;
          }
        }
        return parent;
      }
    }]);

    return _class;
  }(baseClass);
}