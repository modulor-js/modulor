import {
  html, $, attr,
  addClass, removeClass, toggleClass, hasClass,
  fireEvent, walkDOM
} from '../src/dom_utils';

describe('Dom utils module', () => {

  const component = document.createElement('div');

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
    html(fixture, component);
    expect(component.innerHTML).toEqual(fixture);
  });

  it('$ function works correctly', () => {
    let result = $('[data-test="bar"], span', component);
    expect(result instanceof Array).toBe(true);
    expect(result.length).toBe(2);
  });

  it('attr function works correctly', () => {
    attr(component, 'foo', 'bar');
    expect(attr(component, 'foo')).toEqual('bar');
    attr(component, 'foo', null);
    expect(component.hasAttribute('foo')).toEqual(false);
  });

  it('class functions works correctly', () => {
    addClass(component, 'foo');
    expect(component.classList.contains('foo')).toEqual(true);
    removeClass(component, 'foo');
    expect(component.classList.contains('foo')).toEqual(false);
    toggleClass(component, 'foo');
    expect(component.classList.contains('foo')).toEqual(true);
    expect(component.classList.contains('foo')).toEqual(hasClass(component, 'foo'));
    toggleClass(component, 'foo');
    expect(component.classList.contains('foo')).toEqual(false);
  });

  it('triggers events correctly', () => {
    let handler = jest.fn();
    component.addEventListener('test-event', handler);
    fireEvent('test-event', component);
    expect(handler).toHaveBeenCalledTimes(1);
  });

  it('passes event data correctly', () => {
    let data;
    let handler = jest.fn(({eventData}) => { data = eventData });
    component.addEventListener('test-event', handler);
    fireEvent('test-event', component, { foo: 'bar' });
    expect(data).toEqual({ foo: 'bar' });
  });

});
