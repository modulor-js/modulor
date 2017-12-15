//customElements
import 'document-register-element';
//import 'custom-elements-jest';

import {
  BaseComponent, BaseController,
  html, $, toArray, attr,
  addClass, removeClass, toggleClass, hasClass,
  fireEvent, walkDOM
} from '../src/modulor';

import * as domUtils from '../src/dom_utils';

/**
 *  @deprecated block. will be removed
 * */
describe('Dom utils proxy functions', () => {

  const $element = document.createElement('div');
  $element.innerHTML = `
    <div></div>
    <div></div>
  `;

  it('$ function', () => {
    const spy = jest.spyOn(domUtils, '$');
    $('div', $element);
    expect(spy).toHaveBeenCalledWith($element, 'div');
  });

  it('toArray function', () => {
    const spy = jest.spyOn(domUtils, 'toArray');
    const nodes = $('div', $element);
    toArray(nodes);
    expect(spy).toHaveBeenCalledWith(nodes);
  });

  it('attr function', () => {
    const spy = jest.spyOn(domUtils, 'attr');
    attr($element, 'foo', 'bar');
    expect(spy).toHaveBeenCalledWith('foo', 'bar', $element);
  });

  it('html function', () => {
    const spy = jest.spyOn(domUtils, 'html');
    html('ok', $element);
    expect(spy).toHaveBeenCalledWith($element, 'ok');

    const result = html('<span></span>');
    expect(result).toBeInstanceOf(DocumentFragment);
  });

  it('addClass function', () => {
    const spy = jest.spyOn(domUtils, 'addClass');
    addClass($element, 'foo');
    expect(spy).toHaveBeenCalledWith('foo', $element);
  });

  it('removeClass function', () => {
    const spy = jest.spyOn(domUtils, 'removeClass');
    removeClass($element, 'foo');
    expect(spy).toHaveBeenCalledWith('foo', $element);
  });

  it('toggleClass function', () => {
    const spy = jest.spyOn(domUtils, 'toggleClass');
    toggleClass($element, 'foo');
    expect(spy).toHaveBeenCalledWith('foo', $element);
  });

  it('hasClass function', () => {
    const spy = jest.spyOn(domUtils, 'hasClass');
    hasClass($element, 'foo');
    expect(spy).toHaveBeenCalledWith('foo', $element);
  });

  it('fireEvent function', () => {
    const spy = jest.spyOn(domUtils, 'fireEvent');
    const data = {};
    fireEvent('foo', $element, data);
    expect(spy).toHaveBeenCalledWith('foo', $element, data);
  });

  it('walkDOM function', () => {
    const spy = jest.spyOn(domUtils, 'walkDOM');
    const filterFn = () => {};
    const skipNodeFn = () => {};
    walkDOM($element, filterFn, skipNodeFn);
    expect(spy).toHaveBeenCalledWith($element, filterFn, skipNodeFn);
  });
});


describe('Single component functionality', () => {

  customElements.define('my-test-component', BaseComponent);

  let component = document.createElement('my-test-component');

  it('html function works correctly', () => {
    const fixture = `<div class="foo" data-test="bar">
        <div>
          <span>test</span>
        </div>
      </div><div>
        test 2
      </div>`;
    const refs = component.html(fixture);
    expect(component.innerHTML).toEqual(fixture);
    expect(refs).toBeInstanceOf(Object);
  });

  it('$ function works correctly', () => {
    let result = component.$('[data-test="bar"], span');
    expect(result).toBeInstanceOf(Array);
    expect(result).toHaveLength(2);
  });

  it('attr function works correctly', () => {
    component.attr('foo', 'bar');
    expect(component.attr('foo')).toEqual('bar');
    component.attr('foo', null);
    expect(component.hasAttribute('foo')).toEqual(false);
  });

  it('class functions works correctly', () => {
    component.addClass('foo');
    expect(component.classList.contains('foo')).toEqual(true);
    component.removeClass('foo');
    expect(component.classList.contains('foo')).toEqual(false);
    component.toggleClass('foo');
    expect(component.classList.contains('foo')).toEqual(true);
    expect(component.classList.contains('foo')).toEqual(component.hasClass('foo'));
    component.toggleClass('foo');
    expect(component.classList.contains('foo')).toEqual(false);
  });

  it('toggles debug class correctly', () => {
    component.toggleHighlight();
    expect(component.classList.contains('component-highlighted')).toEqual(true);
    component.toggleHighlight();
    expect(component.classList.contains('component-highlighted')).toEqual(false);
  });

  it('triggers events correctly', () => {
    let handler = jest.fn();
    component.addEventListener('test-event', handler);
    component.trigger('test-event');
    expect(handler).toHaveBeenCalledTimes(1);
  });

  it('passes event data correctly', () => {
    let data;
    let handler = jest.fn(({eventData}) => { data = eventData });
    component.addEventListener('test-event', handler);
    component.trigger('test-event', { foo: 'bar' });
    expect(data).toEqual({ foo: 'bar' });
  });

  it('proxies attributes', () => {

    const testData = { "prop": true };
    const attributeProxyFn = jest.fn();

    let $container = document.createElement('div');

    $container.innerHTML = `
      <my-component foo="1" bar="ok" baz='${JSON.stringify(testData)}' qux="true" fred="test"></my-component>
    `;

    document.body.appendChild($container);

    const $component = $container.querySelector('my-component');

    class MyComponent extends BaseComponent {

      static get observedAttributes() {
        return ['foo', 'bar', 'baz', 'qux', 'fred'];
      }

      get proxyAttributes(){
        return {
          foo: Number,
          bar: String,
          baz: JSON.parse,
          qux: attributeProxyFn
        };
      }
    };

    customElements.define('my-component', MyComponent);

    expect($component.foo).toEqual(1);
    expect($component.bar).toEqual('ok');
    expect($component.baz).toEqual(testData);
    expect($component.fred).toBeUndefined();
    expect(attributeProxyFn).toBeCalledWith('true', null);

    $component.setAttribute('foo', 2);
    expect($component.foo).toEqual(2);
  });

});

