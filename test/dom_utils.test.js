import {
  html, $, createElement, attr,
  addClass, removeClass, toggleClass, hasClass,
  fireEvent, walkDOM
} from '../src/dom_utils';

describe('Dom utils module', () => {

  const component = document.createElement('div');

  describe('html()', () => {
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
  });

  describe('$()', () => {
    const selector = '[data-test="bar"], span';

    it('classic', () => {
      const result = $(component, selector);
      expect(result).toBeInstanceOf(Array);
      expect(result).toHaveLength(2);
    });

    it('functional', () => {
      const fn = $(component);
      expect(fn).toBeInstanceOf(Function);
      const result = fn(selector);
      expect(result).toHaveLength(2);
    });
  });

  describe('attr()', () => {
    it('classic', () => {
      const $el = attr('foo', 'bar', component);
      expect($el).toBe(component);
      expect(attr('foo', component)).toEqual('bar');
      attr('foo', null, component);
      expect(component.hasAttribute('foo')).toEqual(false);
    });

    it('functional', () => {
      const fnSetter = attr('foo', 'bar');
      const fnGetter = attr('foo');
      expect(fnSetter).toBeInstanceOf(Function);
      expect(fnGetter).toBeInstanceOf(Function);
      const $el = fnSetter(component);
      expect($el).toBe(component);
      expect(component.getAttribute('foo')).toBe('bar');
      expect(fnGetter(component)).toBe('bar');
    });
  });

  describe('class functions', () => {
    it('classic', () => {
      addClass('foo', component);
      expect(component.classList.contains('foo')).toEqual(true);

      expect(removeClass('foo', component)).toBe(component);
      expect(component.classList.contains('foo')).toEqual(false);

      expect(toggleClass('foo', component)).toBe(component);
      expect(component.classList.contains('foo')).toEqual(true);
      expect(hasClass('foo', component)).toBe(true);
      toggleClass('foo', component);
      expect(component.classList.contains('foo')).toEqual(false);
      expect(hasClass('foo', component)).toBe(false);
    });

    it('functional', () => {
      const fnAdd = addClass('bar');
      expect(fnAdd).toBeInstanceOf(Function);
      expect(fnAdd(component)).toBe(component);
      expect(component.classList.contains('bar')).toEqual(true);

      const fnRemove = removeClass('bar');
      expect(fnRemove).toBeInstanceOf(Function);
      expect(fnRemove(component)).toBe(component);
      expect(component.classList.contains('bar')).toEqual(false);

      const fnToggle = toggleClass('bar');
      const fnHas = hasClass('bar');
      expect(fnToggle).toBeInstanceOf(Function);
      expect(fnToggle(component)).toBe(component);
      expect(component.classList.contains('bar')).toEqual(true);
      expect(fnHas(component)).toBe(true);
      fnToggle(component);
      expect(component.classList.contains('bar')).toEqual(false);
      expect(fnHas(component)).toBe(false);
    });
  });

  describe('events', () => {
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

  it('createElement()', () => {
    const $element = createElement('input', {
      foo: 'bar',
      value: 'test'
    });

    expect($element).toBeInstanceOf(HTMLElement);

    expect($element.getAttribute('value')).toBe(null);
    expect($element.value).toBe('test');

    expect($element.getAttribute('foo')).toBe('bar');
    expect($element.foo).toBeUndefined();
  });

});
