export function $(selector, element = document){
  return toArray(element.querySelectorAll(selector));
}

export function attr(element, key, value){
  if(value){
    return element.setAttribute(key, value);
  }
  if(value === null){
    return element.removeAttribute(key);
  }
  return element.getAttribute(key);
}

export function addClass(element, className){
  return element.classList.add(className);
}

export function removeClass(element, className){
  return element.classList.remove(className);
}

export function toggleClass(element, className){
  return element.classList.toggle(className);
}

export function hasClass(element, className){
  return element.classList.contains(className);
}

export function walkDOM(node, filter = () => true, skipNode = () => false) {
  let arr = new QueryableArray();
  let loop = (node) => toArray(node.children).forEach((child) => {
    filter(child) && arr.push(child);
    (!skipNode(child) && child.hasChildNodes()) && loop(child);
  });
  loop(node);
  return arr;
}

export function toArray(nodes){
  let arr = [];
  for (let i = 0, ref = arr.length = nodes.length; i < ref; i++){
   arr[i] = nodes[i];
  }
  return arr;
}

export function fireEvent(eventName, target, eventData){
  target = target || document.body;
  var event;
  try {
    event = new Event(eventName, { "bubbles": true, "cancelable": true });
  } catch(e) {
    event = document.createEvent('Event');
    event.initEvent(eventName, true, true);
  }
  event.eventData = eventData || null;
  target.dispatchEvent(event);
}

export function html(html_string, target){
  var fragment = document.createDocumentFragment();
  var temp_container = document.createElement('div');
  temp_container.innerHTML = html_string;
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

//deprecated
class QueryableArray extends Array {
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

export class BaseController extends extend(HTMLElement) {
  get componentType(){ return 'controller'; }
}

export class BaseComponent extends extend(HTMLElement) {
  get componentType(){ return 'component'; }
}

export function extend(baseClass){
  return class extends baseClass {
    constructor(){
      super();
    }

    get __isAscesis(){
      return true;
    }

    get childComponents(){
      return walkDOM(this, (node) => node.__isAscesis, (node) => node.__isAscesis);
    }

    get parentComponent(){
      let parent = this;
      while(parent = parent.parentNode){
        if(parent.__isAscesis){
          break;
        }
      }
      return parent;
    }

    toggleHighlight(){
      this.classList.toggle(this.componentType + '-highlighted');
    }

    toggleHighlightAll(){
      this.toggleHighlight();
      this.childComponents.forEach(function(child){
        child.toggleHighlightAll();
      });
    }

    $(selector){
      return $(selector, this);
    }

    attr(key, value){
      return attr(this, key, value);
    }

    addClass(className){
      return addClass(this, className);
    }

    removeClass(className){
      return removeClass(this, className);
    }

    toggleClass(className){
      return toggleClass(this, className);
    }

    hasClass(className){
      return hasClass(this, className);
    }

    trigger(eventName, eventData){
      fireEvent(eventName, this, eventData);
    }

    html(html_string){
      html(html_string, this);
    }

    connectedCallback(){
      this.trigger('component-attached');
      this.addEventListener('component-attached', (event) => {
        event.stopPropagation();
      });
      super.connectedCallback && super.connectedCallback();
    }

    disconnectedCallback(){
      super.disconnectedCallback && super.disconnectedCallback();
    }

    attributeChangedCallback(){}
  }
}