describe('Complex functionality', () => {

  class RootController extends BaseController {}
  class ChildController extends BaseController {}
  class ComponentOne extends BaseComponent {}
  class ComponentTwo extends BaseComponent {}
  class ComponentThree extends BaseComponent {}


  let container = document.createElement('div');

  document.body.appendChild(container);

  container.innerHTML = `
    <root-controller>
      <component-one>
      </component-one>
      <component-one>
      </component-one>
      <child-controller>
        <component-two>
        </component-two>
        <component-three>
        </component-three>
      </child-controller>
    </root-controller>
  `;

  let components_map = {
    'root-controller': RootController,
    'child-controller': ChildController,
    'component-one': ComponentOne,
    'component-two': ComponentTwo,
    'component-three': ComponentThree,
  };

  Object.keys(components_map).forEach((component_name) => {
    customElements.define(component_name, components_map[component_name]);
  });

  let components_elements = Object.keys(components_map)
                                  .reduce((acc, component_name) => {
    return Object.assign(acc, {
      [component_name]: container.querySelectorAll(component_name)
    });
  }, {});


  it('creates child components correctly', () => {
    let root_child_components = components_elements['root-controller'][0].childComponents;
    expect(root_child_components.length).toEqual(3);
    expect(root_child_components[0]).toEqual(components_elements['component-one'][0]);
    expect(root_child_components[1]).toEqual(components_elements['component-one'][1]);
    expect(root_child_components[2]).toEqual(components_elements['child-controller'][0]);
    let child_controller_child_components = components_elements['child-controller'][0].childComponents;
    expect(child_controller_child_components.length).toEqual(2);
    expect(child_controller_child_components[0]).toEqual(components_elements['component-two'][0]);
    expect(child_controller_child_components[1]).toEqual(components_elements['component-three'][0]);
  });

  it('highlights components correctly', () => {
    components_elements['root-controller'][0].toggleHighlightAll();
    expect(components_elements['component-one'][0].classList.contains('component-highlighted')).toEqual(true);
    expect(components_elements['component-one'][1].classList.contains('component-highlighted')).toEqual(true);
    expect(components_elements['child-controller'][0].classList.contains('controller-highlighted')).toEqual(true);
    expect(components_elements['component-two'][0].classList.contains('component-highlighted')).toEqual(true);
    expect(components_elements['component-three'][0].classList.contains('component-highlighted')).toEqual(true);
    components_elements['child-controller'][0].toggleHighlightAll();
    expect(components_elements['component-one'][0].classList.contains('component-highlighted')).toEqual(true);
    expect(components_elements['component-one'][1].classList.contains('component-highlighted')).toEqual(true);
    expect(components_elements['child-controller'][0].classList.contains('controller-highlighted')).toEqual(false);
    expect(components_elements['component-two'][0].classList.contains('component-highlighted')).toEqual(false);
    expect(components_elements['component-three'][0].classList.contains('component-highlighted')).toEqual(false);
  });

  it('finds parent component correctly', () => {
    expect(components_elements['component-two'][0].parentComponent).toEqual(components_elements['child-controller'][0]);
    expect(components_elements['component-three'][0].parentComponent).not.toEqual(components_elements['root-controller'][0]);
    expect(components_elements['child-controller'][0].parentComponent).toEqual(components_elements['root-controller'][0]);
  });

  it('handles events correctly', () => {
    let handler1 = jest.fn();
    let handler2 = jest.fn();
    components_elements['child-controller'][0].on('test-event', handler1);
    components_elements['child-controller'][0].on('test-event', 'component-three', handler2);
    components_elements['component-two'][0].trigger('test-event');
    components_elements['component-three'][0].trigger('test-event');
    expect(handler1).toHaveBeenCalledTimes(2);
    expect(handler2).toHaveBeenCalledTimes(1);
  });

  it('deletes child components correctly', () => {
    components_elements['component-one'][0].remove();
    expect(components_elements['root-controller'][0].childComponents.length).toEqual(2);
    expect(components_elements['root-controller'][0].childComponents[0]).toEqual(components_elements['component-one'][1]);
    expect(components_elements['root-controller'][0].childComponents[1]).toEqual(components_elements['child-controller'][0]);
    components_elements['component-two'][0].remove();
    expect(components_elements['child-controller'][0].childComponents.length).toEqual(1);
    expect(components_elements['child-controller'][0].childComponents[0]).toEqual(components_elements['component-three'][0]);
  });

});
