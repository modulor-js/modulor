let { createDelegate } = require('../src/delegate');
let { fireEvent, attr } = require('../src/ascesis');
let { Router } = require('../src/new_router');


//describe.only('new router', () => {

  //let r = new Router();
  //r.add('/:foo/:bar', (foo, bar) => {
    //console.log(111111, foo, bar);
    //return true;
  //});

  //let r1 = new Router();
  //r1.add('/:foo/:bar?/:bla?', (foo, bar) => {
    //console.log(2222222, foo, bar);
    //return true;
  //});
  //r.mount('/foo', r1);
  ////console.log(r.container.innerHTML);
  //window.history.pushState(null, null, '/foo/bar');
  ////console.log(r1.getPath());
  ////r.resolve();
  //fireEvent('url-changed', window);

  //r1.navigate('/test')
  //console.log(window.location.href)


  //it('foo', () => {
    ////console.dir(window.location);
    //expect(true);
  //});
//})

describe('Base functionality', () => {
  beforeAll(() => {
    //set initial url to /
    window.history.replaceState(null, null, '/');
  });

  afterAll(() => {
    //set initial url to /
    window.history.replaceState(null, null, '/');
  });

  const router = new Router();

  it('returns root correctly', () => {
    expect(router.getRoot()).toBe('/');
  });

  it('matches root correctly', () => {
    expect(router.rootMatches()).toBe(true);
  });

  it('returns query string correctly', () => {
    expect(router.getQs()).toBe(false);
    window.history.replaceState(null, null, '/?foo=bar');
    expect(router.getQs()).toBe('foo=bar');
    window.history.replaceState(null, null, '/?foo=bar&bar=baz');
    expect(router.getQs()).toBe('foo=bar&bar=baz');
  });

  it('returns query params correctly', () => {
    window.history.replaceState(null, null, '/');
    expect(router.getParams()).toEqual({});
    window.history.replaceState(null, null, '/?foo');
    expect(router.getParams()).toEqual({ foo: undefined });
    window.history.replaceState(null, null, '/?foo=bar');
    expect(router.getParams()).toEqual({ foo: 'bar' });
    window.history.replaceState(null, null, '/?foo=bar&bar=baz');
    expect(router.getParams()).toEqual({ foo: 'bar', bar: 'baz' });
  });

  it('returns absolute path correctly', () => {
    expect(router.getGlobalPath()).toEqual('/');
  });

  it('returns relative path correctly', () => {
    expect(router.getPath()).toEqual('/');
  });

  //it('adds handlers correctly', () => {
    //let handler = () => {};
    //router.add('/', handler);
    //expect(router.listeners.length).toEqual(1);
    //expect(router.listeners[0].callback).toEqual(handler);
  //});

  it('navigates correctly', () => {
    router.navigate('/bar');
    expect(router.getPath()).toEqual('/bar');
  });

  it('handles route correctly', () => {
    let handler = jest.fn(() => {});
    router.add('/foo', handler);
    router.navigate('/foo');
    expect(handler).toHaveBeenCalledTimes(1);
  });

  //it('destroys correctly', () => {
    //let handler = jest.fn(() => {});
    //router.add('/bar', handler);
    //router.destroy();
    //router.navigate('/bar');
    //expect(handler).not.toHaveBeenCalled();
    //expect(router.listeners).toEqual([]);
  //});
});

describe('Mount on subpath', () => {
  beforeEach(() => {
    //set initial url to /
    window.history.replaceState(null, null, '/');
  });

  afterEach(() => {
    //set initial url to /
    window.history.replaceState(null, null, '/');
  });

  const router = new Router({
    base: '/subpath'
  });

  it('matches root correctly', () => {
    expect(router.rootMatches()).toEqual(false);
    window.history.replaceState(null, null, '/subpath');
    expect(router.rootMatches()).toEqual(true);
    window.history.replaceState(null, null, '/subpath/foo');
    expect(router.rootMatches()).toEqual(true);
    window.history.replaceState(null, null, '/subpath2');
    expect(router.rootMatches()).toEqual(false);
  });

  it('returns absolute path correctly', () => {
    expect(router.getGlobalPath()).toEqual('/');
    window.history.replaceState(null, null, '/subpath');
    expect(router.getGlobalPath()).toEqual('/subpath');
  });

  it('returns relative path correctly', () => {
    expect(router.getPath(), false);
    window.history.replaceState(null, null, '/subpath');
    expect(router.getPath(), '');
    window.history.replaceState(null, null, '/subpath/bar');
    expect(router.getPath(), '/bar');
    window.history.replaceState(null, null, '/subpath_/foo');
    expect(router.getPath(), false);
  });

  it('navigates correctly', () => {
    router.navigate('/bar');
    expect(router.getPath()).toEqual(false);
    window.history.replaceState(null, null, '/subpath');
    router.navigate('/bar');
    expect(router.getPath()).toEqual('/bar');
    expect(router.getGlobalPath()).toEqual('/subpath/bar');
    router.navigate('/subpath/baz', { absolute: true });
    expect(router.getGlobalPath()).toEqual('/subpath/baz');
  });

  it('handles route correctly', () => {
    let handler = jest.fn();
    router.add('/foo', handler);
    window.history.replaceState(null, null, '/subpath/foo');
    router.resolve();
    expect(handler).toHaveBeenCalled();
  });
});

