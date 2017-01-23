import { BaseComponent, BaseController, toArray } from '../build/ascesis';

describe('Single component functionality', (done) => {

  let component;

  customElements.define('my-test-component', BaseComponent);

  before((done) => {
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
    assert.equal(component.innerHTML, fixture);
  });

  it('$ function works correctly', () => {
    let result = component.$('[data-test="bar"], span');
    assert.equal(result instanceof Array, true);
    assert.equal(result.length, 2);
  });

  it('attr function works correctly', () => {
    component.attr('foo', 'bar');
    assert.equal(component.attr('foo'), 'bar');
    component.attr('foo', null);
    assert.equal(component.hasAttribute('foo'), false);
  });

  it('toggles debug class correctly', () => {
    component.toggleHighlight();
    assert.equal(component.classList.contains('component-highlighted'), true);
    component.toggleHighlight();
    assert.equal(component.classList.contains('component-highlighted'), false);
  });

  it('triggers events correctly', () => {
    let handler = chai.spy(() => {});
    component.addEventListener('test-event', handler);
    component.trigger('test-event');
    expect(handler).to.have.been.called.once;
  });

  it('passes event data correctly', () => {
    let data;
    let handler = chai.spy(({eventData}) => { data = eventData });
    component.addEventListener('test-event', handler);
    component.trigger('test-event', { foo: 'bar' });
    assert.deepEqual(data, { foo: 'bar' });
  });

});


describe('Complex functionality', (done) => {

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

  before((done) => {
    let promises = Object.keys(components_map).map((component_name) => {
      return customElements.whenDefined(component_name);
    });
    Promise.all(promises).then(() => {
      done();
    });
  });


  it('creates child components correctly', () => {
    let root_child_components = components_elements['root-controller'][0].childComponents;
    assert.equal(root_child_components.length, 3);
    assert.equal(root_child_components[0], components_elements['component-one'][0]);
    assert.equal(root_child_components[1], components_elements['component-one'][1]);
    assert.equal(root_child_components[2], components_elements['child-controller'][0]);
    let child_controller_child_components = components_elements['child-controller'][0].childComponents;
    assert.equal(child_controller_child_components.length, 2);
    assert.equal(child_controller_child_components[0], components_elements['component-two'][0]);
    assert.equal(child_controller_child_components[1], components_elements['component-three'][0]);
  });

  it('highlights components correctly', () => {
    components_elements['root-controller'][0].toggleHighlightAll();
    assert.equal(components_elements['component-one'][0].classList.contains('component-highlighted'), true);
    assert.equal(components_elements['component-one'][1].classList.contains('component-highlighted'), true);
    assert.equal(components_elements['child-controller'][0].classList.contains('controller-highlighted'), true);
    assert.equal(components_elements['component-two'][0].classList.contains('component-highlighted'), true);
    assert.equal(components_elements['component-three'][0].classList.contains('component-highlighted'), true);
    components_elements['child-controller'][0].toggleHighlightAll();
    assert.equal(components_elements['component-one'][0].classList.contains('component-highlighted'), true);
    assert.equal(components_elements['component-one'][1].classList.contains('component-highlighted'), true);
    assert.equal(components_elements['child-controller'][0].classList.contains('controller-highlighted'), false);
    assert.equal(components_elements['component-two'][0].classList.contains('component-highlighted'), false);
    assert.equal(components_elements['component-three'][0].classList.contains('component-highlighted'), false);
  });

  it('finds parent component correctly', () => {
    assert.equal(components_elements['component-two'][0].parentComponent, components_elements['child-controller'][0]);
    assert.notEqual(components_elements['component-three'][0].parentComponent, components_elements['root-controller'][0]);
    assert.equal(components_elements['child-controller'][0].parentComponent, components_elements['root-controller'][0]);
  });

  it('child components selectors work correctly', () => {
    let child_controller = components_elements['root-controller'][0].childComponents.querySelector('child-controller');
    assert.equal(child_controller, components_elements['child-controller'][0]);
    let component_one = components_elements['root-controller'][0].childComponents.querySelectorAll('component-one');
    assert.equal(component_one.length, 2);
    assert.deepEqual(component_one[0], components_elements['component-one'][0]);
    assert.deepEqual(component_one[1], components_elements['component-one'][1]);
  });

  it('deletes child components correctly', () => {
    components_elements['component-one'][0].remove();
    assert.equal(components_elements['root-controller'][0].childComponents.length, 2);
    assert.equal(components_elements['root-controller'][0].childComponents[0], components_elements['component-one'][1]);
    assert.equal(components_elements['root-controller'][0].childComponents[1], components_elements['child-controller'][0]);
    components_elements['component-two'][0].remove();
    assert.equal(components_elements['child-controller'][0].childComponents.length, 1);
    assert.equal(components_elements['child-controller'][0].childComponents[0], components_elements['component-three'][0]);
  });

});
