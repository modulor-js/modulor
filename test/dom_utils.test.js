import {
  html, $, createElement, append, prepend, attr, getRefs,
  addClass, removeClass, toggleClass, hasClass,
  fireEvent, walkDOM
} from '../src/dom_utils';

describe('Dom utils module', () => {

  const component = document.createElement('div');

  describe('html()', () => {
    const fixture = `<div class="foo" data-test="bar">
        <div>
          <span>test</span>
        </div>
      </div><div>
        test 2
      </div>`;

    it('renders fragment from string', () => {
      const $fragment = html(fixture)[0];
      expect($fragment).toBeInstanceOf(DocumentFragment);
      expect($fragment.childNodes).toHaveLength(2);
    });

    it('renders html into node', () => {
      html(component, fixture);
      expect(component.innerHTML).toEqual(fixture);
    });

    it('takes node as 2nd argument', () => {
      const $parent = document.createElement('div');
      const $element = document.createElement('div');
      html($parent, $element);
      expect($parent.childNodes).toHaveLength(1);
      expect($parent.firstChild).toEqual($element);
    });

    it('returns correct tuple', () => {
      const $parent = document.createElement('div');
      const result = html($parent, `
        <div ref="single"></div>
        <div refs="multiple"></div>
      `);
      expect(result).toHaveLength(2);
      expect(result[0]).toBe($parent);
      expect(result[1]).toEqual(expect.objectContaining({
        single: expect.any(HTMLElement),
        multiple: expect.any(Array),
      }));
    });

    it('patches elements', async () => {
      const $parent = document.createElement('div');
      const result = html($parent, `
        <div ref="single"></div>
        <div refs="multiple"></div>
        <div refs="multiple"></div>
      `)[1];
      expect(result.single.whenComponentConnected).toBeInstanceOf(Promise);
      expect(result.single.__whenConnectedResolver).toBeInstanceOf(Function);

      expect(result.multiple[0].whenComponentConnected).toBeInstanceOf(Promise);
      expect(result.multiple[0].__whenConnectedResolver).toBeInstanceOf(Function);

      expect(result.multiple[1].whenComponentConnected).toBeInstanceOf(Promise);
      expect(result.multiple[1].__whenConnectedResolver).toBeInstanceOf(Function);

      const handlerSingle = jest.fn();
      const handlerMultiple0 = jest.fn();
      const handlerMultiple1 = jest.fn();

      result.single.whenComponentConnected.then(handlerSingle);
      result.single.__whenConnectedResolver();
      await result.single.whenComponentConnected;
      expect(handlerSingle).toHaveBeenCalledWith(result.single);
    });

    it('functional', () => {
      const $parent = document.createElement('div');
      const render = html($parent);
      render(fixture);
      expect($parent.innerHTML).toEqual(fixture);
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

  describe('append()', () => {
    it('classic', () => {
      const $parent = document.createElement('div');
      const $child = document.createElement('div');
      const $child1 = document.createElement('div');
      const $child2 = document.createElement('div');

      expect(append($parent, $child)).toBe($parent);
      expect($parent.firstChild).toBe($child);

      prepend($parent, $child1);
      expect($parent.firstChild).toBe($child1);

      append($parent, $child2);
      expect($parent.lastChild).toBe($child2);
      expect($parent.children[1]).toBe($child);
    });

    it('functional', () => {
      const $parent = document.createElement('div');
      const $child = document.createElement('div');
      const $child1 = document.createElement('div');
      const $child2 = document.createElement('div');

      const fnAppend = append($parent);
      const fnPrepend = prepend($parent);

      expect(fnAppend).toBeInstanceOf(Function);
      expect(fnPrepend).toBeInstanceOf(Function);


      expect(fnAppend($child)).toBe($parent);
      expect($parent.firstChild).toBe($child);

      expect(fnPrepend($child1)).toBe($parent);
      expect($parent.firstChild).toBe($child1);

      fnAppend($child2);
      expect($parent.lastChild).toBe($child2);
      expect($parent.children[1]).toBe($child);
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

  it('getRefs()', () => {
    const fixture = `
      <div ref="first-block">
          <span refs="children"></span>
          <span refs="children"></span>
          <span refs="children"></span>
      </div>
      <div ref="second-block">
        test 2
      </div>
    `;
    const $fragment = document.createElement('div');
    $fragment.innerHTML = fixture;
    const $firstBlock = $fragment.querySelector('[ref="first-block"]');
    const $secondBlock = $fragment.querySelector('[ref="second-block"]');
    const $childrenList = $fragment.querySelectorAll('[refs="children"]');
    const refs = getRefs($fragment);

    expect(refs['first-block']).toBe($firstBlock);
    expect(refs['second-block']).toBe($secondBlock);

    expect(refs['children'][0]).toBe($childrenList[0]);
    expect(refs['children'][1]).toBe($childrenList[1]);
    expect(refs['children'][2]).toBe($childrenList[2]);
  });

});
