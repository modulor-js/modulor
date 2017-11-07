//customElements
require('document-register-element');

let { BaseComponent, BaseController, toArray, extend } = require('../src/modulor');


describe('Single component functionality', () => {

  let component;

  customElements.define('my-test-component', BaseComponent);

  beforeAll((done) => {
    customElements.whenDefined('my-test-component').then(() => {
      component = document.createElement('my-test-component');
      done();
    });
  });

  it('html function works correctly', () => {
    const fixture = `
      <div class="foo" data-test="bar">
        <div>
          <span>test</span>
        </div>
      </div>
      <div>
        test 2
      </div>
    `;
    component.html(fixture);
    expect(component.innerHTML, fixture);
  });

  it('$ function works correctly', () => {
    let result = component.$('[data-test="bar"], span');
    expect(result instanceof Array, true);
    expect(result.length, 2);
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

  beforeAll((done) => {
    let promises = Object.keys(components_map).map((component_name) => {
      return customElements.whenDefined(component_name);
    });
    Promise.all(promises).then(() => {
      done();
    });
  });


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

  //deprecated
  it('child components selectors work correctly', () => {
    let child_controller = components_elements['root-controller'][0].childComponents.querySelector('child-controller');
    expect(child_controller).toEqual(components_elements['child-controller'][0]);
    let component_one = components_elements['root-controller'][0].childComponents.querySelectorAll('component-one');
    expect(component_one.length).toEqual(2);
    expect(component_one[0]).toEqual(components_elements['component-one'][0]);
    expect(component_one[1]).toEqual(components_elements['component-one'][1]);
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
