"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.fireEvent = fireEvent;
exports.extend = extend;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function fireEvent(eventName, target, eventData) {
  target = target || document.body;
  var event;
  if (window.Event) {
    event = new Event(eventName, { "bubbles": true, "cancelable": true });
  } else {
    event = document.createEvent('Event');
    event.initEvent(eventName, true, true);
  }
  event.eventData = eventData || null;
  target.dispatchEvent(event);
}

var ChildComponents = function (_Array) {
  _inherits(ChildComponents, _Array);

  function ChildComponents() {
    _classCallCheck(this, ChildComponents);

    var _this = _possibleConstructorReturn(this, (ChildComponents.__proto__ || Object.getPrototypeOf(ChildComponents)).call(this));

    _this.querySelector = function (selector) {
      for (var index = 0; index < _this.length; index++) {
        if (_this[index].matches(selector)) {
          return _this[index];
        }
      }
      return null;
    };
    _this.querySelectorAll = function (selector) {
      var output = [];
      for (var index = 0; index < _this.length; index++) {
        _this[index].matches(selector) && output.push(_this[index]);
      }
      return output;
    };
    return _this;
  }

  return ChildComponents;
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
    }, {
      key: "removeChildComponent",
      value: function removeChildComponent(childComponent) {
        var index = this.childComponents.indexOf(childComponent);
        this.childComponents.splice(index, 1);
      }
    }, {
      key: "trigger",
      value: function trigger(eventName, eventData) {
        fireEvent(eventName, this, eventData);
      }
    }, {
      key: "html",
      value: function html(html_string) {
        var fragment = document.createDocumentFragment();
        var temp_container = document.createElement('div');
        temp_container.innerHTML = html_string;
        while (temp_container.firstChild) {
          fragment.appendChild(temp_container.firstChild);
        }
        this.innerHTML = "";
        this.appendChild(fragment);
      }
    }, {
      key: "addDisconnectListener",
      value: function addDisconnectListener(callback) {
        this.disconnectListeners.push(callback);
      }
    }, {
      key: "connectedCallback",
      value: function connectedCallback() {
        var _this5 = this;

        this.disconnectListeners = [];
        this.childComponents = new ChildComponents();
        this.trigger('component-attached');
        this.addEventListener('component-attached', function (event) {
          event.stopPropagation();
          event.target.parentComponent = _this5;
          _this5.childComponents.push(event.target);
          event.target.addDisconnectListener(function (target) {
            _this5.removeChildComponent(target);
          });
        });
        _get(_class.prototype.__proto__ || Object.getPrototypeOf(_class.prototype), "connectedCallback", this) && _get(_class.prototype.__proto__ || Object.getPrototypeOf(_class.prototype), "connectedCallback", this).call(this);
      }
    }, {
      key: "disconnectedCallback",
      value: function disconnectedCallback() {
        var _this6 = this;

        this.disconnectListeners.forEach(function (listener) {
          listener(_this6);
        });
        _get(_class.prototype.__proto__ || Object.getPrototypeOf(_class.prototype), "disconnectedCallback", this) && _get(_class.prototype.__proto__ || Object.getPrototypeOf(_class.prototype), "disconnectedCallback", this).call(this);
      }
    }, {
      key: "attributeChangedCallback",
      value: function attributeChangedCallback() {}
    }]);

    return _class;
  }(baseClass);
}